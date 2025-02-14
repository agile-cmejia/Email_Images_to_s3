// Domain entity representing an image
export class Image {
  constructor(
    private base64Content: string,
    private mimeType: string,
    private filename: string
  ) {}

  getBase64Content(): string {
    return this.base64Content;
  }

  getMimeType(): string {
    return this.mimeType;
  }

  getFilename(): string {
    return this.filename;
  }
}