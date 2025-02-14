import { EmailContent } from '../domain/EmailContent';
import { ImageExtractor } from '../domain/ImageExtractor';
import { ImageStorage } from '../domain/ImageStorage';
import { ImageReplacer } from '../domain/ImageReplacer';

// Application service orchestrating the image processing flow
export class EmailImageProcessor {
  constructor(
    private imageExtractor: ImageExtractor,
    private imageStorage: ImageStorage,
    private imageReplacer: ImageReplacer
  ) {}

  async process(emailContent: EmailContent): Promise<void> {
    // Extract all base64 images
    const images = this.imageExtractor.extract(emailContent);
    
    // Store images and collect URLs
    const imageMap = new Map<string, string>();
    for (const image of images) {
      const url = await this.imageStorage.store(image);
      imageMap.set(image.getBase64Content(), url);
    }
    
    // Replace base64 content with URLs
    this.imageReplacer.replace(emailContent, imageMap);
  }
}