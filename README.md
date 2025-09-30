# Multi-Tenant Account System

A complete multi-tenant account management system with secure data isolation, role-based access control, and comprehensive tenant management features.

## Features

### Backend (ASP.NET Core Web API)
- ✅ User authentication with JWT tokens
- ✅ Secure password hashing with BCrypt
- ✅ Multi-tenant data model with SQLite database
- ✅ Role-based access control (Owner, Admin, Member, Viewer)
- ✅ Tenant creation and management APIs
- ✅ Member management with role assignments
- ✅ Secure tenant data isolation
- ✅ RESTful API with Swagger documentation

### Mobile App (React Native/Expo)
- ✅ User registration and login
- ✅ Tenant listing and management
- ✅ Tenant creation with auto-slug generation
- ✅ Tenant switching functionality
- ✅ Role-based UI rendering
- ✅ Member management interface
- ✅ Offline token storage with AsyncStorage

## Architecture

### Database Schema

#### Users Table
- `Id` (Primary Key)
- `Email` (Unique)
- `PasswordHash`
- `FirstName`, `LastName`
- `CreatedAt`, `UpdatedAt`
- `IsActive`

#### Tenants Table
- `Id` (Primary Key)
- `Name`
- `Description`
- `Slug` (Unique)
- `OwnerId` (Foreign Key to Users)
- `CreatedAt`, `UpdatedAt`
- `IsActive`

#### TenantMemberships Table (Join Table)
- `Id` (Primary Key)
- `UserId` (Foreign Key to Users)
- `TenantId` (Foreign Key to Tenants)
- `Role` (Enum: Owner, Admin, Member, Viewer)
- `JoinedAt`
- `IsActive`
- Unique constraint on (UserId, TenantId)

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

#### Tenants
- `GET /api/tenants` - Get all user's tenants
- `GET /api/tenants/{id}` - Get tenant details
- `POST /api/tenants` - Create new tenant
- `PUT /api/tenants/{id}` - Update tenant (Owner/Admin only)
- `DELETE /api/tenants/{id}` - Deactivate tenant (Owner only)

#### Member Management
- `GET /api/tenants/{id}/members` - Get all members
- `POST /api/tenants/{id}/members` - Add member (Owner/Admin only)
- `PUT /api/tenants/{id}/members/{memberId}` - Update member role (Owner/Admin only)
- `DELETE /api/tenants/{id}/members/{memberId}` - Remove member (Owner/Admin only)

### Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Password Hashing**: BCrypt with salt for password security
3. **Role-Based Access Control**: Four-tier permission system
4. **Tenant Isolation**: Users can only access tenants they are members of
5. **API Authorization**: All tenant operations require valid JWT token

## Setup Instructions

### Backend Setup

1. Navigate to the API directory:
   ```bash
   cd MultiTenantApi
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the API:
   ```bash
   dotnet run
   ```

   The API will start at `https://localhost:5001` (HTTPS) or `http://localhost:5000` (HTTP)

4. Access Swagger UI for API documentation:
   - Open browser to `https://localhost:5001/swagger` or `http://localhost:5000/swagger`

### Mobile App Setup

