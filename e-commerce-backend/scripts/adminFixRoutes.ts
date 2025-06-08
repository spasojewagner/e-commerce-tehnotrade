// routes/adminFixRoutes.ts
import express from 'express';
import { Product } from '../models/products';

const router = express.Router();

router.put('/fix-images', async (_req, res) => {
  try {
    const products = await Product.find()
    const updatedSkus: string[] = [];

    for (const product of products) {
      if (
        product.images.length === 1 &&
        typeof product.images[0] === 'string' &&
        product.images[0].includes(',')
      ) {
        const fixedImages = product.images[0]
          .split(',')
          .map((img) => img.trim())
          .filter((img) => img.startsWith('http'));

        product.images = fixedImages;
        await product.save();
        updatedSkus.push(product.sku);
      }
    }

    res.status(200).json({
      message: `Popravljeno ${updatedSkus.length} proizvoda.`,
      updatedSkus,               // <-- e ovo ti vraća listu SKU-eva
    });
  } catch (error) {
    console.error('Greška prilikom popravljanja slika:', error);
    res.status(500).json({ error: 'Greška na serveru' });
  }
});

export default router;
