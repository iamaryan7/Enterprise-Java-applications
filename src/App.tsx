import React, { useState, useEffect } from 'react';
import { 
  User, 
  Role, 
  Employee, 
  Department, 
  AuditLog, 
  NotificationItem, 
  ToastMessage,
  SystemStats
} from './types';
import { 
  MOCK_USERS, 
  MOCK_EMPLOYEES, 
  MOCK_DEPARTMENTS, 
  MOCK_AUDIT_LOGS, 
  MOCK_NOTIFICATIONS, 
  MOCK_MONTHLY_METRICS,
  MOCK_JWT_TOKENS 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Toast } from './components/Toast';
import { DashboardView } from './components/DashboardView';
import { UsersView } from './components/UsersView';
import { EmployeesView } from './components/EmployeesView';
import { DepartmentsView } from './components/DepartmentsView';
import { ReportsView } from './components/ReportsView';
import { AuditLogsView } from './components/AuditLogsView';
import { NotificationsView } from './components/NotificationsView';
import { SwaggerDocsView } from './components/SwaggerDocsView';
import { SourceCodeView } from './components/SourceCodeView';
import { ArchitectureView } from './components/ArchitectureView';

export default function App() {
  // Navigation
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Authentication & Role
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]); // Default to ADMIN
  const [jwtToken, setJwtToken] = useState<string>(MOCK_JWT_TOKENS['ADMIN']);

  // Core Data Stores (Simulating JPA / MySQL Database State)
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [departments, setDepartments] = useState<Department[]>(MOCK_DEPARTMENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  // Quick action state
  const [isQuickAddEmployeeOpen, setIsQuickAddEmployeeOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, message?: string) => {
    const id = Date.now().toString() + Math.random().toString().substring(2, 5);
    setToasts(prev => [...prev, { id, type, title, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Helper to record an immutable JPA Audit Log
  const recordAudit = (action: string, entity: string, entityId: string, description: string) => {
    const newLog: AuditLog = {
      id: auditLogs.length + 1,
      user: currentUser.username,
      role: currentUser.roles[0],
      action,
      entity,
      entityId,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ipAddress: '192.168.1.105',
      description,
      status: 'SUCCESS'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Switch Active User / Role
  const handleRoleChange = (newRole: Role) => {
    const matchedUser = users.find(u => u.roles.includes(newRole)) || users[0];
    setCurrentUser({ ...matchedUser, roles: [newRole] });
    setJwtToken(MOCK_JWT_TOKENS[newRole]);
    recordAudit('LOGIN', 'AUTH', currentUser.username, `Principal switched authority to ROLE_${newRole}`);
    addToast('info', 'Security Principal Switched', `Authenticated as @${matchedUser.username} with ROLE_${newRole}`);
  };

  // System Stats calculation
  const totalPayroll = employees.reduce((acc, curr) => acc + curr.salary, 0) / 12;
  const systemStats: SystemStats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(e => e.status === 'ACTIVE').length,
    totalDepartments: departments.length,
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'ACTIVE').length,
    totalMonthlyPayroll: Math.round(totalPayroll),
    transactionsThisMonth: 1482 + auditLogs.length,
    systemHealth: 'HEALTHY (99.98% SLA)',
    dbStatus: 'CONNECTED (MySQL 8.0.36 InnoDB)',
    springBootVersion: '3.3.4 (Java 21 LTS)',
    javaVersion: 'Eclipse Temurin 21.0.3+9'
  };

  // Employee Operations
  const handleAddEmployee = (empData: Omit<Employee, 'id' | 'createdDate' | 'updatedDate'>) => {
    const newId = Math.max(...employees.map(e => e.id), 0) + 1;
    const now = new Date().toISOString().split('T')[0];
    const newEmp: Employee = {
      ...empData,
      id: newId,
      createdDate: now,
      updatedDate: now
    };
    setEmployees(prev => [newEmp, ...prev]);
    recordAudit('CREATE', 'EMPLOYEE', newEmp.employeeId, `${currentUser.username} added employee ${newEmp.firstName} ${newEmp.lastName} (${newEmp.employeeId})`);
    
    // Add internal notification
    const newNotif: NotificationItem = {
      id: Date.now(),
      title: 'New Employee Onboarded',
      message: `${newEmp.firstName} ${newEmp.lastName} has joined as ${newEmp.designation} in ${newEmp.departmentName}.`,
      type: 'SUCCESS',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    addToast('success', 'Employee Created', `Assigned ${newEmp.employeeId} in ${newEmp.departmentName}`);
  };

  const handleUpdateEmployee = (id: number, updates: Partial<Employee>) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...updates, updatedDate: new Date().toISOString().split('T')[0] } : e));
    const emp = employees.find(e => e.id === id);
    if (emp) {
      recordAudit('UPDATE', 'EMPLOYEE', emp.employeeId, `${currentUser.username} updated record for ${emp.firstName} ${emp.lastName}`);
    }
    addToast('success', 'Employee Updated', 'Record saved to database');
  };

  const handleDeleteEmployee = (id: number) => {
    const emp = employees.find(e => e.id === id);
    if (!emp) return;
    setEmployees(prev => prev.filter(e => e.id !== id));
    recordAudit('DELETE', 'EMPLOYEE', emp.employeeId, `${currentUser.username} deleted employee ${emp.firstName} ${emp.lastName}`);
    addToast('warning', 'Employee Deleted', `Removed ${emp.employeeId} from registry`);
  };

  // Department Operations
  const handleAddDepartment = (deptData: Omit<Department, 'id' | 'createdDate' | 'employeeCount'>) => {
    const newId = Math.max(...departments.map(d => d.id), 0) + 1;
    const newDept: Department = {
      ...deptData,
      id: newId,
      createdDate: new Date().toISOString().split('T')[0],
      employeeCount: 0
    };
    setDepartments(prev => [...prev, newDept]);
    recordAudit('CREATE', 'DEPARTMENT', newDept.departmentCode, `${currentUser.username} created department ${newDept.name} (${newDept.departmentCode})`);
    addToast('success', 'Department Created', `Added ${newDept.name} with code ${newDept.departmentCode}`);
  };

  const handleUpdateDepartment = (id: number, updates: Partial<Department>) => {
    setDepartments(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
    const dept = departments.find(d => d.id === id);
    if (dept) {
      recordAudit('UPDATE', 'DEPARTMENT', dept.departmentCode, `${currentUser.username} modified division ${dept.name}`);
    }
    addToast('success', 'Department Updated', 'Changes saved successfully');
  };

  const handleDeleteDepartment = (id: number) => {
    const dept = departments.find(d => d.id === id);
    if (!dept) return;
    const hasAssignedEmployees = employees.some(e => e.departmentId === id);
    if (hasAssignedEmployees) {
      addToast('error', 'Integrity Constraint Error', `Cannot delete ${dept.name}: active employees are assigned. Reassign personnel first.`);
      recordAudit('DELETE_FAIL', 'DEPARTMENT', dept.departmentCode, `Constraint violation: department ${dept.name} has active employees`);
      return;
    }
    setDepartments(prev => prev.filter(d => d.id !== id));
    recordAudit('DELETE', 'DEPARTMENT', dept.departmentCode, `${currentUser.username} deleted department ${dept.name}`);
    addToast('warning', 'Department Deleted', `Removed ${dept.name}`);
  };

  // User Operations
  const handleAddUser = (userData: { username: string; email: string; firstName: string; lastName: string; role: Role; password?: string }) => {
    const newId = Math.max(...users.map(u => u.id), 0) + 1;
    const newUser: User = {
      id: newId,
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      roles: [userData.role],
      status: 'ACTIVE',
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: 'Never'
    };
    setUsers(prev => [...prev, newUser]);
    recordAudit('CREATE', 'USER', newUser.username, `${currentUser.username} created user @${newUser.username} with authority [ROLE_${userData.role}]`);
    addToast('success', 'User Account Provisioned', `@${newUser.username} created with role ${userData.role}`);
  };

  const handleUpdateUser = (id: number, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    const user = users.find(u => u.id === id);
    if (user) {
      recordAudit('UPDATE', 'USER', user.username, `${currentUser.username} updated profile for @${user.username}`);
    }
    addToast('success', 'User Updated', 'Security attributes updated');
  };

  const handleDeleteUser = (id: number) => {
    const user = users.find(u => u.id === id);
    if (!user) return;
    if (user.id === currentUser.id) {
      addToast('error', 'Action Forbidden', 'You cannot delete your own active principal session.');
      return;
    }
    setUsers(prev => prev.filter(u => u.id !== id));
    recordAudit('DELETE', 'USER', user.username, `${currentUser.username} deleted user @${user.username}`);
    addToast('warning', 'User Account Deleted', `Removed @${user.username}`);
  };

  const handleToggleUserStatus = (id: number) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        recordAudit('UPDATE', 'USER', u.username, `${currentUser.username} toggled status of @${u.username} to ${nextStatus}`);
        addToast('info', 'Status Updated', `@${u.username} is now ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleResetPassword = (id: number, username: string) => {
    recordAudit('PASSWORD_RESET', 'USER', username, `${currentUser.username} generated password reset ticket for @${username}`);
    addToast('info', 'Password Reset Initiated', `Temporary credentials assigned to @${username}`);
  };

  // Notification Operations
  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    addToast('info', 'All Notifications Read');
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleCreateNotification = (notifData: Omit<NotificationItem, 'id' | 'isRead' | 'timestamp'>) => {
    const newNotif: NotificationItem = {
      ...notifData,
      id: Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    recordAudit('CREATE', 'NOTIFICATION', newNotif.title, `${currentUser.username} broadcasted notice "${newNotif.title}"`);
    addToast('success', 'Announcement Dispatched', `Broadcasted to ${notifData.recipientRole || 'all'}`);
  };

  return (
    <div className="h-screen w-screen bg-[#F1F5F9] text-[#1E293B] flex overflow-hidden font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Overlay */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Left Sidebar */}
      <Sidebar
        currentView={currentView}
        currentUser={currentUser}
        userRole={currentUser.roles[0]}
        onNavigate={(view) => {
          setCurrentView(view);
          setIsMobileSidebarOpen(false);
        }}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Top Navbar */}
        <Navbar
          currentUser={currentUser}
          userRole={currentUser.roles[0]}
          unreadNotificationsCount={notifications.filter(n => !n.isRead).length}
          notifications={notifications}
          currentView={currentView}
          onRoleChange={handleRoleChange}
          onNavigate={setCurrentView}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 w-full max-w-7xl mx-auto">
          {currentView === 'dashboard' && (
            <DashboardView
              stats={systemStats}
              monthlyMetrics={MOCK_MONTHLY_METRICS}
              recentAudits={auditLogs}
              notifications={notifications}
              employees={employees}
              departments={departments}
              userRole={currentUser.roles[0]}
              onNavigate={setCurrentView}
              onQuickAddEmployee={() => {
                setCurrentView('employees');
                setIsQuickAddEmployeeOpen(true);
              }}
            />
          )}

          {currentView === 'users' && (
            <UsersView
              users={users}
              onAddUser={handleAddUser}
              onUpdateUser={handleUpdateUser}
              onDeleteUser={handleDeleteUser}
              onToggleUserStatus={handleToggleUserStatus}
              onResetPassword={handleResetPassword}
            />
          )}

          {currentView === 'employees' && (
            <EmployeesView
              employees={employees}
              departments={departments}
              userRole={currentUser.roles[0]}
              onAddEmployee={handleAddEmployee}
              onUpdateEmployee={handleUpdateEmployee}
              onDeleteEmployee={handleDeleteEmployee}
              isQuickAddTriggered={isQuickAddEmployeeOpen}
              onCloseQuickAdd={() => setIsQuickAddEmployeeOpen(false)}
            />
          )}

          {currentView === 'departments' && (
            <DepartmentsView
              departments={departments}
              employees={employees}
              userRole={currentUser.roles[0]}
              onAddDepartment={handleAddDepartment}
              onUpdateDepartment={handleUpdateDepartment}
              onDeleteDepartment={handleDeleteDepartment}
            />
          )}

          {currentView === 'reports' && (
            <ReportsView
              employees={employees}
              departments={departments}
              users={users}
              auditLogs={auditLogs}
              onTriggerToast={addToast}
            />
          )}

          {currentView === 'audit' && (
            <AuditLogsView auditLogs={auditLogs} />
          )}

          {currentView === 'notifications' && (
            <NotificationsView
              notifications={notifications}
              userRole={currentUser.roles[0]}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onDeleteNotification={handleDeleteNotification}
              onCreateNotification={handleCreateNotification}
            />
          )}

          {currentView === 'swagger' && (
            <SwaggerDocsView
              currentJwtToken={jwtToken}
              userRole={currentUser.roles[0]}
              onTriggerToast={addToast}
            />
          )}

          {currentView === 'code' && (
            <SourceCodeView onTriggerToast={addToast} />
          )}

          {currentView === 'architecture' && (
            <ArchitectureView />
          )}
        </main>
      </div>
    </div>
  );
}
