import fs from 'fs';
import path from 'path';

const readData = (fileName: string) => {
  const filePath = path.join(__dirname, '../data', fileName);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeData = (fileName: string, data: any) => {
  const filePath = path.join(__dirname, '../data', fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

export { readData, writeData };
