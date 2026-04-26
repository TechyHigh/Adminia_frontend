import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Building2, MapPin, Users } from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';

const MOCK_COLLEGES = [
  { id: 1, name: '133/George College', district: 'Kolkata', courses: 12, students: 420, status: 'Active', since: '2018' },
  { id: 2, name: 'ABC Institute of Technology', district: 'Kolkata', courses: 8, students: 310, status: 'Active', since: '2020' },
  { id: 3, name: 'Bengal College of Commerce', district: 'Howrah', courses: 6, students: 190, status: 'Inactive', since: '2019' },
  { id: 4, name: 'City College Annexe', district: 'Kolkata', courses: 10, students: 250, status: 'Active', since: '2016' },
];

const inputCls = "w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm bg-background";

export function CollegesPage() {
  const [colleges, setColleges] = useState(MOCK_COLLEGES);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', district: '', status: 'Active' });
  const toast = useToast();

  const filtered = colleges.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.district.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditing(null); setForm({ name: '', district: '', status: 'Active' }); setModalOpen(true); };
  const openEdit = (c) => { setEditing(c); setForm({ name: c.name, district: c.district, status: c.status }); setModalOpen(true); };

  const handleSave = () => {
    if (!form.name || !form.district) return;
    if (editing) {
      setColleges(cs => cs.map(c => c.id === editing.id ? { ...c, ...form } : c));
      toast && toast('College updated!', 'success');
    } else {
      setColleges(cs => [...cs, { id: Date.now(), courses: 0, students: 0, since: '2025', ...form }]);
      toast && toast('College added!', 'success');
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setColleges(cs => cs.filter(c => c.id !== id));
    toast && toast('College removed.', 'info');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Colleges</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all affiliated colleges in the system.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add College
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[{ label: 'Total Colleges', value: colleges.length, icon: Building2, color: 'text-purple-600', bg: 'bg-purple-100' },
          { label: 'Active', value: colleges.filter(c => c.status === 'Active').length, icon: Users, color: 'text-success', bg: 'bg-success/10' },
          { label: 'Total Students', value: colleges.reduce((s, c) => s + c.students, 0), icon: Users, color: 'text-primary', bg: 'bg-primary/10' }]
          .map((s, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5 shadow-sm flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className={`p-3 rounded-xl ${s.bg} ${s.color}`}><s.icon className="w-5 h-5" /></div>
              <div><p className="text-xs text-gray-500">{s.label}</p><p className="text-xl font-bold text-text">{s.value}</p></div>
            </div>
          ))}
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden animate-fade-in-up delay-200">
        <div className="p-4 border-b border-border">
          <div className="relative max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search colleges..." className="pl-9 pr-4 py-2 border border-border rounded-xl text-sm outline-none focus:border-primary w-full" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-border text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">College Name</th>
                <th className="px-6 py-4">District</th>
                <th className="px-6 py-4">Courses</th>
                <th className="px-6 py-4">Students</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-text">{c.name}</p>
                        <p className="text-xs text-gray-400">Est. {c.since}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><div className="flex items-center gap-1 text-gray-500"><MapPin className="w-3.5 h-3.5" />{c.district}</div></td>
                  <td className="px-6 py-4 text-gray-500">{c.courses}</td>
                  <td className="px-6 py-4 text-gray-500">{c.students}</td>
                  <td className="px-6 py-4"><StatusBadge status={c.status} /></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(c)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(c.id)} className="p-2 text-gray-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit College' : 'Add New College'}>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-text mb-1.5">College Name <span className="text-danger">*</span></label>
            <input className={inputCls} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter college name" /></div>
          <div><label className="block text-sm font-medium text-text mb-1.5">District <span className="text-danger">*</span></label>
            <input className={inputCls} value={form.district} onChange={e => setForm(f => ({ ...f, district: e.target.value }))} placeholder="Enter district" /></div>
          <div><label className="block text-sm font-medium text-text mb-1.5">Status</label>
            <select className={inputCls} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              <option>Active</option><option>Inactive</option>
            </select></div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-border text-text font-medium text-sm hover:bg-gray-50 transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm">
              {editing ? 'Save Changes' : 'Add College'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
