import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter, 
  ToggleLeft, 
  ToggleRight, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

/* ─── Status badge helper ─── */
function StatusBadge({ status }) {
  const map = {
    Approved:         'bg-green-100 text-green-700',
    Rejected:         'bg-red-100 text-red-700',
    'Under Review':   'bg-blue-100 text-blue-700',
    'Need Correction':'bg-yellow-100 text-yellow-700',
    Pending:          'bg-gray-100 text-gray-600',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${map[status] || map.Pending}`}>
      {status}
    </span>
  );
}

/* ─── Applications Table ─── */
export function ApplicationsTable({ limit }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const COURSES = [
    "Bachelor's Degree in Business Administration(BBA)",
    "Bachelor's Degree in Computer Application (BCA)",
    "BBA in Hospital Management",
    "B.Sc in Media Science",
    "BBA in Sports Management",
    "Bachelor's Degree in Travel and Tourism Management",
    "Bachelor's Degree in Automobile Servicing Technology",
    "Bachelor's Degree in Hardware and Networking",
    "Bachelor's Degree in Electronics Manufacturing Services",
    "B.Sc in VFX Film Making",
    "B.Sc in Medical Lab Technology",
    "Bachelor's Degree in Medical Lab Technology",
    "B.Sc. in Multimedia, Animation and Graphics",
    "Bachelor's Degree in Interior Design"
  ];

  const applications = [
    { id: 'CG27-001', name: 'Rahul Sharma',   course: 'BCA',        status: 'Under Review',    date: 'Oct 24, 2025' },
    { id: 'CG27-002', name: 'Priya Singh',    course: 'BBA',        status: 'Approved',        date: 'Oct 23, 2025' },
    { id: 'CG27-003', name: 'Aditya Roy',     course: 'B.SC(MLT)',  status: 'Approved',        date: 'Oct 22, 2025' },
    { id: 'CG27-004', name: 'Sneha Das',      course: 'BBA (HM)',   status: 'Rejected',        date: 'Oct 21, 2025' },
    { id: 'CG27-005', name: 'Amit Kumar',     course: 'BMS',        status: 'Need Correction', date: 'Oct 20, 2025' },
  ];

  const filtered = applications.filter(app => {
    const searchLower = search.toLowerCase();
    const matchesSearch = app.name.toLowerCase().includes(searchLower) ||
                          app.id.toLowerCase().includes(searchLower) ||
                          app.course.toLowerCase().includes(searchLower);
    
    const matchesStatus = statusFilter ? app.status === statusFilter : true;
    
    const matchesCourse = !courseFilter || 
                          app.course === courseFilter || 
                          courseFilter.toLowerCase().includes(app.course.toLowerCase());

    return matchesSearch && matchesStatus && matchesCourse;
  });

  const data = limit ? filtered.slice(0, limit) : filtered;

  const statuses = ['Under Review', 'Approved', 'Rejected', 'Need Correction'];

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm">
      {!limit && (
        <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between gap-3 relative">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search applications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-border rounded-xl outline-none focus:border-primary text-sm w-full sm:w-80 transition-colors" 
            />
          </div>
          <div className="flex gap-2">
            {(statusFilter || courseFilter) && (
              <button 
                onClick={() => { setStatusFilter(''); setCourseFilter(''); }}
                className="flex items-center gap-1.5 px-3 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary/20 transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" /> Clear
              </button>
            )}
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className={`flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium transition-colors ${showFilter || statusFilter || courseFilter ? 'bg-primary/5 border-primary/20 text-primary' : 'hover:bg-gray-50'}`}
            >
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>

          {/* Filter Dropdown */}
          {showFilter && (
            <div className="absolute right-4 top-[calc(100%-4px)] w-72 bg-white border border-border rounded-2xl shadow-2xl z-30 animate-scale-in origin-top-right overflow-hidden sm:right-0">
              <div className="p-3 border-b border-border bg-gray-50/50 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Advanced Filters</span>
                <button onClick={() => setShowFilter(false)} className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
                  <XCircle className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              
              <div className="p-3 space-y-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">By Status</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {statuses.map(status => (
                      <button 
                        key={status} 
                        onClick={() => setStatusFilter(statusFilter === status ? '' : status)}
                        className={`text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${statusFilter === status ? 'bg-primary text-white font-bold' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Course Filter */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">By Course</label>
                  <select 
                    value={courseFilter} 
                    onChange={(e) => setCourseFilter(e.target.value)}
                    className="w-full text-xs border border-border rounded-lg p-2 outline-none focus:border-primary"
                  >
                    <option value="">All Courses</option>
                    {COURSES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-border">
            <tr>
              <th className="px-6 py-4">Application ID</th>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((app, i) => (
              <tr key={app.id} className="hover:bg-gray-50/70 transition-colors animate-fade-in"
                style={{ animationDelay: `${i * 40}ms` }}>
                <td className="px-6 py-4 font-mono text-xs font-semibold text-text">{app.id}</td>
                <td className="px-6 py-4 font-medium text-text">{app.name}</td>
                <td className="px-6 py-4 text-gray-500">{app.course}</td>
                <td className="px-6 py-4"><StatusBadge status={app.status} /></td>
                <td className="px-6 py-4 text-gray-500">{app.date}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/applications/${app.id}`}
                    className="text-xs font-semibold text-primary border border-primary/25 px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-colors">
                    Review
                  </Link>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-sm">
                  No applications found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Admin Dashboard ─── */
export function AdminDashboard() {
  const [phase1, setPhase1] = useState(true);
  const [phase2, setPhase2] = useState(false);
  const toast = useToast();

  const toggle = (phase, val, setVal) => {
    setVal(!val);
    toast && toast(`Phase ${phase} ${!val ? 'activated' : 'deactivated'}.`, !val ? 'success' : 'warning');
  };

  const stats = [
    { name: 'Total Applications', value: '1,248', sub: '+89 this week',   icon: Users,         color: 'text-blue-600',  bg: 'bg-blue-100' },
    { name: 'Under Review',       value: '142',   sub: 'Needs attention', icon: Clock,         color: 'text-warning',   bg: 'bg-warning/10' },
    { name: 'Approved',           value: '892',   sub: '71.5% rate',      icon: CheckCircle,   color: 'text-success',   bg: 'bg-success/10' },
    { name: 'Rejected',           value: '214',   sub: '17.1% rate',      icon: XCircle,       color: 'text-danger',    bg: 'bg-danger/10' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-text">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1 text-sm">Manage applications and phase controls for your college.</p>
      </div>

      {/* Phase Control */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm animate-fade-in-up delay-50">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-4 h-4 text-warning" />
          <h2 className="text-sm font-bold text-text">Phase Control</h2>
          <span className="text-xs text-gray-400">— Open or close application windows for students</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          {[
            { label: 'Phase I — Application Form', active: phase1, num: 1, toggle: () => toggle(1, phase1, setPhase1) },
            { label: 'Phase II — Documentation',   active: phase2, num: 2, toggle: () => toggle(2, phase2, setPhase2) },
          ].map(ph => (
            <div key={ph.num}
              className={`flex-1 flex items-center justify-between p-4 rounded-xl border transition-all ${ph.active ? 'bg-success/5 border-success/30' : 'bg-gray-50 border-border'}`}>
              <div>
                <p className="font-semibold text-sm text-text">{ph.label}</p>
                <p className={`text-xs font-medium mt-0.5 ${ph.active ? 'text-success' : 'text-gray-400'}`}>
                  {ph.active ? '● Active' : '○ Inactive'}
                </p>
              </div>
              <button onClick={ph.toggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-colors ${ph.active ? 'bg-danger hover:bg-danger/90' : 'bg-success hover:bg-success/90'}`}>
                {ph.active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                {ph.active ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <div key={s.name} className="bg-card border border-border rounded-xl p-5 shadow-sm animate-fade-in-up"
            style={{ animationDelay: `${120 + i * 60}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <div className={`p-3 rounded-xl ${s.bg} ${s.color}`}><s.icon className="w-5 h-5" /></div>
            </div>
            <p className="text-xs font-medium text-gray-500 mb-1">{s.name}</p>
            <p className="text-2xl font-bold text-text">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="animate-fade-in-up delay-300">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-text">Recent Applications</h2>
          <Link to="/admin/applications" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
            View All →
          </Link>
        </div>
        <ApplicationsTable limit={5} />
      </div>
    </div>
  );
}
