# Multi-Tenant API Documentation

## Overview
This document provides detailed information about the Multi-Tenant Account System API endpoints, request/response formats, and authentication requirements.

## Base URL
```
http://localhost:5000/api
https://localhost:5001/api
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer {your-jwt-token}
```

## API Endpoints

### Authentication Endpoints

#### Register User
Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Errors:**
- `400 Bad Request` - Email already registered or validation failed

---

#### Login User
Authenticate and receive JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Errors:**
- `401 Unauthorized` - Invalid credentials or inactive account

---

### Tenant Endpoints

#### Get My Tenants
Retrieve all tenants the current user is a member of.

**Endpoint:** `GET /tenants`

**Authentication:** Required

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "My Company",
    "description": "Company tenant",
    "slug": "my-company",
    "createdAt": "2024-01-01T00:00:00Z",
    "isActive": true,
    "ownerId": 1,
    "userRole": "Owner"
  },
  {
    "id": 2,
    "name": "Project Team",
    "description": "Team collaboration space",
    "slug": "project-team",
    "createdAt": "2024-01-02T00:00:00Z",
    "isActive": true,
    "ownerId": 2,
    "userRole": "Member"
  }
]
```

---

#### Get Tenant Details
Retrieve details of a specific tenant.

**Endpoint:** `GET /tenants/{id}`

**Authentication:** Required

**URL Parameters:**
- `id` (integer) - Tenant ID

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "My Company",
  "description": "Company tenant",
  "slug": "my-company",
  "createdAt": "2024-01-01T00:00:00Z",
  "isActive": true,
  "ownerId": 1,
  "userRole": "Owner"
}
```

**Errors:**
- `404 Not Found` - Tenant not found or access denied

---

#### Create Tenant
Create a new tenant. User becomes the owner automatically.

**Endpoint:** `POST /tenants`

**Authentication:** Required

**Request Body:**
```json
{
  "name": "My Company",
  "description": "Company tenant",
  "slug": "my-company"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "name": "My Company",
  "description": "Company tenant",
  "slug": "my-company",
  "createdAt": "2024-01-01T00:00:00Z",
  "isActive": true,
  "ownerId": 1,
  "userRole": "Owner"
}
```

**Errors:**
- `400 Bad Request` - Slug already exists or validation failed

---

#### Update Tenant
Update tenant information. Requires Owner or Admin role.

**Endpoint:** `PUT /tenants/{id}`

**Authentication:** Required (Owner or Admin)

**URL Parameters:**
- `id` (integer) - Tenant ID

**Request Body:**
```json
{
  "name": "Updated Company Name",
  "description": "Updated description"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Updated Company Name",
  "description": "Updated description",
  "slug": "my-company",
  "createdAt": "2024-01-01T00:00:00Z",
  "isActive": true,
  "ownerId": 1,
  "userRole": "Owner"
}
```

**Errors:**
- `404 Not Found` - Tenant not found or access denied
- `403 Forbidden` - Insufficient permissions

---

#### Delete Tenant
Deactivate a tenant. Requires Owner role.

**Endpoint:** `DELETE /tenants/{id}`

**Authentication:** Required (Owner only)

**URL Parameters:**
- `id` (integer) - Tenant ID

**Response:** `204 No Content`

**Errors:**
- `404 Not Found` - Tenant not found or not owner

---

### Member Management Endpoints

#### Get Tenant Members
Retrieve all members of a tenant.

**Endpoint:** `GET /tenants/{id}/members`

**Authentication:** Required

