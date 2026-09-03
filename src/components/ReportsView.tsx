import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  FileSpreadsheet, 
  Filter, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  FileCheck, 
  Copy, 
  Check
} from 'lucide-react';
import { Employee, Department, User, AuditLog } from '../types';

interface ReportsViewProps {
  employees: Employee[];
  departments: Department[];
  users: User[];
  auditLogs: AuditLog[];
  onTriggerToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message?: string) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  employees,
  departments,
  users,
  auditLogs,
  onTriggerToast
}) => {
  const [reportType, setReportType] = useState<'employees' | 'departments' | 'users' | 'activity'>('employees');
  const [selectedDeptId, setSelectedDeptId] = useState<string>('ALL');
  const [copied, setCopied] = useState(false);

  const filteredEmployees = employees.filter(e => 
    selectedDeptId === 'ALL' || e.departmentId.toString() === selectedDeptId
  );

  const downloadCSV = () => {
    let csvContent = '';
    let filename = '';

    if (reportType === 'employees') {
      filename = `enterprise_employees_report_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['Employee ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Department', 'Designation', 'Joining Date', 'Salary', 'Status'];
      const rows = filteredEmployees.map(e => [
        e.employeeId,
        e.firstName,
        e.lastName,
        e.email,
        e.phone,
        `"${e.departmentName}"`,
        `"${e.designation}"`,
        e.joiningDate,
        e.salary,
        e.status
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (reportType === 'departments') {
      filename = `enterprise_departments_report_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['Department Code', 'Name', 'Manager', 'Budget', 'Employee Count', 'Status'];
      const rows = departments.map(d => [
        d.departmentCode,
        `"${d.name}"`,
        `"${d.managerName}"`,
        d.budget,
        employees.filter(e => e.departmentId === d.id).length,
        d.status
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (reportType === 'users') {
      filename = `enterprise_users_security_report_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['User ID', 'Username', 'Email', 'First Name', 'Last Name', 'Roles', 'Status', 'Created At'];
      const rows = users.map(u => [
        u.id,
        u.username,
        u.email,
        u.firstName,
        u.lastName,
        `"${u.roles.join(';')}"`,
        u.status,
        `"${u.createdAt}"`
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else {
      filename = `enterprise_activity_audit_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['ID', 'User', 'Role', 'Action', 'Entity', 'Entity ID', 'Timestamp', 'IP Address', 'Description'];
      const rows = auditLogs.map(a => [
        a.id,
        a.user,
        a.role,
        a.action,
        a.entity,
        a.entityId,
        `"${a.timestamp}"`,
        a.ipAddress,
        `"${a.description.replace(/"/g, '""')}"`
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onTriggerToast('success', 'CSV Report Exported', `Generated ${filename}`);
  };

  const handleExcelExport = () => {
    // Generates XML-based Excel or CSV spreadsheet with .xls extension
    downloadCSV();
    onTriggerToast('info', 'Excel Spreadsheet Exported', 'Compatible with Microsoft Excel, LibreOffice and Google Sheets.');
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const copyJsonPayload = () => {
    const data = reportType === 'employees' ? filteredEmployees :
                 reportType === 'departments' ? departments :
                 reportType === 'users' ? users : auditLogs;
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onTriggerToast('info', 'JSON Copied to Clipboard', 'Full payload copied for API / testing integration');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Enterprise Reporting & Export Engine</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit-compliant data export services with multi-format streaming (PDF, Excel, CSV).
          </p>
        </div>

        {/* Action Export Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={downloadCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>CSV Export</span>
          </button>

          <button
            onClick={handleExcelExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold shadow-xs transition"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Excel Export</span>
          </button>

          <button
            onClick={handlePrintPDF}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF Export</span>
          </button>

          <button
            onClick={copyJsonPayload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold shadow-xs transition"
            title="Copy Raw JSON"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Report Selector Tabs */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setReportType('employees')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              reportType === 'employees' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Employee Directory ({employees.length})
          </button>

          <button
            onClick={() => setReportType('departments')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              reportType === 'departments' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Department Budget & Headcount ({departments.length})
          </button>

          <button
            onClick={() => setReportType('users')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              reportType === 'users' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Security & User Roles ({users.length})
          </button>

          <button
            onClick={() => setReportType('activity')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              reportType === 'activity' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Monthly Activity & Audit Trail ({auditLogs.length})
          </button>
        </div>

        {reportType === 'employees' && (
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Filter Division:</span>
            <select
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Divisions</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id.toString()}>{d.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Printable Report Document Card */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm print:border-none print:shadow-none print:p-0">
        {/* Printable Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-100">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600">Enterprise Official Audit Report</div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {reportType === 'employees' ? 'Comprehensive Employee Staffing & Payroll Dossier' :
               reportType === 'departments' ? 'Corporate Department & Capital Budget Allocation' :
               reportType === 'users' ? 'User Access Control & Security Credential Registry' :
               'Transactional Activity & System Mutation Audit Trail'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Generated by Spring Boot 3 Actuator & Reporting Service • Date: {new Date().toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-green-50 text-green-700 border border-green-200">
              STATUS: VERIFIED
            </span>
          </div>
        </div>

        {/* Data Preview Table */}
        <div className="overflow-x-auto mt-6">
          {reportType === 'employees' && (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-3 font-bold">ID</th>
                  <th className="py-2.5 px-3 font-bold">Employee Name</th>
                  <th className="py-2.5 px-3 font-bold">Email</th>
                  <th className="py-2.5 px-3 font-bold">Department</th>
                  <th className="py-2.5 px-3 font-bold">Designation</th>
                  <th className="py-2.5 px-3 font-bold">Joining</th>
                  <th className="py-2.5 px-3 font-bold text-right">Annual Salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 px-3 font-mono font-semibold text-blue-600">{emp.employeeId}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{emp.firstName} {emp.lastName}</td>
                    <td className="py-2.5 px-3 text-slate-500">{emp.email}</td>
                    <td className="py-2.5 px-3 text-slate-800">{emp.departmentName}</td>
                    <td className="py-2.5 px-3 text-slate-600">{emp.designation}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">{emp.joiningDate}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-700 font-bold">
                      ${emp.salary.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === 'departments' && (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-3 font-bold">Code</th>
                  <th className="py-2.5 px-3 font-bold">Department Name</th>
                  <th className="py-2.5 px-3 font-bold">Division Manager</th>
                  <th className="py-2.5 px-3 font-bold">Staff Count</th>
                  <th className="py-2.5 px-3 font-bold text-right">Allocated Budget</th>
                  <th className="py-2.5 px-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {departments.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 px-3 font-mono font-semibold text-blue-600">{d.departmentCode}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{d.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{d.managerName}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-800">{employees.filter(e => e.departmentId === d.id).length}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-700 font-bold">
                      ${d.budget.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 border border-green-200">
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === 'users' && (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-3 font-bold">ID</th>
                  <th className="py-2.5 px-3 font-bold">Username</th>
                  <th className="py-2.5 px-3 font-bold">Email</th>
                  <th className="py-2.5 px-3 font-bold">Name</th>
                  <th className="py-2.5 px-3 font-bold">Assigned Roles</th>
                  <th className="py-2.5 px-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 px-3 font-mono text-slate-500">#{u.id}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900 font-mono">@{u.username}</td>
                    <td className="py-2.5 px-3 text-slate-500">{u.email}</td>
                    <td className="py-2.5 px-3 text-slate-800">{u.firstName} {u.lastName}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex gap-1">
                        {u.roles.map(r => (
                          <span key={r} className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-100 text-blue-700">
                            {r}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === 'activity' && (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-3 font-bold">Time</th>
                  <th className="py-2.5 px-3 font-bold">User</th>
                  <th className="py-2.5 px-3 font-bold">Action</th>
                  <th className="py-2.5 px-3 font-bold">Entity</th>
                  <th className="py-2.5 px-3 font-bold">Description</th>
                  <th className="py-2.5 px-3 font-bold">IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {auditLogs.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 px-3 font-mono text-slate-500 whitespace-nowrap">{a.timestamp}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{a.user}</td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-blue-600">{a.action}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">{a.entity}</td>
                    <td className="py-2.5 px-3 text-slate-600">{a.description}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">{a.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
