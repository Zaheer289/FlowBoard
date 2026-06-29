# Security & Authentication

FlowBoard uses cookie-based JSON Web Tokens (JWT) for secure authentication. 

## Authentication Flow

1. **Registration / Login**: The user submits credentials. The backend verifies them using bcrypt against the hash stored in MongoDB.
2. **Token Generation**: Upon successful authentication, two tokens are generated:
   - **Access Token**: Short-lived (20 minutes).
   - **Refresh Token**: Long-lived (14 days).
3. **Cookie Storage**: The server sets both tokens as `httpOnly`, `lax` cookies. This prevents cross-site scripting (XSS) attacks from accessing the tokens via JavaScript.
4. **API Requests**: The frontend uses Axios configured with `withCredentials: true`. This automatically attaches the `httpOnly` cookies to all outbound API requests.
5. **Token Verification**: The backend `verifyAccessToken` middleware reads `req.cookies.access_token` and verifies its signature using the secret.

## JWT Payload

Both the Access Token and Refresh Token contain the following payload structure inside the signed JWT:

```json
{
  "id": "645a2... (User ObjectId)",
  "email": "user@example.com",
  "name": "username123"
}
```

## Socket Security

Socket connections are authenticated via middleware. When establishing a WebSocket connection, the frontend sends its initialization payload. The Node.js server `io.use()` middleware intercepts the handshake, extracts the `cookie` string from headers, parses out the `access_token`, and verifies it before allowing the connection to upgrade. If the token is missing or invalid, the socket connection is rejected.
