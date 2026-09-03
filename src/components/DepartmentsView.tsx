import React, { useState } from 'react';
import { 
  Building2, 
  PlusCircle, 
  Search, 
  Users, 
  DollarSign, 
  Edit, 
  Trash2, 
  Calendar, 
  UserCheck, 
  X, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { Department, Employee, Role } from '../types';

interface DepartmentsViewProps {
  departments: Department[];
  employees: Employee[];
  userRole: Role;
  onAddDepartment: (deptData: Omit<Department, 'id' | 'createdDate' | 'employeeCount'>) => void;
  onUpdateDepartment: (id: number, updates: Partial<Department>) => void;
  onDeleteDepartment: (id: number) => void;
}

export const DepartmentsView: React.FC<DepartmentsViewProps> = ({
  departments,
  employees,
  userRole,
  onAddDepartment,
  onUpdateDepartment,
  onDeleteDepartment
}) => {
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [viewingDeptEmployees, setViewingDeptEmployees] = useState<Department | null>(null);

  const [formData, setFormData] = useState({
    departmentCode: '',
    name: '',
    description: '',
    managerId: 1,
    managerName: 'Alexander Wright',
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE',
    budget: 500000
  });

  const canEdit = ['ADMIN', 'MANAGER'].includes(userRole);
  const canDelete = ['ADMIN'].includes(userRole);

  const filteredDepts = departments.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.departmentCode.toLowerCase().includes(search.toLowerCase()) ||
    d.description.toLowerCase().includes(search.toLowerCase()) ||
    d.managerName.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const managerEmp = employees.find(emp => emp.id === Number(formData.managerId));
    onAddDepartment({
      ...formData,
      managerId: Number(formData.managerId),
      managerName: managerEmp ? `${managerEmp.firstName} ${managerEmp.lastName}` : 'Unassigned',
      budget: Number(formData.budget)
    });
    setIsAddModalOpen(false);
    setFormData({
      departmentCode: '',
      name: '',
      description: '',
      managerId: 1,
      managerName: 'Alexander Wright',
      status: 'ACTIVE',
      budget: 500000
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDept) return;
    const managerEmp = employees.find(emp => emp.id === Number(editingDept.managerId));
    onUpdateDepartment(editingDept.id, {
      ...editingDept,
      managerName: managerEmp ? `${managerEmp.firstName} ${managerEmp.lastName}` : editingDept.managerName
    });
    setEditingDept(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span>Corporate Department Management</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Hierarchical cost centers, division governance, and operational staffing budgets.
          </p>
        </div>

        {canEdit && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Department</span>
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search department code, division name, or appointed manager..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDepts.map((dept) => {
          const deptEmployees = employees.filter(e => e.departmentId === dept.id);
          const totalSalaries = deptEmployees.reduce((acc, curr) => acc + curr.salary, 0);

          return (
            <div key={dept.id} className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                    {dept.departmentCode}
                  </span>
                  <div className="flex items-center gap-1">
                    {canEdit && (
                      <button
                        onClick={() => setEditingDept(dept)}
                        className="p-1 rounded text-slate-400 hover:text-blue-600"
                        title="Edit Department"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => onDeleteDepartment(dept.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-600"
                        title="Delete Department"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-2">{dept.name}</h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{dept.description}</p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Department Lead</span>
                  <span className="font-semibold text-blue-700 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                    {dept.managerName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Headcount</span>
                  <span className="font-mono font-medium text-slate-800">{deptEmployees.length} Personnel</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Allocated Budget</span>
                  <span className="font-mono font-semibold text-emerald-700">${dept.budget.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setViewingDeptEmployees(dept)}
                className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-between border border-slate-200 transition"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" />
                  <span>View Staff ({deptEmployees.length})</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Staff Modal */}
      {viewingDeptEmployees && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>{viewingDeptEmployees.name} ({viewingDeptEmployees.departmentCode})</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Assigned employees for this department division</p>
              </div>
              <button onClick={() => setViewingDeptEmployees(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 max-h-80 overflow-y-auto divide-y divide-slate-100">
              {employees.filter(e => e.departmentId === viewingDeptEmployees.id).map((emp) => (
                <div key={emp.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-slate-900">{emp.firstName} {emp.lastName}</div>
                    <div className="text-[11px] text-slate-500">{emp.designation} • {emp.email}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-semibold text-emerald-700">${emp.salary.toLocaleString()}</div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                      {emp.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setViewingDeptEmployees(null)}
                className="px-4 py-1.5 rounded-md bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Department Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-blue-600" />
                <span>Create Corporate Department</span>
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-4 space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Department Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SEC-07"
                  value={formData.departmentCode}
                  onChange={(e) => setFormData({ ...formData, departmentCode: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 uppercase font-mono focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Department Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cybersecurity Operations"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Appointed Manager</label>
                <select
                  value={formData.managerId}
                  onChange={(e) => setFormData({ ...formData, managerId: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                >
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName} ({emp.designation})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Allocated Budget (USD)</label>
                <input
                  type="number"
                  step="10000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-mono focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 rounded-md text-xs text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm"
                >
                  Save Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Department Modal */}
      {editingDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Edit className="w-4 h-4 text-blue-600" />
                <span>Edit Department {editingDept.departmentCode}</span>
              </h3>
              <button onClick={() => setEditingDept(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-4 space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Department Name</label>
                <input
                  type="text"
                  value={editingDept.name}
                  onChange={(e) => setEditingDept({ ...editingDept, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingDept.description}
                  onChange={(e) => setEditingDept({ ...editingDept, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Appointed Manager</label>
                <select
                  value={editingDept.managerId}
                  onChange={(e) => setEditingDept({ ...editingDept, managerId: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                >
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Allocated Budget ($)</label>
                <input
                  type="number"
                  value={editingDept.budget}
                  onChange={(e) => setEditingDept({ ...editingDept, budget: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-mono focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingDept(null)}
                  className="px-3 py-1.5 rounded-md text-xs text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm"
                >
                  Update Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
