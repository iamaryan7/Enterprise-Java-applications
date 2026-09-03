import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  Activity, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Clock,
  Terminal,
  Database
} from 'lucide-react';
import { AuditLog } from '../types';

interface AuditLogsViewProps {
  auditLogs: AuditLog[];
}

export const AuditLogsView: React.FC<AuditLogsViewProps> = ({ auditLogs }) => {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');
  const [entityFilter, setEntityFilter] = useState('ALL');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = 
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.description.toLowerCase().includes(search.toLowerCase()) ||
      log.entityId.toLowerCase().includes(search.toLowerCase()) ||
      log.ipAddress.includes(search);
    const matchesAction = actionFilter === 'ALL' || log.action === actionFilter;
    const matchesEntity = entityFilter === 'ALL' || log.entity === entityFilter;
    return matchesSearch && matchesAction && matchesEntity;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
            <span>Immutable System Audit Trail</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Security audit registry tracking user operations, authentication attempts, and database entity mutations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100 font-mono font-semibold">
            {auditLogs.length} Events Recorded
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by username, IP address, target entity ID or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5" />
            <span>Action:</span>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Actions</option>
              <option value="CREATE">CREATE</option>
              <option value="UPDATE">UPDATE</option>
              <option value="DELETE">DELETE</option>
              <option value="LOGIN">LOGIN</option>
              <option value="PASSWORD_RESET">PASSWORD_RESET</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span>Entity:</span>
            <select
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Entities</option>
              <option value="EMPLOYEE">EMPLOYEE</option>
              <option value="DEPARTMENT">DEPARTMENT</option>
              <option value="USER">USER</option>
              <option value="AUTH">AUTH</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4 font-bold">Audit ID</th>
                <th className="py-3 px-4 font-bold">User & Role</th>
                <th className="py-3 px-4 font-bold">Action</th>
                <th className="py-3 px-4 font-bold">Target Entity</th>
                <th className="py-3 px-4 font-bold">Description</th>
                <th className="py-3 px-4 font-bold">IP Address</th>
                <th className="py-3 px-4 font-bold">Timestamp</th>
                <th className="py-3 px-4 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-mono text-slate-500">
                    #{log.id}
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{log.user}</div>
                    <span className="text-[10px] font-mono text-blue-600 font-semibold">ROLE_{log.role}</span>
                  </td>

                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      log.action === 'CREATE' ? 'bg-green-100 text-green-700 border border-green-200' :
                      log.action === 'UPDATE' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                      log.action === 'DELETE' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                      'bg-amber-100 text-amber-700 border border-amber-200'
                    }`}>
                      {log.action}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-mono font-medium text-slate-800">{log.entity}</div>
                    {log.entityId && (
                      <span className="text-[10px] font-mono text-slate-500">{log.entityId}</span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-slate-600 max-w-sm">
                    {log.description}
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-500">
                    {log.ipAddress}
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      log.status === 'SUCCESS' ? 'bg-green-100 text-green-700' :
                      log.status === 'FAILURE' ? 'bg-rose-100 text-rose-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {log.status === 'SUCCESS' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      <span>{log.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
