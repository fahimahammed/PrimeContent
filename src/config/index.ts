import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    environment: process.env.NODE_ENV,
    serverPort: process.env.PORT,
    jwtConfig: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
        refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
        refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
        resetPasswordSecret: process.env.JWT_RESET_PASS_SECRET,
        resetPasswordTokenExpiresIn: process.env.JWT_RESET_PASS_TOKEN_EXPIRES_IN
    },
    resetPasswordLink: process.env.RESET_PASS_LINK,
    emailConfig: {
        senderEmail: process.env.EMAIL_SENDER,
        appPassword: process.env.EMAIL_APP_PASS
    },
    sslConfig: {
        storeId: process.env.SSL_STORE_ID,
        storePassword: process.env.SSL_STORE_PASS,
        successUrl: process.env.SSL_SUCCESS_URL,
        cancelUrl: process.env.SSL_CANCEL_URL,
        failUrl: process.env.SSL_FAIL_URL,
        paymentApiUrl: process.env.SSL_PAYMENT_API_URL,
        validationApiUrl: process.env.SSL_VALIDATION_API_URL
    }
};
