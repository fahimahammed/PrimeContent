/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

/**
 * Generates a JWT token.
 * 
 * @param payload - The payload to include in the token.
 * @param secret - The secret key to sign the token.
 * @param expiresIn - The expiration time for the token.
 * @returns The generated JWT token.
 */
const generateToken = (
    payload: Record<string, any>,
    secret: Secret,
    expiresIn: string
): string => {
    const options: SignOptions = {
        algorithm: 'HS256',
        expiresIn
    };

    return jwt.sign(payload, secret, options);
};

/**
 * Verifies a JWT token and returns the decoded payload.
 * 
 * @param token - The token to verify.
 * @param secret - The secret key to verify the token.
 * @returns The decoded payload.
 * @throws {jwt.JsonWebTokenError} If the token is invalid or expired.
 */
const verifyToken = (
    token: string,
    secret: Secret
): JwtPayload => {
    try {
        return jwt.verify(token, secret) as JwtPayload;
    } catch (error) {
        throw new jwt.JsonWebTokenError('Invalid or expired token');
    }
};

export const jwtHelpers = {
    generateToken,
    verifyToken
};
