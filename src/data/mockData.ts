import { User, Employee, Department, AuditLog, NotificationItem, SystemStats, MonthlyMetric, ApiEndpointDoc } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@enterprise.corp',
    firstName: 'Alexander',
    lastName: 'Wright',
    roles: ['ADMIN'],
    status: 'ACTIVE',
    createdAt: '2025-01-10 08:30:00',
    lastLogin: '2026-09-03 10:14:22',
  },
  {
    id: 2,
    username: 'manager_sarah',
    email: 'sarah.connor@enterprise.corp',
    firstName: 'Sarah',
    lastName: 'Connor',
    roles: ['MANAGER'],
    status: 'ACTIVE',
    createdAt: '2025-02-14 09:15:00',
    lastLogin: '2026-09-02 16:45:11',
  },
  {
    id: 3,
    username: 'emp_david',
    email: 'david.miller@enterprise.corp',
    firstName: 'David',
    lastName: 'Miller',
    roles: ['EMPLOYEE'],
    status: 'ACTIVE',
    createdAt: '2025-03-01 11:00:00',
    lastLogin: '2026-09-03 09:12:05',
  },
  {
    id: 4,
    username: 'user_emily',
    email: 'emily.watson@enterprise.corp',
    firstName: 'Emily',
    lastName: 'Watson',
    roles: ['USER'],
    status: 'ACTIVE',
    createdAt: '2025-04-18 14:20:00',
    lastLogin: '2026-08-31 17:30:00',
  },
  {
    id: 5,
    username: 'inactive_robert',
    email: 'robert.chen@enterprise.corp',
    firstName: 'Robert',
    lastName: 'Chen',
    roles: ['EMPLOYEE'],
    status: 'INACTIVE',
    createdAt: '2025-05-12 10:00:00',
    lastLogin: '2026-07-15 11:20:33',
  }
];

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: 1,
    departmentCode: 'ENG-01',
    name: 'Software Engineering',
    description: 'Core backend architectures, cloud systems, and distributed platforms',
    managerId: 1,
    managerName: 'Alexander Wright',
    status: 'ACTIVE',
    createdDate: '2024-01-15',
    employeeCount: 6,
    budget: 1250000
  },
  {
    id: 2,
    departmentCode: 'HR-02',
    name: 'Human Resources',
    description: 'Talent acquisition, employee success, compliance, and workplace culture',
    managerId: 2,
    managerName: 'Sarah Connor',
    status: 'ACTIVE',
    createdDate: '2024-01-15',
    employeeCount: 2,
    budget: 380000
  },
  {
    id: 3,
    departmentCode: 'FIN-03',
    name: 'Finance & Accounting',
    description: 'Corporate financial planning, tax governance, payroll, and fiscal reporting',
    managerId: 2,
    managerName: 'Sarah Connor',
    status: 'ACTIVE',
    createdDate: '2024-02-01',
    employeeCount: 2,
    budget: 620000
  },
  {
    id: 4,
    departmentCode: 'PRD-04',
    name: 'Product & Design',
    description: 'Product lifecycle strategy, UX architecture, and market discovery',
    managerId: 1,
    managerName: 'Alexander Wright',
    status: 'ACTIVE',
    createdDate: '2024-03-10',
    employeeCount: 2,
    budget: 450000
  },
  {
    id: 5,
    departmentCode: 'OPS-05',
    name: 'Cloud Infrastructure & DevOps',
    description: 'Kubernetes orchestration, CI/CD pipelines, site reliability and security',
    managerId: 1,
    managerName: 'Alexander Wright',
    status: 'ACTIVE',
    createdDate: '2024-04-05',
    employeeCount: 2,
    budget: 720000
  },
  {
    id: 6,
    departmentCode: 'MKT-06',
    name: 'Global Marketing',
    description: 'Brand positioning, enterprise communications, and strategic growth',
    managerId: 2,
    managerName: 'Sarah Connor',
    status: 'ACTIVE',
    createdDate: '2024-05-20',
    employeeCount: 1,
    budget: 310000
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 1,
    employeeId: 'EMP1001',
    firstName: 'Alexander',
    lastName: 'Wright',
    email: 'alexander.wright@enterprise.corp',
    phone: '+1 (555) 234-8901',
    address: '742 Evergreen Terrace, Seattle, WA',
    dateOfBirth: '1988-04-12',
    gender: 'MALE',
    departmentId: 1,
    departmentName: 'Software Engineering',
    designation: 'Principal Enterprise Architect',
    joiningDate: '2021-03-15',
    salary: 165000,
    status: 'ACTIVE',
    createdDate: '2021-03-15 09:00:00',
    updatedDate: '2026-08-10 14:22:00'
  },
  {
    id: 2,
    employeeId: 'EMP1002',
    firstName: 'Sarah',
    lastName: 'Connor',
    email: 'sarah.connor@enterprise.corp',
    phone: '+1 (555) 892-4411',
    address: '1088 Tech Boulevard, San Francisco, CA',
    dateOfBirth: '1990-09-24',
    gender: 'FEMALE',
    departmentId: 2,
    departmentName: 'Human Resources',
    designation: 'Director of People Operations',
    joiningDate: '2021-06-01',
    salary: 142000,
    status: 'ACTIVE',
    createdDate: '2021-06-01 09:30:00',
    updatedDate: '2026-07-18 10:15:00'
  },
  {
    id: 3,
    employeeId: 'EMP1003',
    firstName: 'David',
    lastName: 'Miller',
    email: 'david.miller@enterprise.corp',
    phone: '+1 (555) 431-7789',
    address: '325 Innovation Way, Austin, TX',
    dateOfBirth: '1993-11-05',
    gender: 'MALE',
    departmentId: 1,
    departmentName: 'Software Engineering',
    designation: 'Senior Backend Engineer (Java/Spring)',
    joiningDate: '2022-01-10',
    salary: 130000,
    status: 'ACTIVE',
    createdDate: '2022-01-10 09:00:00',
    updatedDate: '2026-06-25 11:40:00'
  },
  {
    id: 4,
    employeeId: 'EMP1004',
    firstName: 'Elena',
    lastName: 'Rostova',
    email: 'elena.rostova@enterprise.corp',
    phone: '+1 (555) 672-9902',
    address: '450 Pinecrest Avenue, Boston, MA',
    dateOfBirth: '1992-03-18',
    gender: 'FEMALE',
    departmentId: 3,
    departmentName: 'Finance & Accounting',
    designation: 'Senior Financial Controller',
    joiningDate: '2022-04-15',
    salary: 125000,
    status: 'ACTIVE',
    createdDate: '2022-04-15 08:30:00',
    updatedDate: '2026-05-19 16:10:00'
  },
  {
    id: 5,
    employeeId: 'EMP1005',
    firstName: 'Marcus',
    lastName: 'Vance',
    email: 'marcus.vance@enterprise.corp',
    phone: '+1 (555) 345-6677',
    address: '88 Cybernetic Loop, New York, NY',
    dateOfBirth: '1995-07-22',
    gender: 'MALE',
    departmentId: 5,
    departmentName: 'Cloud Infrastructure & DevOps',
    designation: 'DevOps & Kubernetes Specialist',
    joiningDate: '2022-08-01',
    salary: 138000,
    status: 'ACTIVE',
    createdDate: '2022-08-01 09:00:00',
    updatedDate: '2026-08-14 15:30:00'
  },
  {
    id: 6,
    employeeId: 'EMP1006',
    firstName: 'Aaliyah',
    lastName: 'Khan',
    email: 'aaliyah.khan@enterprise.corp',
    phone: '+1 (555) 789-2234',
    address: '1400 Oakridge Parkway, Chicago, IL',
    dateOfBirth: '1994-01-30',
    gender: 'FEMALE',
    departmentId: 4,
    departmentName: 'Product & Design',
    designation: 'Staff Product Designer',
    joiningDate: '2023-02-15',
    salary: 128000,
    status: 'ACTIVE',
    createdDate: '2023-02-15 09:00:00',
    updatedDate: '2026-07-22 13:45:00'
  },
  {
    id: 7,
    employeeId: 'EMP1007',
    firstName: 'Lucas',
    lastName: 'Santoro',
    email: 'lucas.santoro@enterprise.corp',
    phone: '+1 (555) 901-5522',
    address: '52 Ocean View Drive, Miami, FL',
    dateOfBirth: '1996-05-14',
    gender: 'MALE',
    departmentId: 1,
    departmentName: 'Software Engineering',
    designation: 'Full-Stack Software Developer',
    joiningDate: '2023-07-10',
    salary: 110000,
    status: 'ACTIVE',
    createdDate: '2023-07-10 09:00:00',
    updatedDate: '2026-08-01 10:00:00'
  },
  {
    id: 8,
    employeeId: 'EMP1008',
    firstName: 'Jessica',
    lastName: 'Taylor',
    email: 'jessica.taylor@enterprise.corp',
    phone: '+1 (555) 881-3344',
    address: '200 Heritage Road, Denver, CO',
    dateOfBirth: '1991-12-08',
    gender: 'FEMALE',
    departmentId: 6,
    departmentName: 'Global Marketing',
    designation: 'Enterprise Marketing Lead',
    joiningDate: '2023-09-01',
    salary: 118000,
    status: 'ACTIVE',
    createdDate: '2023-09-01 09:00:00',
    updatedDate: '2026-08-20 17:00:00'
  },
  {
    id: 9,
    employeeId: 'EMP1009',
    firstName: 'Kenji',
    lastName: 'Takahashi',
    email: 'kenji.takahashi@enterprise.corp',
    phone: '+1 (555) 612-4455',
    address: '900 Pacific Crest Way, Portland, OR',
    dateOfBirth: '1993-08-19',
    gender: 'MALE',
    departmentId: 1,
    departmentName: 'Software Engineering',
    designation: 'Distributed Systems Engineer',
    joiningDate: '2024-01-08',
    salary: 135000,
    status: 'ACTIVE',
    createdDate: '2024-01-08 09:00:00',
    updatedDate: '2026-08-12 11:20:00'
  },
  {
    id: 10,
    employeeId: 'EMP1010',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@enterprise.corp',
    phone: '+1 (555) 234-9988',
    address: '610 Lakeview Terrace, Dallas, TX',
    dateOfBirth: '1997-02-11',
    gender: 'FEMALE',
    departmentId: 2,
    departmentName: 'Human Resources',
    designation: 'Technical Recruiter & HR Business Partner',
    joiningDate: '2024-03-01',
    salary: 95000,
    status: 'ACTIVE',
    createdDate: '2024-03-01 09:00:00',
    updatedDate: '2026-07-05 14:00:00'
  },
  {
    id: 11,
    employeeId: 'EMP1011',
    firstName: 'Robert',
    lastName: 'Chen',
    email: 'robert.chen@enterprise.corp',
    phone: '+1 (555) 771-4400',
    address: '414 Silicon Valley Expressway, San Jose, CA',
    dateOfBirth: '1990-10-15',
    gender: 'MALE',
    departmentId: 1,
    departmentName: 'Software Engineering',
    designation: 'Database Administrator & Data Architect',
    joiningDate: '2024-04-15',
    salary: 140000,
    status: 'ON_LEAVE',
    createdDate: '2024-04-15 09:00:00',
    updatedDate: '2026-08-28 09:30:00'
  },
  {
    id: 12,
    employeeId: 'EMP1012',
    firstName: 'Thomas',
    lastName: 'Hansen',
    email: 'thomas.hansen@enterprise.corp',
    phone: '+1 (555) 332-9011',
    address: '17 Alpine Summit Drive, Salt Lake City, UT',
    dateOfBirth: '1989-06-28',
    gender: 'MALE',
    departmentId: 3,
    departmentName: 'Finance & Accounting',
    designation: 'Staff Payroll Specialist',
    joiningDate: '2024-06-01',
    salary: 92000,
    status: 'ACTIVE',
    createdDate: '2024-06-01 09:00:00',
    updatedDate: '2026-08-15 16:30:00'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 101,
    user: 'admin',
    role: 'ADMIN',
    action: 'CREATE',
    entity: 'EMPLOYEE',
    entityId: 'EMP1012',
    timestamp: '2026-09-03 09:45:12',
    ipAddress: '192.168.1.45',
    description: 'ADMIN created employee Thomas Hansen (EMP1012)',
    status: 'SUCCESS'
  },
  {
    id: 102,
    user: 'admin',
    role: 'ADMIN',
    action: 'UPDATE',
    entity: 'DEPARTMENT',
    entityId: 'ENG-01',
    timestamp: '2026-09-03 08:30:00',
    ipAddress: '192.168.1.45',
    description: 'ADMIN updated budget for Software Engineering to $1,250,000',
    status: 'SUCCESS'
  },
  {
    id: 103,
    user: 'manager_sarah',
    role: 'MANAGER',
    action: 'UPDATE',
    entity: 'EMPLOYEE',
    entityId: 'EMP1011',
    timestamp: '2026-09-02 16:40:22',
    ipAddress: '192.168.1.108',
    description: 'MANAGER updated status of Robert Chen to ON_LEAVE',
    status: 'SUCCESS'
  },
  {
    id: 104,
    user: 'admin',
    role: 'ADMIN',
    action: 'PASSWORD_RESET',
    entity: 'USER',
    entityId: 'user_emily',
    timestamp: '2026-09-02 14:15:30',
    ipAddress: '192.168.1.45',
    description: 'ADMIN triggered temporary credential reset for Emily Watson',
    status: 'SUCCESS'
  },
  {
    id: 105,
    user: 'manager_sarah',
    role: 'MANAGER',
    action: 'LOGIN',
    entity: 'AUTH',
    entityId: 'manager_sarah',
    timestamp: '2026-09-02 14:02:11',
    ipAddress: '192.168.1.108',
    description: 'User authenticated successfully via JWT token issuance',
    status: 'SUCCESS'
  },
  {
    id: 106,
    user: 'admin',
    role: 'ADMIN',
    action: 'CREATE',
    entity: 'DEPARTMENT',
    entityId: 'MKT-06',
    timestamp: '2026-09-01 11:20:15',
    ipAddress: '192.168.1.45',
    description: 'ADMIN initialized department Global Marketing (MKT-06)',
    status: 'SUCCESS'
  },
  {
    id: 107,
    user: 'emp_david',
    role: 'EMPLOYEE',
    action: 'UPDATE',
    entity: 'EMPLOYEE',
    entityId: 'EMP1003',
    timestamp: '2026-09-01 09:30:19',
    ipAddress: '192.168.1.72',
    description: 'David Miller updated personal contact phone and emergency address',
    status: 'SUCCESS'
  },
  {
    id: 108,
    user: 'security_monitor',
    role: 'ADMIN',
    action: 'LOGIN',
    entity: 'AUTH',
    entityId: 'unknown_ip',
    timestamp: '2026-08-31 23:14:05',
    ipAddress: '203.0.113.88',
    description: 'Failed login attempt with bad credentials for username: root',
    status: 'FAILURE'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    title: 'Spring Boot 3.3.4 Security Patch Applied',
    message: 'All JWT signing algorithms updated to HS512 with enhanced key rotation.',
    type: 'SUCCESS',
    isRead: false,
    timestamp: '2026-09-03 09:00:00',
    recipientRole: 'ALL'
  },
  {
    id: 2,
    title: 'New Employee Onboarding: Thomas Hansen',
    message: 'Thomas Hansen joined the Finance & Accounting department as Payroll Specialist.',
    type: 'INFO',
    isRead: false,
    timestamp: '2026-09-03 08:45:00',
    recipientRole: 'ADMIN'
  },
  {
    id: 3,
    title: 'Q3 Financial Audit Completed',
    message: 'Automated reconciliation passed with 100% data integrity on MySQL 8 engine.',
    type: 'INFO',
    isRead: true,
    timestamp: '2026-09-02 17:30:00',
    recipientRole: 'MANAGER'
  },
  {
    id: 4,
    title: 'Database Backup Completed',
    message: 'Scheduled automated mysqldump backup saved to storage snapshot (52.4 MB).',
    type: 'SUCCESS',
    isRead: true,
    timestamp: '2026-09-02 02:00:00',
    recipientRole: 'ADMIN'
  },
  {
    id: 5,
    title: 'System Notice: Employee Status Change',
    message: 'Robert Chen (EMP1011) requested temporary medical leave approved by HR.',
    type: 'WARNING',
    isRead: true,
    timestamp: '2026-09-01 15:10:00',
    recipientRole: 'MANAGER'
  }
];

