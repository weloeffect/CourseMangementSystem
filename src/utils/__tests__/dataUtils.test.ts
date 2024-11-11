import fs from 'fs';
import { readData, writeData } from '../fileHandler'; 
import path from 'path';

jest.mock('fs'); 

describe('Data Utils', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should read data from a JSON file', () => {
    const mockData = [{ id: 1, title: 'Sample Course' }];
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(JSON.stringify(mockData));

    const result = readData('courses.json');
    expect(result).toEqual(mockData);
  });

  it('should write data to a JSON file', () => {
    const data = [{ id: 2, title: 'New Course' }];
    const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync').mockImplementation();

    writeData('courses.json', data);

    expect(writeFileSyncMock).toHaveBeenCalledWith(
      path.join(__dirname, '../../data/courses.json'),
      JSON.stringify(data, null, 2),
      'utf-8'
    );
  });
});