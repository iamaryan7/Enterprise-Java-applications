import React, { useState } from 'react';
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Trash2, 
  PlusCircle, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle,
  X,
  Radio
} from 'lucide-react';
import { NotificationItem, Role } from '../types';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  userRole: Role;
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: number) => void;
  onCreateNotification: (notif: Omit<NotificationItem, 'id' | 'isRead' | 'timestamp'>) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  userRole,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onCreateNotification
}) => {
  const [tab, setTab] = useState<'ALL' | 'UNREAD' | 'INFO' | 'ALERT'>('ALL');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'INFO' as 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT',
    recipientRole: 'ALL' as Role | 'ALL'
  });

  const canBroadcast = ['ADMIN'].includes(userRole);

  const filteredNotifications = notifications.filter(n => {
    if (tab === 'UNREAD') return !n.isRead;
    if (tab === 'INFO') return n.type === 'INFO' || n.type === 'SUCCESS';
    if (tab === 'ALERT') return n.type === 'WARNING' || n.type === 'ALERT';
    return true;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.message) return;
    onCreateNotification(formData);
    setIsCreateModalOpen(false);
    setFormData({
      title: '',
      message: '',
      type: 'INFO',
      recipientRole: 'ALL'
    });
  };

  const typeIcons = {
    INFO: <Info className="w-4 h-4 text-blue-600" />,
    SUCCESS: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    WARNING: <AlertTriangle className="w-4 h-4 text-amber-600" />,
    ALERT: <AlertCircle className="w-4 h-4 text-rose-600" />
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <span>Internal Enterprise Notification System</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational alerts, automated compliance events, and executive announcements.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onMarkAllAsRead}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold shadow-xs transition"
          >
            <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mark All Read</span>
          </button>

          {canBroadcast && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Broadcast Notice</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setTab('ALL')}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
            tab === 'ALL' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          All ({notifications.length})
        </button>

        <button
          onClick={() => setTab('UNREAD')}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
            tab === 'UNREAD' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Unread ({notifications.filter(n => !n.isRead).length})
        </button>

        <button
          onClick={() => setTab('INFO')}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
            tab === 'INFO' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          System Info
        </button>

        <button
          onClick={() => setTab('ALERT')}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
            tab === 'ALERT' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Security & Alerts
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-white border border-slate-200 shadow-sm">
            <Bell className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-800">No notifications found</p>
            <p className="text-xs text-slate-500 mt-1">All messages have been processed.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-xl border transition flex items-start justify-between gap-4 ${
                notif.isRead
                  ? 'bg-white border-slate-200 text-slate-700 shadow-xs'
                  : 'bg-blue-50/40 border-blue-200 text-slate-900 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 shrink-0 mt-0.5">
                  {typeIcons[notif.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-slate-900">{notif.title}</h4>
                    {!notif.isRead && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
                        NEW
                      </span>
                    )}
                    {notif.recipientRole && (
                      <span className="text-[10px] font-mono text-slate-600 px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                        Target: {notif.recipientRole}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                  <p className="text-[11px] text-slate-400 mt-2 font-mono">{notif.timestamp}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {!notif.isRead && (
                  <button
                    onClick={() => onMarkAsRead(notif.id)}
                    className="p-1.5 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-slate-100 transition"
                    title="Mark as Read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => onDeleteNotification(notif.id)}
                  className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition"
                  title="Dismiss"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Broadcast Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Radio className="w-4 h-4 text-blue-600" />
                <span>Broadcast System Announcement</span>
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-4 space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Headline Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scheduled Infrastructure Maintenance"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Notice Content *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter notice details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Alert Classification</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  >
                    <option value="INFO">INFO (General)</option>
                    <option value="SUCCESS">SUCCESS (Confirmation)</option>
                    <option value="WARNING">WARNING (Attention)</option>
                    <option value="ALERT">ALERT (Critical)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Audience Role</label>
                  <select
                    value={formData.recipientRole}
                    onChange={(e) => setFormData({ ...formData, recipientRole: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  >
                    <option value="ALL">ALL (Company Wide)</option>
                    <option value="ADMIN">ADMIN Only</option>
                    <option value="MANAGER">MANAGERS</option>
                    <option value="EMPLOYEE">EMPLOYEES</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3 py-1.5 rounded-md text-xs text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm"
                >
                  Send Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
