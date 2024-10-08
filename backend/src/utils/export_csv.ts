import { writeFile } from 'fs';
import { promisify } from 'util';

const writeFilePromise = promisify(writeFile);

/**
 * Function to export data to a CSV file using async/await.
 * @param filename The name of the file to create.
 * @param data An array of objects containing the data to be exported.
 * @param headers An array of strings representing the column headers.
 * @returns A promise that resolves when the file has been successfully created.
 * @example
 * const data = [
 *   { name: 'Khanh Nguyen', age: 18, email: 'khanhnguyen@example.com' },
 *   { name: 'Huyen Y', age: 18, email: 'huyeny@example.com' }
 * ];
 *
 * const headers = ['name', 'age', 'email'];
 *
 * // Example usage with async/await
 * (async () => {
 *   try {
 *     await exportCsv('example.csv', data, headers);
 *     console.log('CSV file has been created successfully.');
 *   } catch (err) {
 *     console.error('Error creating CSV file:', err);
 *   }
 * })();
 */
export async function exportCsv(
  filename: string,
  data: any[],
  headers: string[],
): Promise<void> {
  const csvContent = [
    headers.join(','),
    ...data.map((row) => headers.map((field) => `"${row[field]}"`).join(',')),
  ].join('\n');

  try {
    await writeFilePromise(filename, csvContent);
    console.log('CSV file has been created successfully.');
  } catch (err) {
    console.error('Error creating CSV file:', err);
    throw err;
  }
}
