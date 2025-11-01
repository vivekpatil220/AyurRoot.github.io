import express from 'express';
import { readData, writeData, addItem, updateItem, findItem } from '../utils/dataStorage.js';

const router = express.Router();

// Get all products
router.get('/', (req, res) => {
  try {
    const products = readData('products.json');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by ID
router.get('/:id', (req, res) => {
  try {
    const product = findItem('products.json', req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create new product
router.post('/', (req, res) => {
  try {
    const productData = req.body;

    // Validate required fields
    if (!productData.name || !productData.type || !productData.manufacturerId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newProduct = {
      ...productData,
      id: `PROD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      qrCode: `QR-${Date.now()}`,
      batchIds: productData.batchIds || []
    };

    addItem('products.json', newProduct);
    
    // Update collection status for all batches to 'manufactured'
    if (productData.batchIds && Array.isArray(productData.batchIds)) {
      productData.batchIds.forEach(batchId => {
        updateItem('collections.json', batchId, { status: 'manufactured' });
      });
    }

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = updateItem('products.json', id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const products = readData('products.json');
    const filtered = products.filter(p => p.id !== id);
    writeData('products.json', filtered);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;

