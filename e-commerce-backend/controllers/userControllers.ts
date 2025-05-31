import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { AuthRequest } from "../midleware/auth";

const JWT_SECRET = process.env.JWT_SECRET || "tajna-koja-bi-trebala-biti-u-env-fajlu";
const COOKIE_NAME = "jwt";

// Helper funkcija za kreiranje JWT tokena
const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
};

// Helper funkcija za setovanje cookie-ja
const setTokenCookie = (res: Response, token: string) => {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dana
  });
};

// Helper funkcija za error handling
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

// @desc    Registracija novog korisnika
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, surname, phone, password, gender, terms, dateOfBirth } = req.body;

    // Validacija obaveznih polja
    if (!email || !name || !surname || !phone || !password || !gender) {
      res.status(400).json({
        error: "Sva obavezna polja moraju biti popunjena",
        required: ["email", "name", "surname", "phone", "password", "gender"]
      });
      return;
    }

    // Validacija email formata
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: "Neispravna email adresa" });
      return;
    }

    // Validacija lozinke
    if (password.length < 6) {
      res.status(400).json({ error: "Lozinka mora imati najmanje 6 karaktera" });
      return;
    }

    // Validacija telefona
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(phone)) {
      res.status(400).json({ error: "Neispravna format telefona" });
      return;
    }

    // Provera da li korisnik već postoji
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400).json({ error: "Korisnik sa ovom email adresom već postoji" });
      return;
    }

    // Hash lozinke
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Kreiranje novog korisnika
    const newUser = new User({
      email: email.toLowerCase(),
      name: name.trim(),
      surname: surname.trim(),
      phone: phone.trim(),
      password: hashedPassword,
      gender,
      terms: terms || false,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
    });

    const savedUser = await newUser.save();

    // Generisanje tokena
    const token = generateToken(savedUser._id.toString());
    setTokenCookie(res, token);

    // Vraćanje odgovora bez lozinke
    const userResponse = {
      id: savedUser._id,
      email: savedUser.email,
      name: savedUser.name,
      surname: savedUser.surname,
      phone: savedUser.phone,
      gender: savedUser.gender,
      terms: savedUser.terms,
      dateOfBirth: savedUser.dateOfBirth,
      createdAt: savedUser.createdAt,
    };

    res.status(201).json({
      message: "Korisnik je uspešno registrovan",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Greška prilikom registracije:", error);
    res.status(500).json({ 
      error: "Greška na serveru",
      details: process.env.NODE_ENV === "development" ? getErrorMessage(error) : undefined
    });
  }
};

