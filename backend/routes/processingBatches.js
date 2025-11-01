import express from 'express';
import { readData, writeData, addItem, updateItem, findItem } from '../utils/dataStorage.js';

const router = express.Router();

// Get all processing batches
router.get('/', (req, res) => {
  try {
    const batches = readData('processingBatches.json');
    
    // Filter by status if provided
    const { status } = req.query;
    if (status) {
      const filtered = batches.filter(b => b.status === status);
      return res.json(filtered);
    }
    
    res.json(batches);
  } catch (error) {
    console.error('Error fetching processing batches:', error);
    res.status(500).json({ error: 'Failed to fetch processing batches' });
  }
});

// Get processing batch by ID
router.get('/:id', (req, res) => {
  try {
    const batch = findItem('processingBatches.json', req.params.id);
    if (!batch) {
      return res.status(404).json({ error: 'Processing batch not found' });
    }
    res.json(batch);
  } catch (error) {
    console.error('Error fetching processing batch:', error);
    res.status(500).json({ error: 'Failed to fetch processing batch' });
  }
});

// Create new processing batch
router.post('/', (req, res) => {
  try {
    const batchData = req.body;

    // Validate required fields
    if (!batchData.originalBatchId || !batchData.herbName || !batchData.processorId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newBatch = {
      ...batchData,
      id: `PB-${Date.now()}`,
      status: batchData.status || 'processing',
      stages: batchData.stages || {
        cleaning: false,
        drying: false,
        grinding: false,
        packaging: false,
        qualityCheck: false
      },
      notes: batchData.notes || '',
      completedAt: batchData.completedAt || undefined
    };

    addItem('processingBatches.json', newBatch);
    
    // Update collection status to 'processing'
    updateItem('collections.json', batchData.originalBatchId, { status: 'processing' });

    res.status(201).json(newBatch);
  } catch (error) {
    console.error('Error creating processing batch:', error);
    res.status(500).json({ error: 'Failed to create processing batch' });
  }
});

// Update processing batch
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = updateItem('processingBatches.json', id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Processing batch not found' });
    }

    // If status changed to completed or readyForTesting, update collection status
    if (updates.status === 'completed' || updates.status === 'readyForTesting') {
      updateItem('collections.json', updated.originalBatchId, { status: 'processed' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating processing batch:', error);
    res.status(500).json({ error: 'Failed to update processing batch' });
  }
});

// Update processing batch status
router.patch('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const validStatuses = ['processing', 'readyForTesting', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const batch = findItem('processingBatches.json', id);
    if (!batch) {
      return res.status(404).json({ error: 'Processing batch not found' });
    }

    const updates = { status };
    if (status === 'readyForTesting' || status === 'completed') {
      updates.completedAt = new Date().toISOString();
    }

    const updated = updateItem('processingBatches.json', id, updates);
    res.json(updated);
  } catch (error) {
    console.error('Error updating processing batch status:', error);
    res.status(500).json({ error: 'Failed to update processing batch status' });
  }
});

// Delete processing batch
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const batches = readData('processingBatches.json');
    const filtered = batches.filter(b => b.id !== id);
    writeData('processingBatches.json', filtered);
    res.json({ message: 'Processing batch deleted successfully' });
  } catch (error) {
    console.error('Error deleting processing batch:', error);
    res.status(500).json({ error: 'Failed to delete processing batch' });
  }
});

export default router;

