import React, { useState } from 'react';
import { 
  Bell, 
  ShieldCheck, 
  ChevronDown, 
  UserCheck, 
  Check, 
  LogOut, 
  Menu, 
  Search,
  FileSpreadsheet
} from 'lucide-react';
import { User, Role, NotificationItem } from '../types';

interface NavbarProps {
  currentUser: User;
  userRole?: Role;
  unreadNotificationsCount?: number;
  onRoleChange?: (role: Role) => void;
  onSwitchRole?: (role: Role) => void;
  notifications?: NotificationItem[];
  onOpenNotifications?: () => void;
  currentView?: string;
  onNavigate: (view: string) => void;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  onToggleMobileSidebar?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  userRole,
  unreadNotificationsCount,
  onRoleChange,
  onSwitchRole,
  notifications = [],
  onNavigate,
  searchTerm = '',
  onSearchChange,
  onToggleSidebar,
  onToggleMobileSidebar,
  onLogout
}) => {
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);

  const currentRole = userRole || currentUser.roles[0];
  const unread = unreadNotificationsCount !== undefined 
    ? unreadNotificationsCount 
    : notifications.filter(n => !n.isRead).length;

  const handleRoleSelect = (role: Role) => {
    if (onRoleChange) onRoleChange(role);
    if (onSwitchRole) onSwitchRole(role);
    setIsRoleMenuOpen(false);
  };

  const toggleSidebarHandler = onToggleMobileSidebar || onToggleSidebar || (() => {});

  const roleConfigs: Record<Role, { label: string; desc: string; badgeColor: string }> = {
    ADMIN: { label: 'ADMINISTRATOR', desc: 'Full System, User, DB & Audit Permissions', badgeColor: 'bg-rose-50 text-rose-700 border-rose-200' },
    MANAGER: { label: 'MANAGER', desc: 'Employee, Dept & Report Access', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
    EMPLOYEE: { label: 'EMPLOYEE', desc: 'Profile & Directory Access', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
    USER: { label: 'GENERAL USER', desc: 'Basic Read-Only Dashboard', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 z-30">
      {/* Left: Mobile Toggle & Header Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebarHandler}
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition md:hidden"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">System Dashboard</h1>
          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
            Live
          </span>
        </div>
      </div>

      {/* Right: Search & Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Search system input */}
        <div className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search system..."
            value={searchTerm}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="bg-slate-100 border-none rounded-md py-1.5 pl-8 pr-3 text-xs w-48 lg:w-64 focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800 placeholder:text-slate-400 transition"
          />
        </div>

        {/* Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-semibold transition ${roleConfigs[currentRole]?.badgeColor || 'bg-slate-50 text-slate-700 border-slate-200'}`}
            title="Switch User Role Authorization"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">{currentRole}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>

          {isRoleMenuOpen && (
            <div 
              className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 animate-in fade-in"
              onMouseLeave={() => setIsRoleMenuOpen(false)}
            >
              <div className="px-2 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Select Active Authority
              </div>
              {(['ADMIN', 'MANAGER', 'EMPLOYEE', 'USER'] as Role[]).map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleSelect(role)}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left text-xs transition my-0.5 ${
                    currentRole === role ? 'bg-blue-50 text-blue-800 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="mt-0.5">
                    {currentRole === role ? (
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">{roleConfigs[role].label}</div>
                    <div className="text-[11px] text-slate-500 leading-tight mt-0.5">{roleConfigs[role].desc}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg relative transition"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>

          {isNotifDropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 animate-in fade-in"
              onMouseLeave={() => setIsNotifDropdownOpen(false)}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">System Broadcasts</span>
                  {unread > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-100 text-red-700">
                      {unread} unread
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    setIsNotifDropdownOpen(false);
                    onNavigate('notifications');
                  }}
                  className="text-[11px] text-blue-600 hover:underline font-semibold"
                >
                  View All
                </button>
              </div>

              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto mt-2">
                {notifications.length > 0 ? (
                  notifications.slice(0, 4).map((notif) => (
                    <div key={notif.id} className="py-2.5 px-1 hover:bg-slate-50 rounded transition text-left">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-800 truncate">{notif.title}</span>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-2">{notif.timestamp.split(' ')[0]}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{notif.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center text-xs text-slate-400">No active alerts</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Generate Report primary button */}
        <button
          onClick={() => onNavigate('reports')}
          className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 rounded-md text-xs font-semibold shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Generate Report</span>
        </button>

        {/* User Profile Avatar */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-slate-200 transition"
          >
            <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
            </div>
          </button>

          {isUserMenuOpen && (
            <div 
              className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 animate-in fade-in"
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{currentUser.firstName} {currentUser.lastName}</p>
                <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-100">
                  ROLE_{currentRole}
                </span>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    onNavigate('swagger');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 transition"
                >
                  <UserCheck className="w-4 h-4 text-slate-400" />
                  <span>API Key & Token</span>
                </button>
                {onLogout && (
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-rose-600 hover:bg-rose-50 transition"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Logout Session</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
