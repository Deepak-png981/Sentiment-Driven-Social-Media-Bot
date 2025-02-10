import { ISentimentService, Sentiment, SentimentResult } from './sentiment.service';
import logger from '../utils/logger';

export class LLMSentimentService implements ISentimentService {
    private provider: ISentimentService;

    constructor(provider: ISentimentService) {
        this.provider = provider;
    }

    async analyze(text: string): Promise<SentimentResult> {
        try {
            return await this.provider.analyze(text);
        } catch (error) {
            logger.error(`Error in sentiment analysis: ${error}`);
            return {
                sentiment: Sentiment.Neutral,
                confidence: 0.5
            };
        }
    }
} 