import { createLogger, format, transports } from 'winston';

class Logger {
    private logger;

    constructor() {
        const logLevel = process.env.LOG_LEVEL || 'info';

        this.logger = createLogger({
            level: logLevel,
            format: format.combine(
                format.timestamp(),
                format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
                })
            ),
            transports: [
                new transports.Console(),
            ],
        });
    }

    info(message: string) {
        this.logger.info(message);
    }

    warn(message: string) {
        this.logger.warn(message);
    }

    error(message: string) {
        this.logger.error(message);
    }

    debug(message: string) {
        this.logger.debug(message);
    }
}

export default new Logger();
