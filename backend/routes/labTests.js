import express from 'express';
import { readData, writeData, addItem, updateItem, findItem } from '../utils/dataStorage.js';

const router = express.Router();

// Get all lab tests
router.get('/', (req, res) => {
  try {
    const tests = readData('labTests.json');
    
    // Filter by status if provided
    const { status } = req.query;
    if (status) {
      const filtered = tests.filter(t => t.status === status);
      return res.json(filtered);
    }
    
    res.json(tests);
  } catch (error) {
    console.error('Error fetching lab tests:', error);
    res.status(500).json({ error: 'Failed to fetch lab tests' });
  }
});

// Get lab test by ID
router.get('/:id', (req, res) => {
  try {
    const test = findItem('labTests.json', req.params.id);
    if (!test) {
      return res.status(404).json({ error: 'Lab test not found' });
    }
    res.json(test);
  } catch (error) {
    console.error('Error fetching lab test:', error);
    res.status(500).json({ error: 'Failed to fetch lab test' });
  }
});

// Get lab tests by batch ID
router.get('/batch/:batchId', (req, res) => {
  try {
    const tests = readData('labTests.json');
    const filtered = tests.filter(t => t.batchId === req.params.batchId);
    res.json(filtered);
  } catch (error) {
    console.error('Error fetching lab tests by batch:', error);
    res.status(500).json({ error: 'Failed to fetch lab tests' });
  }
});

// Create new lab test
router.post('/', (req, res) => {
  try {
    const testData = req.body;

    // Validate required fields
    if (!testData.batchId || !testData.herbName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newTest = {
      ...testData,
      id: `LT-${Date.now()}`,
      status: testData.status || 'pending',
      testDate: testData.testDate || new Date().toISOString().split('T')[0],
      certificateId: testData.certificateId || `CERT-${Date.now()}`,
      moisture: testData.moisture || 0,
      dnaMatch: testData.dnaMatch || 0,
      pesticide: testData.pesticide || 0,
      temperature: testData.temperature || 0
    };

    addItem('labTests.json', newTest);
    
    // Update collection status based on test status
    if (newTest.status === 'approved') {
      updateItem('collections.json', testData.batchId, { status: 'approved' });
    } else if (newTest.status === 'rejected') {
      updateItem('collections.json', testData.batchId, { status: 'rejected' });
    } else if (newTest.status === 'tested') {
      updateItem('collections.json', testData.batchId, { status: 'tested' });
    }

    res.status(201).json(newTest);
  } catch (error) {
    console.error('Error creating lab test:', error);
    res.status(500).json({ error: 'Failed to create lab test' });
  }
});

// Update lab test
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const test = findItem('labTests.json', id);
    if (!test) {
      return res.status(404).json({ error: 'Lab test not found' });
    }

    const updated = updateItem('labTests.json', id, updates);
    
    // Update collection status if status changed
    if (updates.status) {
      if (updates.status === 'approved') {
        updateItem('collections.json', test.batchId, { status: 'approved' });
      } else if (updates.status === 'rejected') {
        updateItem('collections.json', test.batchId, { status: 'rejected' });
      } else if (updates.status === 'tested') {
        updateItem('collections.json', test.batchId, { status: 'tested' });
      }
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating lab test:', error);
    res.status(500).json({ error: 'Failed to update lab test' });
  }
});

// Update lab test status
router.patch('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const validStatuses = ['pending', 'tested', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const test = findItem('labTests.json', id);
    if (!test) {
      return res.status(404).json({ error: 'Lab test not found' });
    }

    const updates = { status };
    if (rejectionReason) {
      updates.rejectionReason = rejectionReason;
    }

    const updated = updateItem('labTests.json', id, updates);
    
    // Update collection status
    if (status === 'approved') {
      updateItem('collections.json', test.batchId, { status: 'approved' });
    } else if (status === 'rejected') {
      updateItem('collections.json', test.batchId, { status: 'rejected' });
    } else if (status === 'tested') {
      updateItem('collections.json', test.batchId, { status: 'tested' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating lab test status:', error);
    res.status(500).json({ error: 'Failed to update lab test status' });
  }
});

// Delete lab test
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const tests = readData('labTests.json');
    const filtered = tests.filter(t => t.id !== id);
    writeData('labTests.json', filtered);
    res.json({ message: 'Lab test deleted successfully' });
  } catch (error) {
    console.error('Error deleting lab test:', error);
    res.status(500).json({ error: 'Failed to delete lab test' });
  }
});

export default router;

