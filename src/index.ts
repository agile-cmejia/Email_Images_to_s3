import { S3Client } from '@aws-sdk/client-s3';
import { EmailContent } from './domain/EmailContent';
import { ImageExtractor } from './domain/ImageExtractor';
import { ImageReplacer } from './domain/ImageReplacer';
import { S3ImageStorage } from './infrastructure/S3ImageStorage';
import { EmailImageProcessor } from './application/EmailImageProcessor';

// Example usage
export async function processEmailImages(
  content: string,
  s3Config: {
    region: string;
    bucket: string;
    baseUrl: string;
  }
) {
  const s3Client = new S3Client({ region: s3Config.region });
  
  const processor = new EmailImageProcessor(
    new ImageExtractor(),
    new S3ImageStorage(s3Client, s3Config.bucket, s3Config.baseUrl),
    new ImageReplacer()
  );

  const emailContent = new EmailContent(content);
  await processor.process(emailContent);
  
  return emailContent.getContent();
}