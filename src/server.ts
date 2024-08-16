import { Server } from 'http';
import app from './app';
import config from './config';
import logger from './logging/logger';

// Initialize and start the server
async function main() {
    let server: Server | null = null;

    try {
        server = app.listen(config.serverPort, () => {
            logger.info(`Server is running on port ${config.serverPort}`);
        });

        // Graceful Shutdown
        const shutdown = (signal: string) => {
            logger.info(`Received ${signal}. Closing server...`);
            if (server) {
                server.close(() => {
                    logger.info('Server closed gracefully');
                    process.exit(0);
                });
            } else {
                process.exit(0);
            }
        };

        // Listen for termination signals
        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));

        // Error handling
        process.on('uncaughtException', (error) => {
            logger.error('Uncaught Exception:', error);
            shutdown('uncaughtException');
        });

        process.on('unhandledRejection', (error) => {
            logger.error('Unhandled Rejection:', error);
            shutdown('unhandledRejection');
        });

    } catch (error) {
        logger.error('Error starting server:', error);
        process.exit(1);
    }
}

// Start the application
main();
