// scripts/import-products.ts
import 'dotenv/config';            // automatski poziva dotenv.config()
import path from 'path';
import csv from 'csvtojson';
import mongoose from 'mongoose';
import { Product, IProduct } from '../models/products';  // uveri se da je tačno ime fajla

const CSV_FILE = path.resolve(__dirname, '../wc-product-export-26-5-2025-1748296362133.csv');

async function run() {
  // 1) Konektuj se na MongoDB preko URI-ja iz .env
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log('✔️  Connected to MongoDB');

  // 2) Učitaj ceo CSV u JSON
  const allRows: any[] = await csv({ trim: true }).fromFile(CSV_FILE);
  console.log(`ℹ️  Učitano ${allRows.length} redova iz CSV-a`);

  // 3) Mapiraj samo ključna polja u IProduct
  const docs: IProduct[] = allRows.map(row => {
    // SKU i ime
    const sku  = row['Šifra proizvoda'] || '';
    const name = row['Ime']            || '';

    // Opis – isprobavamo više kolona
    const description = 
      row['Opis proizvoda'] ||
      row['Opis']            ||
      row['Kratki opis']     ||
      '';

    // Cena – uklanjamo tisućice i decimalni zarez
    let rawPrice = row['Cena'] || '0';
    rawPrice = rawPrice
      .replace(/\./g, '')    // "1.234,56" → "1234,56"
      .replace(',', '.');    // "1234,56" → "1234.56"
    const price = parseFloat(rawPrice) || 0;

    // Zalihe
    const stockRaw = row['Zalihe'] || '0';
    const stock    = parseInt(stockRaw.replace(/[^0-9]/g, ''), 10) || 0;

    // Kategorije – split po '|' pa po '>' za hijerarhiju
    const categories = row['Kategorije']
      ? row['Kategorije']
          .split('|')
          .flatMap((path: string) => path.split('>').map(s => s.trim()))
      : [];

    // Brand
    const brand = row['Brands'] || '';

   const imagesRaw = row['Slike'] || '';
const images = imagesRaw
  ? imagesRaw.split('|').map((u: string) => u.trim())
  : [];
// …
return {
  sku,
  name,
  description,
  price,
  stock,
  categories,
  brand,
  images,
} as IProduct;
  });

  // 4) (opciono) očisti staru kolekciju, pa ubaci
  await Product.deleteMany({});
  const res = await Product.insertMany(docs);
  console.log(`✅  Uvezeno proizvoda: ${res.length}`);

  // 5) Zatvori vezu
  await mongoose.disconnect();
  console.log('✔️  Disconnected from MongoDB');
}

run().catch(err => {
  console.error('❌  Greška:', err);
  process.exit(1);
});
