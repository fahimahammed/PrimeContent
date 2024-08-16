import { Server } from 'http';
import app from './app';
import config from './config';

// Initialize and start the server
async function main() {
    let server: Server | null = null;

    try {
        server = app.listen(config.serverPort, () => {
            console.log(`Server is running on port ${config.serverPort}`);
        });

        // Graceful Shutdown
        const shutdown = (signal: string) => {
            console.log(`Received ${signal}. Closing server...`);
            if (server) {
                server.close(() => {
                    console.log('Server closed gracefully');
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
            console.error('Uncaught Exception:', error);
            shutdown('uncaughtException');
        });

        process.on('unhandledRejection', (error) => {
            console.error('Unhandled Rejection:', error);
            shutdown('unhandledRejection');
        });

    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

// Start the application
main();
