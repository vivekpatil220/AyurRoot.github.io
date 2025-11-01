import express from 'express';
import { readData, writeData, addItem, updateItem, findItem } from '../utils/dataStorage.js';

const router = express.Router();

// Get all collections
router.get('/', (req, res) => {
  try {
    const collections = readData('collections.json');
    res.json(collections);
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
});

// Get collection by ID
router.get('/:id', (req, res) => {
  try {
    const collection = findItem('collections.json', req.params.id);
    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }
    res.json(collection);
  } catch (error) {
    console.error('Error fetching collection:', error);
    res.status(500).json({ error: 'Failed to fetch collection' });
  }
});

// Create new collection
router.post('/', (req, res) => {
  try {
    const collectionData = req.body;

    // Validate required fields
    if (!collectionData.farmerId || !collectionData.farmerName || !collectionData.herbName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newCollection = {
      ...collectionData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: collectionData.status || 'collected'
    };

    addItem('collections.json', newCollection);
    res.status(201).json(newCollection);
  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).json({ error: 'Failed to create collection' });
  }
});

// Update collection status
router.patch('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const validStatuses = ['collected', 'processing', 'processed', 'tested', 'approved', 'rejected', 'manufactured'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updated = updateItem('collections.json', id, { status });
    if (!updated) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating collection status:', error);
    res.status(500).json({ error: 'Failed to update collection status' });
  }
});

// Update collection
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = updateItem('collections.json', id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating collection:', error);
    res.status(500).json({ error: 'Failed to update collection' });
  }
});

// Delete collection
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const collections = readData('collections.json');
    const filtered = collections.filter(c => c.id !== id);
    writeData('collections.json', filtered);
    res.json({ message: 'Collection deleted successfully' });
  } catch (error) {
    console.error('Error deleting collection:', error);
    res.status(500).json({ error: 'Failed to delete collection' });
  }
});

export default router;

