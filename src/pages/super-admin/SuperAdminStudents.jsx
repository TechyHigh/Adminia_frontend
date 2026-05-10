import { useState } from 'react';
import { Search, Filter, Download, Eye, Users } from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { EmptyState } from '../../components/ui/EmptyState';

const STUDENTS = [
  { id: 'CG27-001', name: 'Rahul Sharma', college: 'George College', course: 'BCA', category: 'General', status: 'Approved', mobile: '+91 98765 43210', session: '2025-26' },
  { id: 'CG27-002', name: 'Priya Singh', college: 'George College', course: 'BBA', category: 'OBC', status: 'Under Review', mobile: '+91 91234 56789', session: '2025-26' },
  { id: 'CG27-003', name: 'Aditya Roy', college: 'ABC Institute', course: 'B.SC(MLT)', category: 'SC', status: 'Approved', mobile: '+91 87654 32100', session: '2025-26' },
  { id: 'CG27-004', name: 'Sneha Das', college: 'George College', course: 'BBA (HM)', category: 'General', status: 'Rejected', mobile: '+91 99887 76655', session: '2025-26' },
  { id: 'CG27-005', name: 'Amit Kumar', college: 'City College', course: 'BMS', category: 'ST', status: 'Confirmed', mobile: '+91 88776 65544', session: '2025-26' },
  { id: 'CG27-006', name: 'Nisha Patel', college: 'ABC Institute', course: 'BTTM', category: 'General', status: 'Under Review', mobile: '+91 77665 54433', session: '2025-26' },
];

const STATUSES = ['All', 'Approved', 'Under Review', 'Rejected', 'Confirmed'];

export function SuperAdminStudents() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = STUDENTS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.college.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">All Students</h1>
          <p className="text-gray-500 text-sm mt-1">System-wide student directory across all colleges.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-border bg-card text-text rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: STUDENTS.length, color: 'text-primary bg-primary/10' },
          { label: 'Approved', value: STUDENTS.filter(s => s.status === 'Approved').length, color: 'text-success bg-success/10' },
          { label: 'Under Review', value: STUDENTS.filter(s => s.status === 'Under Review').length, color: 'text-warning bg-warning/10' },
          { label: 'Confirmed', value: STUDENTS.filter(s => s.status === 'Confirmed').length, color: 'text-indigo-600 bg-indigo-50' },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-text">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden animate-fade-in-up delay-200">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, ID, college..." className="pl-9 pr-4 py-2 border border-border rounded-xl text-sm outline-none focus:border-primary w-full" />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {STATUSES.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${statusFilter === s ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-border text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">App ID</th>
                <th className="px-6 py-4">College</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Session</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="py-12 text-center text-gray-400 text-sm">No students found.</td></tr>
              ) : filtered.map((s, i) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-text">{s.name}</p>
                        <p className="text-xs text-gray-400">{s.mobile}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{s.id}</td>
                  <td className="px-6 py-4 text-gray-500">{s.college}</td>
                  <td className="px-6 py-4 text-gray-500">{s.course}</td>
                  <td className="px-6 py-4 text-gray-500">{s.category}</td>
                  <td className="px-6 py-4 text-gray-500">{s.session}</td>
                  <td className="px-6 py-4"><StatusBadge status={s.status} /></td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
