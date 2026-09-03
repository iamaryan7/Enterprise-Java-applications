export type Role = 'ADMIN' | 'MANAGER' | 'EMPLOYEE' | 'USER';

export type EmployeeStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE' | 'TERMINATED';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'LOCKED';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  status: UserStatus;
  createdAt: string;
  lastLogin: string;
}

export interface Employee {
  id: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: Gender;
  departmentId: number;
  departmentName: string;
  designation: string;
  joiningDate: string;
  salary: number;
  status: EmployeeStatus;
  createdDate: string;
  updatedDate: string;
  avatarUrl?: string;
}

export interface Department {
  id: number;
  departmentCode: string;
  name: string;
  description: string;
  managerId: number;
  managerName: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdDate: string;
  employeeCount: number;
  budget: number;
}

export interface AuditLog {
  id: number;
  user: string;
  role: Role;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'PASSWORD_RESET' | 'STATUS_CHANGE' | string;
  entity: 'EMPLOYEE' | 'DEPARTMENT' | 'USER' | 'AUTH' | 'REPORT' | 'SYSTEM' | string;
  entityId: string;
  timestamp: string;
  ipAddress: string;
  description: string;
  status: 'SUCCESS' | 'FAILURE' | 'WARNING';
}

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  isRead: boolean;
  timestamp: string;
  recipientRole?: Role | 'ALL';
}

export interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalEmployees: number;
  activeEmployees: number;
  totalDepartments: number;
  totalMonthlyPayroll: number;
  transactionsThisMonth: number;
  systemHealth: string;
  dbStatus: string;
  springBootVersion: string;
  javaVersion: string;
}

export interface MonthlyMetric {
  month: string;
  employees: number;
  payroll: number;
  transactions: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message?: string;
}

export interface JavaCodeFile {
  id?: string;
  filename?: string;
  path: string;
  name: string;
  packagePath?: string;
  category: string;
  language: string;
  description: string;
  content: string;
}

export type JavaSourceFile = JavaCodeFile;

export interface ApiEndpointDoc {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  summary: string;
  description: string;
  tag?: string;
  requiresAuth?: boolean;
  requiredRole?: Role[];
  roles?: Role[];
  queryParams?: { name: string; type: string; required: boolean; description: string }[];
  requestBodySample?: object | string;
  requestSample?: string;
  responseSample: {
    status?: number;
    body?: object;
  } | string;
}

export type ApiEndpoint = ApiEndpointDoc;
