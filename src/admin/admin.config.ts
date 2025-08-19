const AdminJS = require('adminjs');
const { AdminModule } = require('@adminjs/nestjs');
const { Database, Resource } = require('@adminjs/typeorm');
import { BusinessEntityOrmEntity } from '../modules/business-entity/infrastructure/orm-entities/business-entity.orm-entity';

// Register the TypeORM adapter
AdminJS.registerAdapter({ Database, Resource });

export const adminConfig = {
  adminJsOptions: {
    rootPath: '/admin',
    branding: {
      companyName: 'Business Entity Service',
      logo: false,
      favicon: 'https://adminjs.co/favicon.ico',
    },
    assets: {
      styles: ['/admin/styles.css'],
    },
    locale: {
      language: 'en',
      translations: {
        labels: {
          BusinessEntityOrmEntity: 'Business Entities',
        },
        resources: {
          BusinessEntityOrmEntity: {
            properties: {
              id: 'ID',
              name: 'Business Name',
              legalName: 'Legal Name',
              businessType: 'Type',
              status: 'Status',
              taxId: 'Tax ID',
              registrationNumber: 'Registration #',
              address: 'Address',
              contactInfo: 'Contact Info',
              industry: 'Industry',
              description: 'Description',
              website: 'Website',
              logoUrl: 'Logo URL',
              parentBusinessId: 'Parent Business',
              settings: 'Settings',
              metadata: 'Metadata',
              createdAt: 'Created',
              updatedAt: 'Updated',
            },
            actions: {
              new: 'Create Business Entity',
              edit: 'Edit Business Entity',
              delete: 'Delete Business Entity',
              list: 'Business Entities',
              show: 'View Business Entity',
            },
          },
        },
      },
    },
    resources: [
      {
        resource: BusinessEntityOrmEntity,
        options: {
          navigation: {
            name: 'Business Management',
            icon: 'Building',
          },
          listProperties: [
            'id',
            'name',
            'legalName',
            'businessType',
            'status',
            'industry',
            'createdAt',
          ],
          showProperties: [
            'id',
            'name',
            'legalName',
            'businessType',
            'status',
            'taxId',
            'registrationNumber',
            'address',
            'contactInfo',
            'industry',
            'description',
            'website',
            'logoUrl',
            'parentBusinessId',
            'settings',
            'metadata',
            'createdAt',
            'updatedAt',
          ],
          editProperties: [
            'name',
            'legalName',
            'businessType',
            'status',
            'taxId',
            'registrationNumber',
            'address',
            'contactInfo',
            'industry',
            'description',
            'website',
            'logoUrl',
            'parentBusinessId',
            'settings',
            'metadata',
          ],
          filterProperties: [
            'name',
            'legalName',
            'businessType',
            'status',
            'industry',
            'createdAt',
          ],
          properties: {
            id: {
              isVisible: { list: true, filter: false, show: true, edit: false },
            },
            name: {
              isRequired: true,
              type: 'string',
            },
            legalName: {
              isRequired: true,
              type: 'string',
            },
            businessType: {
              type: 'string',
              availableValues: [
                { value: 'CORPORATION', label: 'Corporation' },
                { value: 'LLC', label: 'Limited Liability Company' },
                { value: 'PARTNERSHIP', label: 'Partnership' },
                { value: 'SOLE_PROPRIETORSHIP', label: 'Sole Proprietorship' },
                { value: 'NONPROFIT', label: 'Non-Profit' },
                { value: 'COOPERATIVE', label: 'Cooperative' },
                { value: 'TRUST', label: 'Trust' },
              ],
            },
            status: {
              type: 'string',
              availableValues: [
                { value: 'ACTIVE', label: 'Active' },
                { value: 'INACTIVE', label: 'Inactive' },
                { value: 'SUSPENDED', label: 'Suspended' },
                { value: 'PENDING_VERIFICATION', label: 'Pending Verification' },
                { value: 'DISSOLVED', label: 'Dissolved' },
              ],
            },
            industry: {
              type: 'string',
              availableValues: [
                { value: 'TECHNOLOGY', label: 'Technology' },
                { value: 'FINANCE', label: 'Finance' },
                { value: 'HEALTHCARE', label: 'Healthcare' },
                { value: 'RETAIL', label: 'Retail' },
                { value: 'MANUFACTURING', label: 'Manufacturing' },
                { value: 'EDUCATION', label: 'Education' },
                { value: 'REAL_ESTATE', label: 'Real Estate' },
                { value: 'HOSPITALITY', label: 'Hospitality' },
                { value: 'TRANSPORTATION', label: 'Transportation' },
                { value: 'ENERGY', label: 'Energy' },
                { value: 'AGRICULTURE', label: 'Agriculture' },
                { value: 'CONSULTING', label: 'Consulting' },
                { value: 'MEDIA', label: 'Media' },
                { value: 'ENTERTAINMENT', label: 'Entertainment' },
                { value: 'OTHER', label: 'Other' },
              ],
            },
            address: {
              type: 'textarea',
              props: {
                rows: 3,
              },
            },
            contactInfo: {
              type: 'textarea',
              props: {
                rows: 3,
              },
            },
            description: {
              type: 'textarea',
              props: {
                rows: 4,
              },
            },
            settings: {
              type: 'textarea',
              props: {
                rows: 4,
              },
            },
            metadata: {
              type: 'textarea',
              props: {
                rows: 4,
              },
            },
            website: {
              type: 'url',
            },
            logoUrl: {
              type: 'url',
            },
            createdAt: {
              isVisible: { list: true, filter: true, show: true, edit: false },
            },
            updatedAt: {
              isVisible: { list: false, filter: false, show: true, edit: false },
            },
          },
          sort: {
            sortBy: 'createdAt',
            direction: 'desc',
          },
        },
      },
    ],
    dashboard: {
      handler: async () => {
        return {
          message: 'Welcome to Business Entity Management Admin Panel',
          stats: {
            totalEntities: 0, // TODO: Add real stats
            activeEntities: 0,
            pendingVerification: 0,
          },
        };
      },
    },
    pages: {
      'business-management': {
        label: 'Business Management',
        handler: async () => {
          return {
            message: 'Business Management Dashboard',
            description: 'Manage business entities, members, roles, and invitations',
          };
        },
      },
    },
  },
  auth: {
    authenticate: async (email: string, password: string) => {
      // TODO: Implement proper authentication
      // For development, use simple credentials
      if (email === 'admin@business-entity.com' && password === 'admin123') {
        return {
          email: 'admin@business-entity.com',
          id: 'admin-user',
          role: 'admin',
        };
      }
      return null;
    },
    cookieName: 'business-entity-admin-session',
    cookiePassword: 'session-key-change-in-production',
  },
  sessionOptions: {
    resave: true,
    saveUninitialized: true,
    secret: 'session-secret-change-in-production',
  },
};

export default adminConfig;