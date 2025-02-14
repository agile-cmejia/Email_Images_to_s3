import { describe, it, expect } from 'vitest';
import { EmailContent } from '../domain/EmailContent';
import { ImageExtractor } from '../domain/ImageExtractor';
import { ImageReplacer } from '../domain/ImageReplacer';
import { EmailImageProcessor } from '../application/EmailImageProcessor';
import { ImageStorage } from '../domain/ImageStorage';

class MockImageStorage implements ImageStorage {
  async store(image: any): Promise<string> {
    return `https://example.com/${image.getFilename()}`;
  }
}

describe('EmailImageProcessor', () => {
  it('should process email content and replace base64 images with URLs', async () => {
    const content = `
      <div>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==">
      </div>
    `;

    const emailContent = new EmailContent(content);
    const processor = new EmailImageProcessor(
      new ImageExtractor(),
      new MockImageStorage(),
      new ImageReplacer()
    );

    await processor.process(emailContent);

    expect(emailContent.getContent()).toContain('https://example.com/');
    expect(emailContent.getContent()).not.toContain('data:image/png;base64');
  });
});