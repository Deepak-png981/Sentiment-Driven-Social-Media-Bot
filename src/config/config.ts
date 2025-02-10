import dotenv from 'dotenv';

dotenv.config();

class Config {
    private static instance: Config;
    public port: number;
    public mongoURI: string;
    public instagramVerifyToken: string;
    public openaiApiKey: string;
    public targetInstagramHandle: string;

    private constructor() {
        this.port = parseInt(process.env.PORT || '3000', 10);
        this.mongoURI = process.env.MONGO_URI || '';
        this.instagramVerifyToken = process.env.INSTAGRAM_VERIFY_TOKEN || '';
        this.openaiApiKey = process.env.OPENAI_API_KEY || '';
        this.targetInstagramHandle = process.env.TARGET_INSTAGRAM_HANDLE || '';
    }

    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }
}

export const config = Config.getInstance();
