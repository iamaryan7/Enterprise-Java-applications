import React from 'react';
import { 
  Users, 
  UserCheck, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  Activity, 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Database,
  PlusCircle,
  FileSpreadsheet,
  Terminal,
  Layers
} from 'lucide-react';
import { SystemStats, MonthlyMetric, AuditLog, NotificationItem, Employee, Department, Role } from '../types';

interface DashboardViewProps {
  stats: SystemStats;
  monthlyMetrics: MonthlyMetric[];
  recentAudits: AuditLog[];
  notifications: NotificationItem[];
  employees: Employee[];
  departments: Department[];
  userRole: Role;
  onNavigate: (view: string) => void;
  onQuickAddEmployee: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  monthlyMetrics,
  recentAudits,
  notifications,
  employees,
  departments,
  userRole,
  onNavigate,
  onQuickAddEmployee
}) => {
  const maxMetricEmployees = Math.max(...monthlyMetrics.map(m => m.employees));
  const maxMetricPayroll = Math.max(...monthlyMetrics.map(m => m.payroll));

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wider">
              Enterprise v1.0
            </span>
            <span className="text-xs text-slate-500 font-medium">Spring Boot 3.3.4 • Java 21 LTS • MySQL 8</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Enterprise Operations Center
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Production-grade architecture with Spring Security JWT, JPA Auditing, and MySQL 8 relational schema.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['ADMIN', 'MANAGER'].includes(userRole) && (
            <button
              onClick={onQuickAddEmployee}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Employee</span>
            </button>
          )}
          <button
            onClick={() => onNavigate('reports')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export Reports</span>
          </button>
          <button
            onClick={() => onNavigate('swagger')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition"
          >
            <Terminal className="w-3.5 h-3.5 text-amber-600" />
            <span>Swagger API</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Employees */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-500 text-xs font-medium">Total Employees</span>
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{stats.totalEmployees}</span>
            <span className="text-green-600 text-[10px] font-bold">+12% ↑</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            <span className="text-green-600 font-semibold">{stats.activeEmployees} active</span> across {stats.totalDepartments} departments
          </p>
        </div>

        {/* Card 2: Active Departments */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-500 text-xs font-medium">Active Departments</span>
            <div className="p-1.5 bg-orange-50 text-orange-600 rounded-md">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{stats.totalDepartments}</span>
            <span className="text-slate-400 text-[10px] font-bold">Stable</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {stats.activeUsers} security accounts configured
          </p>
        </div>

        {/* Card 3: Monthly Payroll / Transactions */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-500 text-xs font-medium">Monthly Transactions</span>
            <div className="p-1.5 bg-green-50 text-green-600 rounded-md">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">${(stats.totalMonthlyPayroll / 1000).toFixed(0)}K</span>
            <span className="text-green-600 text-[10px] font-bold">+8.4% ↑</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Reconciled through Finance & Accounting
          </p>
        </div>

        {/* Card 4: System Uptime */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-500 text-xs font-medium">System Uptime</span>
            <div className="p-1.5 bg-purple-50 text-purple-600 rounded-md">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">99.98%</span>
            <span className="text-slate-400 text-[10px] font-bold">High</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            MySQL InnoDB: 20 active connections
          </p>
        </div>
      </div>

      {/* Analytics Charts & Department Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Monthly Trend Chart */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recruitment & Payroll Trend</h3>
              <p className="text-xs text-slate-500">6-Month enterprise staffing velocity and expenditure</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-blue-600 font-semibold">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-600"></span> Employees
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Payroll ($k)
              </span>
            </div>
          </div>

          {/* Styled Bar Chart representation */}
          <div className="pt-4 pb-2">
            <div className="h-44 flex items-end justify-between gap-4 sm:gap-8 px-2 border-b border-slate-200">
              {monthlyMetrics.map((metric) => {
                const empHeightPct = (metric.employees / maxMetricEmployees) * 100;
                const payrollHeightPct = (metric.payroll / maxMetricPayroll) * 100;

                return (
                  <div key={metric.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-1.5 h-full">
                      {/* Employee Bar */}
                      <div
                        style={{ height: `${empHeightPct}%` }}
                        className="w-1/2 max-w-[20px] bg-blue-600/85 hover:bg-blue-600 rounded-t transition-all duration-300 relative cursor-pointer"
                        title={`${metric.employees} Employees`}
                      >
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-slate-900 text-white px-1.5 py-0.5 rounded shadow z-10 whitespace-nowrap">
                          {metric.employees}
                        </span>
                      </div>
                      {/* Payroll Bar */}
                      <div
                        style={{ height: `${payrollHeightPct}%` }}
                        className="w-1/2 max-w-[20px] bg-emerald-500/85 hover:bg-emerald-500 rounded-t transition-all duration-300 relative cursor-pointer"
                        title={`$${(metric.payroll / 1000).toFixed(1)}k Payroll`}
                      >
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-slate-900 text-white px-1.5 py-0.5 rounded shadow z-10 whitespace-nowrap">
                          ${(metric.payroll / 1000).toFixed(0)}k
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">{metric.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Department Headcount Breakdown */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Department Headcount</h3>
            <p className="text-xs text-slate-500 mb-4">Live distribution across organizational divisions</p>

            <div className="space-y-3">
              {departments.slice(0, 5).map((dept) => {
                const deptEmployees = employees.filter(e => e.departmentId === dept.id).length;
                const percentage = Math.round((deptEmployees / employees.length) * 100);

                return (
                  <div key={dept.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 truncate max-w-[170px]">{dept.name}</span>
                      <span className="text-slate-500 font-mono">{deptEmployees} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => onNavigate('departments')}
            className="w-full mt-4 py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1 border-t border-slate-100 pt-3"
          >
            <span>View All {departments.length} Departments</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Section: Recent Audit Trail & System Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Audit Activities (2 cols) */}
        <div className="lg:col-span-2 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Audit Trail</h3>
              <p className="text-xs text-slate-500">JPA entity mutation logs and security events</p>
            </div>
            {['ADMIN'].includes(userRole) && (
              <button
                onClick={() => onNavigate('audit')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                Full Audit Log
              </button>
            )}
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 font-bold">User</th>
                  <th className="px-4 py-3 font-bold">Action</th>
                  <th className="px-4 py-3 font-bold">Entity</th>
                  <th className="px-4 py-3 font-bold">Description</th>
                  <th className="px-4 py-3 font-bold">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {recentAudits.slice(0, 5).map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      {log.user}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        log.action === 'CREATE' ? 'bg-green-100 text-green-700' :
                        log.action === 'UPDATE' ? 'bg-blue-100 text-blue-700' :
                        log.action === 'DELETE' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-500">{log.entity}</td>
                    <td className="px-4 py-3 text-slate-600 truncate max-w-xs">{log.description}</td>
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{log.timestamp.split(' ')[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium shrink-0 bg-slate-50/50">
            <span>Showing recent 5 JPA mutation entries</span>
            <button
              onClick={() => onNavigate('audit')}
              className="text-blue-600 font-semibold hover:underline"
            >
              Inspect all events →
            </button>
          </div>
        </div>

        {/* System Announcements & Server Health (1 col) */}
        <div className="rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden">
          <div>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-sm font-bold text-slate-900">System Broadcasts</h3>
                <p className="text-xs text-slate-500">Real-time alerts & announcements</p>
              </div>
              <button
                onClick={() => onNavigate('notifications')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                All Alerts
              </button>
            </div>

            <div className="p-4 space-y-3">
              {notifications.slice(0, 3).map((notif) => (
                <div key={notif.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="font-semibold text-slate-800 truncate max-w-[190px]">{notif.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{notif.timestamp.split(' ')[0]}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{notif.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Server status pill matching High Density design */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
            <div className="bg-blue-600 rounded-lg p-3 text-white">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100">Server Status</span>
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
              </div>
              <p className="text-xs font-bold">AWS-East-1 Cluster Running</p>
              <div className="w-full bg-blue-400/30 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-white h-full rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