**URL Parameters:**
- `id` (integer) - Tenant ID

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "user": {
      "id": 1,
      "email": "owner@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "role": "Owner",
    "joinedAt": "2024-01-01T00:00:00Z",
    "isActive": true
  },
  {
    "id": 2,
    "user": {
      "id": 2,
      "email": "member@example.com",
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "role": "Member",
    "joinedAt": "2024-01-02T00:00:00Z",
    "isActive": true
  }
]
```

**Errors:**
- `404 Not Found` - Tenant not found or access denied

---

#### Add Member
Add a new member to a tenant. Requires Owner or Admin role.

**Endpoint:** `POST /tenants/{id}/members`

**Authentication:** Required (Owner or Admin)

**URL Parameters:**
- `id` (integer) - Tenant ID

**Request Body:**
```json
{
  "email": "newmember@example.com",
  "role": "Member"
}
```

**Roles:** `Owner`, `Admin`, `Member`, `Viewer`

**Response:** `200 OK`
```json
{
  "id": 3,
  "user": {
    "id": 3,
    "email": "newmember@example.com",
    "firstName": "Bob",
    "lastName": "Johnson"
  },
  "role": "Member",
  "joinedAt": "2024-01-03T00:00:00Z",
  "isActive": true
}
```

**Errors:**
- `404 Not Found` - Tenant or user not found, or access denied
- `400 Bad Request` - User is already a member
- `403 Forbidden` - Insufficient permissions

---

#### Update Member Role
Update a member's role in a tenant. Requires Owner or Admin role.

**Endpoint:** `PUT /tenants/{id}/members/{memberId}`

**Authentication:** Required (Owner or Admin)

**URL Parameters:**
- `id` (integer) - Tenant ID
- `memberId` (integer) - Membership ID

**Request Body:**
```json
{
  "role": "Admin"
}
```

**Response:** `200 OK`
```json
{
  "id": 2,
  "user": {
    "id": 2,
    "email": "member@example.com",
    "firstName": "Jane",
    "lastName": "Smith"
  },
  "role": "Admin",
  "joinedAt": "2024-01-02T00:00:00Z",
  "isActive": true
}
```

**Errors:**
- `404 Not Found` - Tenant or member not found
- `403 Forbidden` - Insufficient permissions (e.g., trying to modify Owner role)

---

#### Remove Member
Remove a member from a tenant. Requires Owner or Admin role. Cannot remove the Owner.

**Endpoint:** `DELETE /tenants/{id}/members/{memberId}`

**Authentication:** Required (Owner or Admin)

**URL Parameters:**
- `id` (integer) - Tenant ID
- `memberId` (integer) - Membership ID

**Response:** `204 No Content`

**Errors:**
- `404 Not Found` - Tenant or member not found
- `400 Bad Request` - Cannot remove the owner
- `403 Forbidden` - Insufficient permissions

---

## Data Models

### User
```typescript
{
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}
```

### Tenant
```typescript
{
  id: number;
  name: string;
  description: string | null;
  slug: string;
  createdAt: string; // ISO 8601 datetime
  isActive: boolean;
  ownerId: number;
  userRole: "Owner" | "Admin" | "Member" | "Viewer";
}
```

### TenantMember
```typescript
{
  id: number;
  user: User;
  role: "Owner" | "Admin" | "Member" | "Viewer";
  joinedAt: string; // ISO 8601 datetime
  isActive: boolean;
}
```

## Role Permissions

| Action | Owner | Admin | Member | Viewer |
|--------|-------|-------|--------|--------|
| View tenant details | ✅ | ✅ | ✅ | ✅ |
| View members | ✅ | ✅ | ✅ | ✅ |
| Update tenant | ✅ | ✅ | ❌ | ❌ |
| Delete tenant | ✅ | ❌ | ❌ | ❌ |
| Add members | ✅ | ✅ | ❌ | ❌ |
| Update member roles | ✅ | ✅ | ❌ | ❌ |
| Remove members | ✅ | ✅ | ❌ | ❌ |
| Modify Owner role | ✅ | ❌ | ❌ | ❌ |

## Error Responses

All error responses follow this format:

```json
{
  "message": "Error description"
}
```

### Common HTTP Status Codes
- `200 OK` - Successful GET, PUT requests
- `201 Created` - Successful POST requests
- `204 No Content` - Successful DELETE requests
- `400 Bad Request` - Validation errors
- `401 Unauthorized` - Authentication required or failed
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found

## Testing with cURL

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Create Tenant
```bash
curl -X POST http://localhost:5000/api/tenants \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "My Company",
    "description": "Test tenant",
    "slug": "my-company"
  }'
```

### Get Tenants
```bash
curl -X GET http://localhost:5000/api/tenants \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Rate Limiting

Currently, there are no rate limits implemented. In production, consider implementing:
- Authentication endpoint: 5 requests per minute
- Other endpoints: 100 requests per minute per user

## Versioning

Current API version: v1

Future versions will be accessible via URL path:
- v1: `/api/v1/...`
- v2: `/api/v2/...`

## Support

For issues or questions, please refer to the main README.md file.
