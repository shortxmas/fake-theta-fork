import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs/promises';
import path from 'path';

export async function getLivePreview(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  const filePath = path.resolve(
    __dirname,
    '../../../static/sample-preview.jpg',
  );
  const picture = await fs.readFile(filePath);
  res
    .status(200)
    .setHeader(
      'Content-Type',
      'multipart/x-mixed-replace; boundary="---osclivepreview---"',
    );
  res.write('---osclivepreview---\r\n');
  res.write('Content-type: image/jpeg\r\n');
  res.write('Content-Length: 23660\r\n');
  res.write('\r\n');
  res.write(picture);
  res.write('\r\n\r\n');
  res.end('---osclivepreview---\r\n');
}
