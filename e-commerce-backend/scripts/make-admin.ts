/**
 * Promotes an existing account to admin.
 *   npm run make-admin -- someone@example.com
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User';

async function main() {
  const email = process.argv[2]?.toLowerCase().trim();
  if (!email) {
    console.error('Usage: npm run make-admin -- <email>');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/e-commerce');
  const user = await User.findOneAndUpdate({ email }, { role: 'admin' }, { new: true });
  console.log(user ? `${user.email} is now an admin.` : `No account with email ${email}.`);
  await mongoose.disconnect();
}

main();