1. Navigate to the mobile app directory:
   ```bash
   cd MobileApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update API URL in `src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://YOUR_IP_ADDRESS:5000/api';
   ```
   Replace `YOUR_IP_ADDRESS` with your computer's IP address (not localhost when testing on physical device)

4. Start the app:
   ```bash
   npm start
   ```

5. Run on your preferred platform:
   - Press `a` for Android
   - Press `i` for iOS (macOS only)
   - Press `w` for web

## Usage Guide

### Creating Your First Tenant

1. **Register/Login**: Create an account or login
2. **Create Tenant**: 
   - Tap "Create Tenant" button
   - Enter tenant name (e.g., "My Company")
   - Slug is auto-generated from name
   - Add optional description
   - Submit
3. **You're Done**: You're automatically added as the Owner

### Managing Members

1. **Navigate to Tenant**: Select tenant from list
2. **Add Members**:
   - Tap "+ Add" button
   - Enter member's email (they must be registered)
   - Select role (Owner, Admin, Member, or Viewer)
   - Submit
3. **Manage Roles**: Tap on member to update role or remove

### Switching Between Tenants

1. Go to "My Tenants" screen
2. Tap on any tenant to select it
3. The current tenant is marked with a blue border
4. All operations are scoped to the current tenant

## Role Permissions

| Action | Owner | Admin | Member | Viewer |
|--------|-------|-------|--------|--------|
| View tenant | ✅ | ✅ | ✅ | ✅ |
| Update tenant | ✅ | ✅ | ❌ | ❌ |
| Delete tenant | ✅ | ❌ | ❌ | ❌ |
| Add members | ✅ | ✅ | ❌ | ❌ |
| Update member roles | ✅ | ✅ | ❌ | ❌ |
| Remove members | ✅ | ✅ | ❌ | ❌ |

## Testing

### API Testing with Swagger

1. Start the API
2. Navigate to `http://localhost:5000/swagger`
3. Test endpoints:
   - Register a user with `POST /api/auth/register`
   - Login with `POST /api/auth/login` to get JWT token
   - Click "Authorize" button and enter: `Bearer {your-token}`
   - Test tenant operations

### Manual Testing Flow

1. **User Registration**:
   - Register 2-3 test users
   - Verify email uniqueness validation

2. **Tenant Creation**:
   - Create multiple tenants with first user
   - Verify slug uniqueness validation

3. **Member Management**:
   - Add second user to first user's tenant
   - Test different roles
   - Verify permissions

4. **Tenant Switching**:
   - Login as second user
   - Verify they see only their tenants
   - Switch between tenants

## Technology Stack

### Backend
- **ASP.NET Core 8.0** - Web API framework
- **Entity Framework Core** - ORM
- **SQLite** - Database
- **JWT Bearer** - Authentication
- **BCrypt.Net** - Password hashing
- **Swagger/OpenAPI** - API documentation

### Mobile
- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation
- **Axios** - HTTP client
- **AsyncStorage** - Local storage

## Project Structure

```
GitHub/
├── MultiTenantApi/               # Backend API
│   ├── Controllers/              # API Controllers
│   │   ├── AuthController.cs
│   │   └── TenantsController.cs
│   ├── Models/                   # Data Models
│   │   ├── User.cs
│   │   ├── Tenant.cs
│   │   └── TenantMembership.cs
│   ├── DTOs/                     # Data Transfer Objects
│   │   ├── AuthDTOs.cs
│   │   └── TenantDTOs.cs
│   ├── Data/                     # Database Context
│   │   └── ApplicationDbContext.cs
│   ├── Services/                 # Business Services
│   │   └── JwtService.cs
│   ├── Program.cs                # App Configuration
│   └── appsettings.json          # Configuration
├── MobileApp/                    # Mobile Application
│   ├── src/
│   │   ├── screens/              # App Screens
│   │   │   ├── LoginScreen.js
│   │   │   ├── RegisterScreen.js
│   │   │   ├── TenantsScreen.js
│   │   │   ├── CreateTenantScreen.js
│   │   │   └── TenantDetailScreen.js
│   │   ├── services/             # API Services
│   │   │   └── api.js
│   │   └── context/              # React Context
│   │       └── AuthContext.js
│   ├── App.js                    # Main App Component
│   └── package.json              # Dependencies
└── README.md                     # This file
```

## Future Enhancements

- [ ] Email verification for new users
- [ ] Password reset functionality
- [ ] Tenant branding/customization
- [ ] Activity logs and audit trails
- [ ] Multi-factor authentication
- [ ] Tenant invitation system
- [ ] File storage per tenant
- [ ] Billing and subscription management
- [ ] Advanced permission system
- [ ] Real-time notifications

## Contributing

This is a demonstration project for multi-tenant architecture. Feel free to fork and enhance!

## License

MIT License - Free to use and modify.

