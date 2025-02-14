import * as cheerio from 'cheerio';
import { EmailContent } from './EmailContent';

// Domain service for replacing base64 images with URLs
export class ImageReplacer {
  replace(emailContent: EmailContent, imageMap: Map<string, string>): void {
    const $ = cheerio.load(emailContent.getContent());
    
    $('img').each((_, element) => {
      const src = $(element).attr('src');
      if (!src) return;
      
      if (src.startsWith('data:image')) {
        const [header] = src.split(',');
        const mimeType = header.split(';')[0].split(':')[1];
        const extension = mimeType.split('/')[1];
        
        for (const [base64, url] of imageMap.entries()) {
          if (src.includes(base64)) {
            $(element).attr('src', url);
            break;
          }
        }
      }
    });

    emailContent.setContent($.html());
  }
}