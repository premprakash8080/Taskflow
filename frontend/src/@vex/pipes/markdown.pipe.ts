import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'markdownToHtml' })
export class MarkdownToHtmlPipe implements PipeTransform {
  transform(value: string): string {
    return value ?? '';
  }
}
