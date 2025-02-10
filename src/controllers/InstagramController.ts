import { Request, Response } from 'express';
import { config } from '../config/config';
import { TemplateService } from '../services/Template.service';
import { InstagramAPI } from '../integrations/InstagramAPI';
import logger from '../utils/logger';
import { LLMSentimentService } from '../services/LLMSentimentService';


export class InstagramController {

    private templateService = new TemplateService();
    private instagramAPI = new InstagramAPI();
    
    constructor(private sentimentService: LLMSentimentService) {
        this.sentimentService = sentimentService;
    }

    async handleWebhook(req: Request, res: Response): Promise<void> {
        if (req.method === 'GET') {
            const mode = req.query['hub.mode'];
            const token = req.query['hub.verify_token'];
            const challenge = req.query['hub.challenge'];
            if (mode === 'subscribe' && token === config.instagramVerifyToken) {
                logger.info('Webhook verified successfully');
                res.status(200).json(challenge);
                return;
            } else {
                res.status(403).json('Verification failed');
                return;
            }
        }

        try {
            const event = req.body;
            const postId = event.post_id;
            const postText = event.text;
            const taggedAccounts: string[] = event.tagged_accounts;


            if (!taggedAccounts.includes(config.targetInstagramHandle)) {
                logger.info('Target account not tagged. Ignoring post.');
                res.status(200).json('No action taken');
                return;
            }

            const sentimentResult = await this.sentimentService.analyze(postText);
            logger.info(`Sentiment analysis result: ${JSON.stringify(sentimentResult)}`);

            const commentTemplate = this.templateService.getTemplate(sentimentResult.sentiment);

            const commentPosted = await this.instagramAPI.postComment(postId, commentTemplate);
            if (commentPosted) {
                res.status(200).json('Comment posted successfully');
            } else {
                res.status(500).json('Failed to post comment');
            }
            return; 
        } catch (error) {
            logger.error(`Error processing webhook: ${error}`);
            res.status(500).json('Internal Server Error');
            return;
        }

    }
}
