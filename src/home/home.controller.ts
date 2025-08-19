import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('home')
@Controller()
export class HomeController {
  @Get()
  @ApiOperation({
    summary: 'Service home page',
    description: 'Displays the service information and available endpoints',
  })
  @ApiResponse({
    status: 200,
    description: 'Service information displayed successfully',
    content: {
      'text/html': {
        schema: {
          type: 'string',
          example: '<html>...</html>'
        }
      }
    }
  })
  getHome(@Res() res: Response) {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Business Entity Management Service</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .container {
                background: white;
                padding: 3rem;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                max-width: 800px;
                width: 90%;
                text-align: center;
            }
            .logo {
                font-size: 3rem;
                margin-bottom: 1rem;
                color: #667eea;
            }
            h1 {
                color: #2d3748;
                margin-bottom: 1rem;
                font-size: 2.5rem;
                font-weight: 700;
            }
            .subtitle {
                color: #718096;
                margin-bottom: 2rem;
                font-size: 1.2rem;
            }
            .features {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
                margin: 2rem 0;
            }
            .feature {
                background: #f7fafc;
                padding: 1.5rem;
                border-radius: 12px;
                border-left: 4px solid #667eea;
            }
            .feature h3 {
                color: #2d3748;
                margin-bottom: 0.5rem;
                font-size: 1.1rem;
            }
            .feature p {
                color: #718096;
                font-size: 0.9rem;
            }
            .links {
                margin-top: 2rem;
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
            }
            .btn {
                padding: 12px 24px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s ease;
                border: 2px solid transparent;
            }
            .btn-primary {
                background: #667eea;
                color: white;
            }
            .btn-primary:hover {
                background: #5a67d8;
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
            }
            .btn-secondary {
                background: transparent;
                color: #667eea;
                border-color: #667eea;
            }
            .btn-secondary:hover {
                background: #667eea;
                color: white;
                transform: translateY(-2px);
            }
            .status {
                margin-top: 2rem;
                padding: 1rem;
                background: #f0fff4;
                border: 1px solid #9ae6b4;
                border-radius: 8px;
                color: #276749;
            }
            .version {
                margin-top: 1rem;
                color: #a0aec0;
                font-size: 0.9rem;
            }
            @media (max-width: 768px) {
                .container { padding: 2rem; }
                h1 { font-size: 2rem; }
                .features { grid-template-columns: 1fr; }
                .links { flex-direction: column; align-items: center; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">🏢</div>
            <h1>Business Entity Management Service</h1>
            <p class="subtitle">Comprehensive API for managing business entities, members, roles, and invitations</p>
            
            <div class="features">
                <div class="feature">
                    <h3>🏗️ Business Entities</h3>
                    <p>Create and manage business organizations with hierarchical structures</p>
                </div>
                <div class="feature">
                    <h3>👥 Member Management</h3>
                    <p>Handle business members, roles, and permission assignments</p>
                </div>
                <div class="feature">
                    <h3>🎭 Role System</h3>
                    <p>Flexible role-based access control with custom permissions</p>
                </div>
                <div class="feature">
                    <h3>📧 Invitations</h3>
                    <p>Send and manage business invitations with email integration</p>
                </div>
                <div class="feature">
                    <h3>📊 Admin Panel</h3>
                    <p>Administrative interface for data management and monitoring</p>
                </div>
                <div class="feature">
                    <h3>📚 API Documentation</h3>
                    <p>Interactive Swagger/OpenAPI documentation with examples</p>
                </div>
            </div>

            <div class="status">
                <strong>🟢 Service Status:</strong> Running and Ready
            </div>

            <div class="links">
                <a href="/api/docs" class="btn btn-primary">📖 API Documentation</a>
                <a href="/admin" class="btn btn-secondary">⚙️ Admin Panel</a>
                <a href="/business-entities" class="btn btn-secondary">🏢 Business Entities</a>
            </div>

            <div class="version">
                <p>Version 1.0.0 | Built with NestJS & Domain-Driven Design</p>
                <p>Environment: ${process.env.NODE_ENV || 'development'} | Port: ${process.env.PORT || '3000'}</p>
            </div>
        </div>

        <script>
            // Add some interactive effects
            document.querySelectorAll('.feature').forEach(feature => {
                feature.addEventListener('mouseenter', () => {
                    feature.style.transform = 'translateY(-5px)';
                    feature.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                });
                feature.addEventListener('mouseleave', () => {
                    feature.style.transform = 'translateY(0)';
                    feature.style.boxShadow = 'none';
                });
            });

            // Check API health
            fetch('/business-entities')
                .then(response => {
                    if (response.ok) {
                        console.log('✅ API is responding correctly');
                    }
                })
                .catch(() => {
                    console.log('⚠️ API might be starting up');
                });
        </script>
    </body>
    </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }

  @Get('health')
  @ApiOperation({
    summary: 'Health check endpoint',
    description: 'Returns the health status of the service',
  })
  @ApiResponse({
    status: 200,
    description: 'Service is healthy',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        timestamp: { type: 'string', format: 'date-time' },
        uptime: { type: 'number', description: 'Uptime in seconds' },
        environment: { type: 'string', example: 'development' },
        version: { type: 'string', example: '1.0.0' },
        database: { type: 'string', example: 'connected' },
        memory: {
          type: 'object',
          properties: {
            used: { type: 'string', example: '25.6 MB' },
            free: { type: 'string', example: '128.4 MB' }
          }
        }
      }
    }
  })
  getHealth() {
    const memoryUsage = process.memoryUsage();
    
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      database: 'connected', // TODO: Add actual database health check
      memory: {
        used: `${Math.round(memoryUsage.heapUsed / 1024 / 1024 * 100) / 100} MB`,
        free: `${Math.round((memoryUsage.heapTotal - memoryUsage.heapUsed) / 1024 / 1024 * 100) / 100} MB`
      },
      api: {
        endpoints: {
          businessEntities: '/business-entities',
          businessMembers: '/business-members',
          businessRoles: '/business-roles',
          businessInvitations: '/business-invitations',
          documentation: '/api/docs',
          admin: '/admin'
        }
      }
    };
  }

  @Get('info')
  @ApiOperation({
    summary: 'Service information',
    description: 'Returns detailed information about the service and its capabilities',
  })
  @ApiResponse({
    status: 200,
    description: 'Service information retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Business Entity Management Service' },
        description: { type: 'string' },
        version: { type: 'string', example: '1.0.0' },
        features: { type: 'array', items: { type: 'string' } },
        endpoints: { type: 'object' },
        architecture: { type: 'object' }
      }
    }
  })
  getInfo() {
    return {
      name: 'Business Entity Management Service',
      description: 'A comprehensive microservice for managing business entities, members, roles, and invitations using Domain-Driven Design principles.',
      version: '1.0.0',
      features: [
        'Business Entity Management',
        'Member Management with Role-Based Access Control',
        'Flexible Role System with Custom Permissions',
        'Email-based Invitation System',
        'Hierarchical Business Structures',
        'API Documentation with Swagger',
        'Administrative Interface with AdminJS',
        'Domain-Driven Design Architecture',
        'CQRS Pattern Implementation',
        'PostgreSQL Database Integration',
        'TypeORM for Data Access',
        'Comprehensive Validation',
        'Health Monitoring'
      ],
      endpoints: {
        home: {
          path: '/',
          description: 'Service home page with links and information'
        },
        health: {
          path: '/health',
          description: 'Health check endpoint for monitoring'
        },
        docs: {
          path: '/api/docs',
          description: 'Interactive API documentation (Swagger UI)'
        },
        admin: {
          path: '/admin',
          description: 'Administrative interface for data management'
        },
        businessEntities: {
          path: '/business-entities',
          description: 'CRUD operations for business entities'
        },
        businessMembers: {
          path: '/business-members',
          description: 'Member management and role assignments'
        },
        businessRoles: {
          path: '/business-roles',
          description: 'Role management and permission configuration'
        },
        businessInvitations: {
          path: '/business-invitations',
          description: 'Invitation management and email handling'
        }
      },
      architecture: {
        pattern: 'Domain-Driven Design (DDD)',
        framework: 'NestJS',
        database: 'PostgreSQL',
        orm: 'TypeORM',
        documentation: 'Swagger/OpenAPI',
        admin: 'AdminJS',
        validation: 'class-validator',
        testing: 'Jest'
      },
      contact: {
        repository: 'https://github.com/your-org/business-entity-service',
        documentation: '/api/docs',
        support: 'support@your-company.com'
      }
    };
  }
}