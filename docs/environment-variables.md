# Environment Variables Documentation

This document describes the environment variables used in this project.

## Mobile App Environment Variables

Create a `.env` file in the `mobile/` directory with the following variables:

```env
# API Configuration
API_URL=https://api.example.com
API_TIMEOUT=30000

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_CRASH_REPORTING=true

# Third-party Services
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
SENTRY_DSN=your_sentry_dsn

# Environment
NODE_ENV=development
```

### Environment-Specific Files

- `.env.development` - Development environment
- `.env.staging` - Staging environment
- `.env.production` - Production environment

## Backend API Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=0.0.0.0

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10

# Redis
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=
REDIS_DB=0

# Authentication
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRATION=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRATION=30d

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:8081
ALLOWED_ORIGINS=*

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads

# Email (SMTP)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@example.com
SMTP_PASSWORD=your_smtp_password
SMTP_FROM=noreply@example.com

# External Services
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
S3_BUCKET=your-bucket-name

# Monitoring
SENTRY_DSN=your_sentry_dsn
LOG_LEVEL=debug

# Security
BCRYPT_ROUNDS=10
SESSION_SECRET=your_session_secret
COOKIE_SECRET=your_cookie_secret

# Feature Flags
ENABLE_SWAGGER=true
ENABLE_METRICS=true
```

### Environment-Specific Files

- `.env.development` - Development environment
- `.env.test` - Test environment
- `.env.staging` - Staging environment
- `.env.production` - Production environment

## CI/CD Environment Variables (GitHub Secrets)

These should be configured in GitHub repository settings (Settings → Secrets and variables → Actions):

### Docker Hub
```
DOCKER_USERNAME - Your Docker Hub username
DOCKER_PASSWORD - Your Docker Hub password or access token
```

### Server Deployment
```
DEPLOY_HOST - Production server hostname/IP
DEPLOY_USER - SSH username
DEPLOY_SSH_KEY - Private SSH key for server access
```

### Android Build
```
ANDROID_KEYSTORE_BASE64 - Base64-encoded release keystore
ANDROID_KEYSTORE_PASSWORD - Keystore password
ANDROID_KEY_ALIAS - Key alias
ANDROID_KEY_PASSWORD - Key password
GOOGLE_PLAY_SERVICE_ACCOUNT - Google Play service account JSON
```

### iOS Build
```
IOS_CERTIFICATES_P12 - Base64-encoded P12 certificate
IOS_CERTIFICATES_PASSWORD - Certificate password
IOS_PROVISIONING_PROFILE_BASE64 - Base64-encoded provisioning profile
APPSTORE_ISSUER_ID - App Store Connect issuer ID
APPSTORE_API_KEY_ID - App Store Connect API key ID
APPSTORE_API_PRIVATE_KEY - App Store Connect API private key
```

### Code Coverage
```
CODECOV_TOKEN - Codecov upload token (for private repos)
```

## Security Best Practices

1. **Never commit `.env` files** - They are in `.gitignore`
2. **Use different secrets** for different environments
3. **Rotate secrets regularly** (at least quarterly)
4. **Use strong, random values** for all secrets
5. **Limit secret access** to only necessary team members
6. **Use environment-specific files** for different deployments

## Loading Environment Variables

### Mobile (React Native)

Using `react-native-config`:

```bash
npm install react-native-config
```

```javascript
import Config from 'react-native-config';

const apiUrl = Config.API_URL;
```

### Backend (Node.js)

Using `dotenv`:

```bash
npm install dotenv
```

```javascript
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
```

## Validating Environment Variables

### Backend Example

```typescript
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']),
  PORT: z.coerce.number().min(1000).max(65535),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  // ... other variables
});

export const env = envSchema.parse(process.env);
```

## Troubleshooting

### Variables Not Loading

1. Ensure `.env` file exists in the correct directory
2. Check file has proper format (KEY=value, no spaces around =)
3. Restart development server after changes
4. Verify no syntax errors in `.env` file

### CI/CD Secrets Not Working

1. Verify secrets are set in GitHub repository settings
2. Check secret names match exactly (case-sensitive)
3. Ensure secrets don't have extra whitespace
4. Re-create secret if still not working

### Base64 Encoding Files

To encode files for GitHub secrets:

```bash
# On Linux/macOS
base64 -i input.file > output.txt

# On Windows
certutil -encode input.file output.txt
```

Then copy the contents to GitHub secrets.
