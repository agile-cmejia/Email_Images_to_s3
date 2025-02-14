import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Image } from '../domain/Image';
import { ImageStorage } from '../domain/ImageStorage';

// Adapter implementation for AWS S3 storage
export class S3ImageStorage implements ImageStorage {
  constructor(
    private s3Client: S3Client,
    private bucket: string,
    private baseUrl: string
  ) {}

  async store(image: Image): Promise<string> {
    const buffer = Buffer.from(image.getBase64Content(), 'base64');
    
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: image.getFilename(),
        Body: buffer,
        ContentType: image.getMimeType()
      })
    );

    return `${this.baseUrl}/${image.getFilename()}`;
  }
}