// Domain entity representing email content
export class EmailContent {
  constructor(private content: string) {}

  getContent(): string {
    return this.content;
  }

  setContent(content: string): void {
    this.content = content;
  }
}