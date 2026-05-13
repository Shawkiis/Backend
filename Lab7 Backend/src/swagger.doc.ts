export const swaggerDocument = {
  "openapi": "3.0.0",
  "info": {
    "title": "Node.js Sign-up and Verification API",
    "version": "1.0.0",
    "description": "Node.js + MySQL - API with email sign-up, verification, authentication and forgot password"
  },
  "servers": [
    {
      "url": "https://lab7-activity-backend.vercel.app",
      "description": "Vercel Production server"
    },
    {
      "url": "http://localhost:4000",
      "description": "Local development server"
    }
  ],
  "paths": {
    "/accounts/authenticate": {
      "post": {
        "summary": "Authenticate account credentials and return a JWT token and a cookie with a refresh token",
        "responses": { "200": { "description": "Authentication successful" } }
      }
    },
    "/accounts/refresh-token": {
      "post": {
        "summary": "Use a refresh token to generate a new JWT token",
        "responses": { "200": { "description": "Token refreshed" } }
      }
    },
    "/accounts/revoke-token": {
      "post": {
        "summary": "Revoke a refresh token",
        "responses": { "200": { "description": "Token revoked" } }
      }
    },
    "/accounts/register": {
      "post": {
        "summary": "Register a new user account and send a verification email",
        "responses": { "200": { "description": "Registration successful" } }
      }
    },
    "/accounts/verify-email": {
      "post": {
        "summary": "Verify a new account with a token",
        "responses": { "200": { "description": "Email verified" } }
      }
    },
    "/accounts/forgot-password": {
      "post": {
        "summary": "Submit email address to reset the password",
        "responses": { "200": { "description": "Password reset email sent" } }
      }
    },
    "/accounts/validate-reset-token": {
      "post": {
        "summary": "Validate the reset password token",
        "responses": { "200": { "description": "Token validated" } }
      }
    },
    "/accounts/reset-password": {
      "post": {
        "summary": "Reset the password for an account",
        "responses": { "200": { "description": "Password reset successful" } }
      }
    }
  }
};
