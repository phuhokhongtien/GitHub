# API Documentation

API documentation for Kendy MCP Assistant backend services.

## Status

🚧 **Not yet implemented** - This documentation will be populated in Phase 1.3 when backend services are built.

## Planned API Structure

### Authentication API

```
POST   /api/v1/auth/register      - Register new user
POST   /api/v1/auth/login         - Login user
POST   /api/v1/auth/logout        - Logout user
POST   /api/v1/auth/refresh       - Refresh access token
GET    /api/v1/auth/me            - Get current user
```

### User Management API

```
GET    /api/v1/users              - List users (admin)
GET    /api/v1/users/:id          - Get user by ID
PUT    /api/v1/users/:id          - Update user
DELETE /api/v1/users/:id          - Delete user
```

### Tenant Management API

```
GET    /api/v1/tenants            - List tenants
POST   /api/v1/tenants            - Create tenant
GET    /api/v1/tenants/:id        - Get tenant details
PUT    /api/v1/tenants/:id        - Update tenant
DELETE /api/v1/tenants/:id        - Delete tenant
```

### MCP Service API

```
GET    /api/v1/mcp/servers        - List MCP servers
POST   /api/v1/mcp/servers        - Create MCP server
GET    /api/v1/mcp/servers/:id    - Get server details
PUT    /api/v1/mcp/servers/:id    - Update server config
DELETE /api/v1/mcp/servers/:id    - Delete server
POST   /api/v1/mcp/servers/:id/start   - Start server
POST   /api/v1/mcp/servers/:id/stop    - Stop server
GET    /api/v1/mcp/servers/:id/status  - Get server status
```

### Voice Processing API

```
POST   /api/v1/voice/stt          - Speech-to-Text
POST   /api/v1/voice/tts          - Text-to-Speech
GET    /api/v1/voice/languages    - List supported languages
```

### Tasks & Planning API

```
GET    /api/v1/tasks              - List tasks
POST   /api/v1/tasks              - Create task
GET    /api/v1/tasks/:id          - Get task details
PUT    /api/v1/tasks/:id          - Update task
DELETE /api/v1/tasks/:id          - Delete task
POST   /api/v1/tasks/:id/complete - Mark task as complete
GET    /api/v1/tasks/suggestions  - Get AI-powered suggestions
```

### Analytics API

```
GET    /api/v1/analytics/overview     - Overview metrics
GET    /api/v1/analytics/usage        - Usage statistics
GET    /api/v1/analytics/performance  - Performance metrics
POST   /api/v1/analytics/reports      - Generate custom report
```

## API Documentation Tools

Once implemented, full API documentation will be available via:

- **Swagger/OpenAPI UI**: `http://localhost:3000/api-docs`
- **Postman Collection**: Available in `shared/api-specs/`
- **API Specification**: OpenAPI 3.0 spec in `shared/api-specs/openapi.yaml`

## Authentication

All API endpoints (except `/auth/register` and `/auth/login`) require authentication.

**Header:**
```
Authorization: Bearer <JWT_TOKEN>
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Success message"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": {}
  }
}
```

## Rate Limiting

- **Rate Limit**: 100 requests per minute per tenant
- **Headers**:
  - `X-RateLimit-Limit`: Request limit
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset timestamp

## Pagination

List endpoints support pagination:

**Query Parameters:**
```
?page=1&limit=20&sort=created_at&order=desc
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `AUTH_001` | Invalid credentials |
| `AUTH_002` | Token expired |
| `AUTH_003` | Insufficient permissions |
| `TENANT_001` | Tenant not found |
| `TENANT_002` | Tenant limit exceeded |
| `MCP_001` | MCP server not found |
| `MCP_002` | Server start failed |
| `VOICE_001` | STT processing failed |
| `VOICE_002` | TTS generation failed |
| `TASK_001` | Task not found |

More error codes will be added as features are implemented.

---

**Last Updated**: 2024-09-30

**Note**: This is a preliminary API design. Actual implementation may vary.
