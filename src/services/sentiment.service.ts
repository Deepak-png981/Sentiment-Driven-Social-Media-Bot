export interface ISentimentService {
    analyze(text: string): Promise<SentimentResult>;
}

export enum Sentiment {
    Positive = 'positive',
    Negative = 'negative',
    Neutral = 'neutral'
}

export interface SentimentResult {
    sentiment: Sentiment;
    confidence: number;
}
