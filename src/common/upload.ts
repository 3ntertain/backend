import { S3Client } from '@aws-sdk/client-s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';

const bucketName = 'clash-of-degens';
const region = 'us-east-2';

const s3Client = new S3Client({
  region: region,
});

async function streamToBuffer(stream: any): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf: any[] = [];

    stream.on('data', (chunk) => _buf.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(_buf)));
    stream.on('error', (err) => reject(err));
  });
}

export async function uploadFile(createReadStream, filename) {
  const body = await createReadStream();
  const buffer = await streamToBuffer(body);

  const extention = filename.split('.').pop();
  const newFilename = `${Date.now()}.${extention}`;

  const bucketParams = {
    Bucket: bucketName,
    Body: buffer,
    Key: newFilename,
  };

  try {
    await s3Client.send(new PutObjectCommand(bucketParams));

    const s3Url =
      'https://' +
      bucketName +
      '.s3.' +
      region +
      '.amazonaws.com/' +
      newFilename;

    return s3Url;
  } catch (err) {
    console.log('Error', err);
  }
}
