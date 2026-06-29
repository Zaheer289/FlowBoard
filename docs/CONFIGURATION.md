# Configuration

The application requires specific environment variables and has hardcoded operational limits.

## Environment Variables

The backend relies on a `.env` file located in `flowboard-backend/`.

- **`PORT`**: The port the Express/Socket.io server runs on (e.g., `5000`).
- **`MONGO_URI`**: The connection string for the MongoDB cluster.
- **`ACCESS_TOKEN_JWT`**: The secret key used to sign the short-lived access JWTs.
- **`REFRESH_TOKEN_JWT`**: The secret key used to sign the long-lived refresh JWTs.

## Hardcoded Configurations

- **CORS Limits**: The backend is hardcoded to only accept requests from `http://localhost:3000`. Methods allowed are `PUT, POST, DELETE, GET` and `credentials` are enabled.
- **JWT Expiration**: 
  - Access Token: `20m` (20 minutes).
  - Refresh Token: `14d` (14 days).
- **Cookie Settings**: Cookies are hardcoded as `httpOnly: true`, `secure: false` (since it's localhost development), and `sameSite: "lax"`.
- **Validation Limits**: 
  - Usernames must be between 8 and 32 characters.
  - Passwords must be at least 8 characters and include uppercase, lowercase, numbers, and symbols.
