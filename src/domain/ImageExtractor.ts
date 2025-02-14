import * as cheerio from 'cheerio';
import { Image } from './Image';
import { EmailContent } from './EmailContent';

// Domain service for extracting base64 images
export class ImageExtractor {
  extract(emailContent: EmailContent): Image[] {
    const $ = cheerio.load(emailContent.getContent());
    const images: Image[] = [];
    
    $('img').each((_, element) => {
      const src = $(element).attr('src');
      if (!src) return;
      
      if (src.startsWith('data:image')) {
        const [header, base64Content] = src.split(',');
        const mimeType = header.split(';')[0].split(':')[1];
        const filename = `image_${images.length + 1}.${mimeType.split('/')[1]}`;
        
        images.push(new Image(base64Content, mimeType, filename));
      }
    });

    return images;
  }
}