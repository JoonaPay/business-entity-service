# Business Entity Management Service

## 🏢 Overview

The Business Entity Management Service is a sophisticated microservice that powers the organizational infrastructure for the JoonaPay fintech platform. It provides comprehensive business hierarchy management, API access control, team collaboration, and role-based permissions - similar to how Stripe, Twilio, and other successful B2B SaaS platforms operate.

## 🎯 Key Features

### Hierarchical Business Organization
- **5-Level Hierarchy System**: ROOT_ORGANIZATION → SUBSIDIARY → DIVISION → DEPARTMENT → TEAM
- **Parent-Child Relationships**: Businesses can create sub-businesses with inherited permissions
- **Organigram Support**: Complex corporate structures with cascading permissions
- **Resource Allocation**: Proportional limits and quotas for child businesses

### API Access Management
- **Dual Environment System**:
  - **Sandbox**: Immediate API keys for testing (test_xxx prefix)
  - **Production**: Requires KYC verification + signed contracts (live_xxx prefix)
- **Rate Limiting**: Tier-based API call limits with usage tracking
- **IP Allowlisting**: Security controls for production environments
- **Webhook Configuration**: Per-environment webhook URLs with HMAC secrets

### Team & Role Management
- **Multi-User Collaboration**: Multiple team members per business entity
- **RBAC System**: Fine-grained role-based access control
- **Predefined Roles**: Owner, Admin, Manager, Member, Viewer
- **Custom Roles**: Create business-specific roles with custom permissions
- **Invitation System**: Email-based team member invitations with expiration

### Billing & Compliance
- **Tiered Pricing**:
  - **FREE**: 1,000 API calls/day, 1 sub-business, 3 members
  - **STARTUP**: 10,000 API calls/day, 5 sub-businesses, 10 members
  - **ENTERPRISE**: 100,000 API calls/day, 50 sub-businesses, 100 members
- **Usage Tracking**: Real-time API call monitoring for billing
- **KYC/KYB Integration**: Compliance verification for production access
- **Contract Management**: Digital agreement tracking

## 🚀 Getting Started

### Prerequisites
```bash
- Node.js 18+
- PostgreSQL 14+
- Redis (for caching)
- Docker (optional)
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JoonaPay/business-entity-service.git
cd business-entity-service
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run database migrations:
```bash
npm run migration:run
```

5. Start the service:
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## 📚 API Documentation

### Authentication
All API requests require JWT authentication via the Identity Service:
```bash
Authorization: Bearer <jwt_token>
```

### Core Endpoints

#### Business Management
```typescript
POST   /api/businesses                 // Create root organization
GET    /api/businesses                 // List user's businesses
GET    /api/businesses/:id             // Get business details
PUT    /api/businesses/:id             // Update business
POST   /api/businesses/:id/verify      // Submit for KYC verification
POST   /api/businesses/:id/subsidiaries // Create sub-business
```

#### API Key Management
```typescript
POST   /api/businesses/:id/api-keys    // Generate API key
GET    /api/businesses/:id/api-keys    // List API keys
DELETE /api/businesses/:id/api-keys/:keyId // Revoke API key
POST   /api/businesses/:id/enable-production // Enable production access
```

#### Team Management
```typescript
GET    /api/businesses/:id/members     // List team members
POST   /api/businesses/:id/invitations // Send invitation
PUT    /api/invitations/:token/accept  // Accept invitation
PUT    /api/businesses/:id/members/:userId/role // Change member role
DELETE /api/businesses/:id/members/:userId // Remove member
POST   /api/businesses/:id/transfer-ownership // Transfer ownership
```

#### Role Management
```typescript
GET    /api/businesses/:id/roles       // List roles
POST   /api/businesses/:id/roles       // Create custom role
PUT    /api/businesses/:id/roles/:roleId // Update role
GET    /api/permissions                // List available permissions
```

## 🏗️ Architecture

### Domain-Driven Design (DDD)
```
src/
├── modules/
│   ├── business-entity/
│   │   ├── domain/           # Business logic & entities
│   │   ├── application/      # Use cases & DTOs
│   │   └── infrastructure/   # Database & external services
│   ├── business-role/
│   ├── business-member/
│   └── business-invitation/
└── core/                      # Shared kernel
```

### Key Domain Entities

#### BusinessEntity
```typescript
class BusinessEntity {
  // Hierarchy
  businessType: BusinessType;
  parentBusinessId?: string;
  childBusinessIds: string[];
  
  // API Management
  environments: {
    sandbox: EnvironmentConfig;
    production: EnvironmentConfig;
  };
  
  // Billing
  billing: {
    tier: 'FREE' | 'STARTUP' | 'ENTERPRISE';
    usage: UsageMetrics;
    limits: RateLimits;
  };
  
  // Compliance
  compliance: {
    kycStatus: VerificationStatus;
    contractSigned: boolean;
  };
}
```

## 🔄 Event-Driven Architecture

### Published Events
- `BusinessEntityCreated`
- `BusinessEntityVerified`
- `MemberInvited`
- `MemberJoined`
- `APIKeyCreated`
- `OwnershipTransferred`

### Consumed Events
- `UserCreated` (from Identity Service)
- `KYCVerificationCompleted` (from Compliance Service)

## 🧪 Testing

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:cov
```

## 📊 Monitoring

- **Health Check**: `GET /health`
- **Metrics**: `GET /metrics` (Prometheus format)
- **OpenAPI Spec**: `GET /api-docs`

## 🔒 Security

- JWT-based authentication
- Role-based authorization
- API key validation with rate limiting
- IP allowlisting for production
- Audit logging for all operations
- HMAC webhook signatures

## 🚢 Deployment

### Docker
```bash
docker build -t business-entity-service .
docker run -p 3000:3000 business-entity-service
```

### Kubernetes
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the JoonaPay platform and is proprietary software.

## 🔗 Related Services

- [Identity Manager Service](https://github.com/JoonaPay/identity-manager-service)
- [Ledger Service](https://github.com/JoonaPay/ledger-service)
- [Compliance Service](https://github.com/JoonaPay/compliance-service)
- [AML Risk Manager Service](https://github.com/JoonaPay/aml-risk-manager-service)

## 📞 Support

For questions and support, please contact the JoonaPay engineering team.

---

Built with ❤️ by the JoonaPay Team