export const SYSTEM_STATS: SystemStats = {
  totalUsers: 5,
  activeUsers: 4,
  totalEmployees: 12,
  activeEmployees: 11,
  totalDepartments: 6,
  totalMonthlyPayroll: 124800,
  transactionsThisMonth: 1482,
  systemHealth: 'HEALTHY (99.98% SLA)',
  dbStatus: 'CONNECTED (MySQL 8.0.36 InnoDB)',
  springBootVersion: '3.3.4 (Java 21 LTS)',
  javaVersion: 'Eclipse Temurin 21.0.3+9'
};

export const MONTHLY_METRICS: MonthlyMetric[] = [
  { month: 'Apr', employees: 8, payroll: 86000, transactions: 1120 },
  { month: 'May', employees: 9, payroll: 94000, transactions: 1240 },
  { month: 'Jun', employees: 10, payroll: 104000, transactions: 1310 },
  { month: 'Jul', employees: 11, payroll: 115000, transactions: 1380 },
  { month: 'Aug', employees: 11, payroll: 115000, transactions: 1420 },
  { month: 'Sep', employees: 12, payroll: 124800, transactions: 1482 }
];

export const API_ENDPOINTS: ApiEndpointDoc[] = [
  {
    id: 'auth-login',
    method: 'POST',
    path: '/api/auth/login',
    summary: 'Authenticate User & Issue JWT Bearer Token',
    description: 'Validates username and BCrypt-hashed password. Returns signed JWT token with user claims and assigned roles.',
    requiredRole: ['ADMIN', 'MANAGER', 'EMPLOYEE', 'USER'],
    requestBodySample: {
      username: 'admin',
      password: 'Password@123'
    },
    responseSample: {
      status: 200,
      body: {
        success: true,
        message: 'User authenticated successfully',
        data: {
          token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNzg4NTI4MDAwLCJleHAiOjE3ODg2MTQ0MDB9...',
          type: 'Bearer',
          id: 1,
          username: 'admin',
          email: 'admin@enterprise.corp',
          roles: ['ROLE_ADMIN']
        }
      }
    }
  },
  {
    id: 'auth-register',
    method: 'POST',
    path: '/api/auth/register',
    summary: 'Register New User Account',
    description: 'Creates a new user record with encrypted password and assigns designated roles.',
    requiredRole: ['ADMIN'],
    requestBodySample: {
      username: 'johndoe',
      email: 'john.doe@enterprise.corp',
      password: 'SecurePassword123!',
      firstName: 'John',
      lastName: 'Doe',
      roles: ['EMPLOYEE']
    },
    responseSample: {
      status: 201,
      body: {
        success: true,
        message: 'User registered successfully with ID: 6',
        timestamp: '2026-09-03T10:15:00'
      }
    }
  },
  {
    id: 'users-get-all',
    method: 'GET',
    path: '/api/users',
    summary: 'Retrieve Paginated List of Users',
    description: 'Fetches user accounts with search keywords, status filtering, and sorting parameters.',
    requiredRole: ['ADMIN'],
    queryParams: [
      { name: 'page', type: 'integer', required: false, description: 'Zero-based page index (default: 0)' },
      { name: 'size', type: 'integer', required: false, description: 'Page size (default: 10)' },
      { name: 'sort', type: 'string', required: false, description: 'Sort criteria (e.g. username,asc)' }
    ],
    responseSample: {
      status: 200,
      body: {
        content: INITIAL_USERS,
        pageNumber: 0,
        pageSize: 10,
        totalElements: 5,
        totalPages: 1,
        last: true
      }
    }
  },
  {
    id: 'emp-get-all',
    method: 'GET',
    path: '/api/employees',
    summary: 'Get All Employees with Filtering and Pagination',
    description: 'Returns list of employee profiles filtered by department ID, status, or search query.',
    requiredRole: ['ADMIN', 'MANAGER'],
    queryParams: [
      { name: 'departmentId', type: 'integer', required: false, description: 'Filter by department ID' },
      { name: 'status', type: 'string', required: false, description: 'ACTIVE, INACTIVE, ON_LEAVE' },
      { name: 'page', type: 'integer', required: false, description: 'Page number' }
    ],
    responseSample: {
      status: 200,
      body: {
        content: INITIAL_EMPLOYEES.slice(0, 5),
        pageNumber: 0,
        pageSize: 5,
        totalElements: 12,
        totalPages: 3,
        last: false
      }
    }
  },
  {
    id: 'emp-create',
    method: 'POST',
    path: '/api/employees',
    summary: 'Create New Employee Record',
    description: 'Saves a new employee entity with validated fields and updates audit logs.',
    requiredRole: ['ADMIN', 'MANAGER'],
    requestBodySample: {
      firstName: 'Samantha',
      lastName: 'Brooks',
      email: 'samantha.brooks@enterprise.corp',
      phone: '+1 (555) 998-1122',
      address: '100 Silicon Blvd, Austin, TX',
      dateOfBirth: '1995-05-12',
      gender: 'FEMALE',
      departmentId: 1,
      designation: 'Cloud Solutions Architect',
      joiningDate: '2026-09-01',
      salary: 132000,
      status: 'ACTIVE'
    },
    responseSample: {
      status: 201,
      body: {
        success: true,
        message: 'Employee created successfully with generated ID: EMP1013',
        employeeId: 'EMP1013'
      }
    }
  },
  {
    id: 'dept-get-all',
    method: 'GET',
    path: '/api/departments',
    summary: 'List All Enterprise Departments',
    description: 'Retrieves all departments along with assigned manager names and employee counts.',
    requiredRole: ['ADMIN', 'MANAGER', 'EMPLOYEE', 'USER'],
    responseSample: {
      status: 200,
      body: INITIAL_DEPARTMENTS
    }
  },
  {
    id: 'dept-create',
    method: 'POST',
    path: '/api/departments',
    summary: 'Create Department',
    description: 'Registers a new enterprise department division with dedicated budget.',
    requiredRole: ['ADMIN'],
    requestBodySample: {
      departmentCode: 'SEC-07',
      name: 'Cybersecurity Operations',
      description: 'Zero-trust architecture, penetration testing, and IAM controls',
      managerId: 1,
      budget: 850000
    },
    responseSample: {
      status: 201,
      body: {
        success: true,
        message: 'Department created successfully',
        id: 7
      }
    }
  },
  {
    id: 'audit-get',
    method: 'GET',
    path: '/api/audit-logs',
    summary: 'Query System Audit Trail',
    description: 'Secured endpoint returning immutable event logs for compliance and accountability.',
    requiredRole: ['ADMIN'],
    responseSample: {
      status: 200,
      body: {
        totalLogs: 8,
        logs: INITIAL_AUDIT_LOGS
      }
    }
  },
  {
    id: 'reports-export',
    method: 'GET',
    path: '/api/reports/employees/export',
    summary: 'Export Formatted Employee Report',
    description: 'Streams binary document (PDF, Excel .xlsx, or CSV) based on requested format query parameter.',
    requiredRole: ['ADMIN', 'MANAGER'],
    queryParams: [
      { name: 'format', type: 'string', required: true, description: 'pdf, excel, csv' }
    ],
    responseSample: {
      status: 200,
      body: {
        reportType: 'EMPLOYEE_DIRECTORY',
        generatedAt: '2026-09-03T10:18:00',
        recordCount: 12,
        format: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    }
  }
];

// Alias exports for convenience across modules
export const MOCK_USERS = INITIAL_USERS;
export const MOCK_EMPLOYEES = INITIAL_EMPLOYEES;
export const MOCK_DEPARTMENTS = INITIAL_DEPARTMENTS;
export const MOCK_AUDIT_LOGS = INITIAL_AUDIT_LOGS;
export const MOCK_NOTIFICATIONS = INITIAL_NOTIFICATIONS;
export const MOCK_MONTHLY_METRICS = MONTHLY_METRICS;
export const MOCK_API_ENDPOINTS = API_ENDPOINTS;

export const MOCK_JWT_TOKENS: Record<string, string> = {
  ADMIN: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNzg4NTI4MDAwLCJleHAiOjE3ODg2MTQ0MDB9.hU9d8f7s6d5f4g3h2j1k_SAMPLE_ADMIN_JWT_SIGNATURE_SPRING_BOOT_3',
  MANAGER: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYW5hZ2VyX3NhcmFoIiwicm9sZXMiOlsicm9sZV9NQU5BR0VSIl0sImlhdCI6MTc4ODUyODAwMCwiZXhwIjoxNzg4NjE0NDAwfQ.j2k3l4m5n6o7p8q9r0_SAMPLE_MANAGER_JWT_SIGNATURE',
  EMPLOYEE: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbXBfZGF2aWQiLCJyb2xlcyI6WyJST0xFX0VNUExPWUVFIl0sImlhdCI6MTc4ODUyODAwMCwiZXhwIjoxNzg4NjE0NDAwfQ.a1b2c3d4e5f6g7h8i9_SAMPLE_EMPLOYEE_JWT_SIGNATURE',
  USER: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyX2VtaWx5Iiwicm9sZXMiOlsicm9sZV9VU0VSIl0sImlhdCI6MTc4ODUyODAwMCwiZXhwIjoxNzg4NjE0NDAwfQ.z9y8x7w6v5u4t3s2r1_SAMPLE_USER_JWT_SIGNATURE'
};