// @desc    Login korisnika
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validacija obaveznih polja
    if (!email || !password) {
      res.status(400).json({ error: "Email i lozinka su obavezni" });
      return;
    }

    // Pronalaženje korisnika
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(401).json({ error: "Neispravna email adresa ili lozinka" });
      return;
    }

    // Provera lozinke
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Neispravna email adresa ili lozinka" });
      return;
    }

    // Generisanje tokena
    const token = generateToken(user._id.toString());
    setTokenCookie(res, token);

    // Vraćanje odgovora bez lozinke
    const userResponse = {
      id: user._id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      gender: user.gender,
      terms: user.terms,
      dateOfBirth: user.dateOfBirth,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(200).json({
      message: "Uspešno ste se prijavili",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Greška prilikom prijave:", error);
    res.status(500).json({ 
      error: "Greška na serveru",
      details: process.env.NODE_ENV === "development" ? getErrorMessage(error) : undefined
    });
  }
};

// @desc    Ažuriranje profila korisnika
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { name, surname, phone, gender, dateOfBirth, currentPassword, newPassword } = req.body;

    if (!userId) {
      res.status(401).json({ error: "Neautorizovan pristup" });
      return;
    }

    // Pronalaženje korisnika
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "Korisnik nije pronađen" });
      return;
    }

    // Objekat za ažuriranje
    const updateData: any = {};

    // Ažuriranje osnovnih informacija
    if (name && name.trim() !== user.name) {
      updateData.name = name.trim();
    }
    if (surname && surname.trim() !== user.surname) {
      updateData.surname = surname.trim();
    }
    if (phone && phone.trim() !== user.phone) {
      // Validacija telefona
      const phoneRegex = /^[0-9+\-\s()]+$/;
      if (!phoneRegex.test(phone)) {
        res.status(400).json({ error: "Neispravna format telefona" });
        return;
      }
      updateData.phone = phone.trim();
    }
    if (gender && gender !== user.gender) {
      updateData.gender = gender;
    }
    if (dateOfBirth) {
      updateData.dateOfBirth = new Date(dateOfBirth);
    }

    // Ažuriranje lozinke
    if (newPassword) {
      if (!currentPassword) {
        res.status(400).json({ error: "Trenutna lozinka je obavezna za promenu lozinke" });
        return;
      }

      // Provera trenutne lozinke
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        res.status(400).json({ error: "Trenutna lozinka nije ispravna" });
        return;
      }

      // Validacija nove lozinke
      if (newPassword.length < 6) {
        res.status(400).json({ error: "Nova lozinka mora imati najmanje 6 karaktera" });
        return;
      }

      // Hash nove lozinke
      const saltRounds = 12;
      updateData.password = await bcrypt.hash(newPassword, saltRounds);
    }

    // Ako nema promena
    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ error: "Nema promena za ažuriranje" });
      return;
    }

    // Ažuriranje korisnika
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(404).json({ error: "Korisnik nije pronađen" });
      return;
    }

    // Vraćanje odgovora bez lozinke
    const userResponse = {
      id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      surname: updatedUser.surname,
      phone: updatedUser.phone,
      gender: updatedUser.gender,
      terms: updatedUser.terms,
      dateOfBirth: updatedUser.dateOfBirth,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };

    res.status(200).json({
      message: "Profil je uspešno ažuriran",
      user: userResponse,
    });
  } catch (error) {
    console.error("Greška prilikom ažuriranja profila:", error);
    res.status(500).json({ 
      error: "Greška na serveru",
      details: process.env.NODE_ENV === "development" ? getErrorMessage(error) : undefined
    });
  }
};

// @desc    Prikaz svih korisnika
// @route   GET /api/users
// @access  Private (Admin only - možeš dodati admin middleware kasnije)
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;

    // Kreiranje query objekta
    const query: any = {};
    
    // Ako postoji search parametar, traži po email, name ili surname
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { surname: { $regex: search, $options: 'i' } }
      ];
    }

    // Računanje skip vrednosti za paginaciju
    const skip = (page - 1) * limit;

    // Pronalaženje korisnika sa paginacijom
    const users = await User.find(query)
      .select('-password') // Isključi lozinku iz rezultata
      .sort({ createdAt: -1 }) // Sortiraj po datumu kreiranja (najnoviji prvi)
      .skip(skip)
      .limit(limit);

    // Ukupan broj korisnika
    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      message: "Korisnici uspešno pronađeni",
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      }
    });
  } catch (error) {
    console.error("Greška prilikom dobijanja korisnika:", error);
    res.status(500).json({ 
      error: "Greška na serveru",
      details: process.env.NODE_ENV === "development" ? getErrorMessage(error) : undefined
    });
  }
};

// @desc    Dobijanje profila trenutnog korisnika
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: "Neautorizovan pristup" });
      return;
    }

    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      res.status(404).json({ error: "Korisnik nije pronađen" });
      return;
    }

    res.status(200).json({
      message: "Profil uspešno dobijen",
      user,
    });
  } catch (error) {
    console.error("Greška prilikom dobijanja profila:", error);
    res.status(500).json({ 
      error: "Greška na serveru",
      details: process.env.NODE_ENV === "development" ? getErrorMessage(error) : undefined
    });
  }
};

// @desc    Logout korisnika
// @route   POST /api/users/logout
// @access  Private
export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Brisanje cookie-ja
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Uspešno ste se odjavili",
    });
  } catch (error) {
    console.error("Greška prilikom odjave:", error);
    res.status(500).json({ 
      error: "Greška na serveru",
      details: process.env.NODE_ENV === "development" ? getErrorMessage(error) : undefined
    });
  }
};