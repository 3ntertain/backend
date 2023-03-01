import { Injectable } from '@nestjs/common';
import { CreateUploadInput } from './dto/create-upload.input';
import { S3Client } from '@aws-sdk/client-s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { readFileSync } from 'fs';

@Injectable()
export class UploadService {
  s3Client: S3Client;
  bucket = 'clash-of-degens';
  region = 'us-east-2';

  constructor() {
    this.s3Client = new S3Client({
      region: this.region,
    });
  }

  async create(file: any): Promise<Boolean> {
    console.log(file);
    const bucketParams = {
      Bucket: this.bucket,
      Body: file.buffer,
      Key: `${file.originalname}.jpg`,
    };

    try {
      await this.s3Client.send(new PutObjectCommand(bucketParams));
      return true;
    } catch (err) {
      console.log('Error', err);
    }
  }

  async streamToBuffer(stream: any): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const _buf: any[] = [];

      stream.on('data', (chunk) => _buf.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(_buf)));
      stream.on('error', (err) => reject(err));
    });
  }
}
