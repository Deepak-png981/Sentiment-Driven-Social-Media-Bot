import { Sentiment } from './sentiment.service';

export class TemplateService {
  private templates: { [key in Sentiment]: string } = {
    [Sentiment.Positive]: "Thanks for the love, {{user}}! We appreciate your support.",
    [Sentiment.Negative]: "We're sorry to hear that, {{user}}. Please DM us so we can help resolve the issue.",
    [Sentiment.Neutral]: "Thanks for the mention, {{user}}! Let us know if you have any feedback."
  };

  getTemplate(sentiment: Sentiment, placeholders: { [key: string]: string } = {}): string {
    return Object.entries(placeholders).reduce((template, [key, value]) => {
      return template.replace(`{{${key}}}`, value);
    }, this.templates[sentiment]);
  }

  addTemplate(sentiment: Sentiment, template: string): void {
    this.templates[sentiment] = template;
  }

  removeTemplate(sentiment: Sentiment): void {
    delete this.templates[sentiment];
  }
}
