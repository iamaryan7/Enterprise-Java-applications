import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Building2, 
  FileText, 
  ShieldAlert, 
  Bell, 
  Terminal, 
  Code2, 
  Layers,
  Lock
} from 'lucide-react';
import { Role, User } from '../types';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  userRole: Role;
  currentUser?: User;
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  userRole,
  currentUser,
  isOpen = false,
  onClose = () => {},
}) => {
  const sections = [
    {
      heading: 'Core',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: LayoutDashboard,
          allowedRoles: ['ADMIN', 'MANAGER', 'EMPLOYEE', 'USER'] as Role[],
        },
        {
          id: 'employees',
          label: 'Employees',
          icon: UserCheck,
          allowedRoles: ['ADMIN', 'MANAGER', 'EMPLOYEE'] as Role[],
        },
        {
          id: 'departments',
          label: 'Departments',
          icon: Building2,
          allowedRoles: ['ADMIN', 'MANAGER', 'EMPLOYEE', 'USER'] as Role[],
        },
        {
          id: 'users',
          label: 'User Access (RBAC)',
          icon: Users,
          allowedRoles: ['ADMIN'] as Role[],
        },
      ]
    },
    {
      heading: 'Operations',
      items: [
        {
          id: 'reports',
          label: 'Reports & Export',
          icon: FileText,
          allowedRoles: ['ADMIN', 'MANAGER'] as Role[],
        },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: Bell,
          allowedRoles: ['ADMIN', 'MANAGER', 'EMPLOYEE', 'USER'] as Role[],
        },
      ]
    },
    {
      heading: 'System',
      items: [
        {
          id: 'audit',
          label: 'Audit Logs',
          icon: ShieldAlert,
          allowedRoles: ['ADMIN'] as Role[],
        },
        {
          id: 'swagger',
          label: 'Swagger / OpenAPI',
          icon: Terminal,
          allowedRoles: ['ADMIN', 'MANAGER', 'EMPLOYEE', 'USER'] as Role[],
        },
        {
          id: 'code',
          label: 'Java 21 Source',
          icon: Code2,
          allowedRoles: ['ADMIN', 'MANAGER', 'EMPLOYEE', 'USER'] as Role[],
        },
        {
          id: 'architecture',
          label: 'Architecture Matrix',
          icon: Layers,
          allowedRoles: ['ADMIN', 'MANAGER', 'EMPLOYEE', 'USER'] as Role[],
        }
      ]
    }
  ];

  const userInitials = currentUser 
    ? `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`.toUpperCase()
    : 'AD';

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 z-40 h-screen w-60 shrink-0 bg-[#0F172A] flex flex-col transition-transform duration-200 ease-in-out border-r border-slate-800/80 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand header */}
        <div className="p-6 flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold text-white shadow-sm">
            E
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-tight text-lg leading-tight">EnterpriseApp</span>
            <span className="text-[10px] text-slate-400 font-mono">Spring Boot 3.3.4</span>
          </div>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 px-4 space-y-4 overflow-y-auto mt-1 scrollbar-thin">
          {sections.map((section, idx) => (
            <div key={section.heading}>
              <div className={`text-slate-500 text-[10px] uppercase font-bold tracking-widest px-2 mb-1.5 ${idx > 0 ? 'mt-4' : ''}`}>
                {section.heading}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isAllowed = item.allowedRoles.includes(userRole);
                  const isActive = currentView === item.id;
                  const Icon = item.icon;

                  if (!isAllowed) {
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between px-3 py-2 text-slate-600 text-sm font-medium cursor-not-allowed select-none rounded"
                        title={`Requires ${item.allowedRoles.join(' or ')}`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-slate-600" />
                          <span>{item.label}</span>
                        </div>
                        <Lock className="w-3.5 h-3.5 text-slate-600" />
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium transition-colors text-left rounded ${
                        isActive
                          ? 'bg-blue-600/10 border-l-2 border-blue-500 text-blue-400'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom User Card */}
        <div className="p-4 bg-[#1E293B] mt-auto shrink-0 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-600 shrink-0 flex items-center justify-center text-[10px] font-bold text-white">
              {userInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white text-xs font-semibold truncate">
                {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Admin User'}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-slate-400 text-[10px] truncate">
                  {currentUser?.roles[0] || userRole}
                </span>
                <span className="text-slate-500 text-[9px]">•</span>
                <span className="text-emerald-400 text-[10px] font-semibold">Online</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
