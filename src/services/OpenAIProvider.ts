import { ISentimentService, Sentiment, SentimentResult } from './sentiment.service';
import axios from 'axios';

export class OpenAIProvider implements ISentimentService {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async analyze(text: string): Promise<SentimentResult> {
        const messages = [
            { role: "system", content: "You are a sentiment analysis assistant. Always respond in JSON format." },
            { role: "user", content: `Determine the sentiment (positive, negative, or neutral) of the following text and provide a confidence score between 0 and 1.\n\nText: "${text}"\n\nOutput format (JSON): {"sentiment": "<positive|negative|neutral>", "confidence": <number>}` }
        ];
        
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages,
                    max_tokens: 60,
                    temperature: 0,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.apiKey}`
                    }
                }
            );

            const resultText = response.data.choices[0].message.content;
            const result = JSON.parse(resultText);
            
            return {
                sentiment: result.sentiment as Sentiment,
                confidence: result.confidence
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error in sentiment analysis:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }
} 