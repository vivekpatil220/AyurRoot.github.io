import fs from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, '..', 'data');

export const readData = (filename) => {
  try {
    const filePath = join(DATA_DIR, filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
};

export const writeData = (filename, data) => {
  try {
    const filePath = join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
};

export const addItem = (filename, item) => {
  const data = readData(filename);
  data.push(item);
  writeData(filename, data);
  return item;
};

export const updateItem = (filename, id, updates) => {
  const data = readData(filename);
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updates };
    writeData(filename, data);
    return data[index];
  }
  return null;
};

export const deleteItem = (filename, id) => {
  const data = readData(filename);
  const filtered = data.filter(item => item.id !== id);
  writeData(filename, filtered);
  return filtered.length < data.length;
};

export const findItem = (filename, id) => {
  const data = readData(filename);
  return data.find(item => item.id === id);
};

