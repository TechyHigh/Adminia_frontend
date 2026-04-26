import { Activity, FileText, Hash, Award, CheckCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const APP_STATUS = 'Under Review'; // Draft | Submitted | Under Review | Need Correction | Approved | Confirmed

const BANNER = {
  Draft:            { color: 'bg-gray-50 border-gray-200',     icon: FileText,    title: 'Incomplete Application', desc: 'You have a saved draft. Complete your Phase-I application.', action: 'Complete Phase-I', href: '/student/application' },
  Submitted:        { color: 'bg-primary/5 border-primary/20', icon: Clock,       title: 'Application Submitted', desc: 'Your application is queued for review by the admin.', action: 'View Progress', href: '/student' },
  'Under Review':   { color: 'bg-primary/5 border-primary/20', icon: Clock,       title: 'Under Review', desc: 'Your Phase-I application is being reviewed. You will be notified of the decision.', action: null },
  'Need Correction':{ color: 'bg-warning/5 border-warning/30', icon: AlertCircle, title: 'Correction Required', desc: 'Admin has requested changes to your Phase-I application.', action: 'Edit Application', href: '/student/application' },
  Approved:         { color: 'bg-success/5 border-success/30', icon: CheckCircle, title: 'Phase-I Approved!', desc: 'Congratulations! Proceed to Phase-II documentation to confirm your admission.', action: 'Start Phase-II', href: '/student/documents' },
  Confirmed:        { color: 'bg-indigo-50 border-indigo-200', icon: CheckCircle, title: 'Admission Confirmed!', desc: 'Your admission to George College is complete. Welcome!', action: null },
};

const STEPS = [
  { id: 1, name: 'Registration' },
  { id: 2, name: 'Phase-I Form' },
  { id: 3, name: 'Review' },
  { id: 4, name: 'Approved' },
  { id: 5, name: 'Phase-II' },
];
const PROGRESS = { Draft: 1, Submitted: 2, 'Under Review': 3, 'Need Correction': 2, Approved: 4, Confirmed: 5 };

export function StudentDashboard() {
  const banner    = BANNER[APP_STATUS] || BANNER['Under Review'];
  const BIcon     = banner.icon;
  const curStep   = PROGRESS[APP_STATUS] || 3;
  const pct       = ((curStep - 1) / (STEPS.length - 1)) * 100;

  const stats = [
    { name: 'Application Status', value: APP_STATUS,       icon: Activity,  color: 'text-primary',    bg: 'bg-primary/10' },
    { name: 'Docs Uploaded',      value: '3 / 5',          icon: FileText,  color: 'text-secondary',  bg: 'bg-secondary/10' },
    { name: 'Application ID',     value: 'CG27-001',       icon: Hash,      color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Admission Status',   value: 'Pending',        icon: Award,     color: 'text-warning',    bg: 'bg-warning/10' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-text">Welcome, Student Name 👋</h1>
        <p className="text-gray-500 mt-1 text-sm">Track your admission progress below.</p>
      </div>

      {/* Status Banner */}
      <div className={`rounded-xl border p-5 flex flex-col sm:flex-row sm:items-center gap-4 animate-fade-in-up delay-50 ${banner.color}`}>
        <div className="flex items-start gap-4 flex-1">
          <div className="p-2.5 rounded-xl bg-white/80 shadow-sm flex-shrink-0">
            <BIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-text text-sm">{banner.title}</h3>
            <p className="text-xs text-gray-600 mt-0.5">{banner.desc}</p>
          </div>
        </div>
        {banner.action && (
          <Link to={banner.href} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm whitespace-nowrap flex-shrink-0">
            {banner.action} <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <div key={s.name} className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: `${100 + i * 60}ms` }}>
            <div className={`p-3 rounded-xl ${s.bg} ${s.color} flex-shrink-0`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">{s.name}</p>
              <p className="text-base font-bold text-text">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Stepper */}
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-sm animate-fade-in-up delay-300">
        <h2 className="text-base font-bold text-text mb-6">Admission Progress</h2>
        <div className="relative">
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-100 rounded-full" />
          <div className="absolute top-5 left-0 h-1 bg-primary rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }} />
          <div className="relative flex justify-between">
            {STEPS.map(s => {
              const done = s.id < curStep;
              const cur  = s.id === curStep;
              return (
                <div key={s.id} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-card z-10 relative transition-all ${done ? 'bg-success text-white' : cur ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {done ? <CheckCircle className="w-5 h-5" /> : <span className="text-xs font-bold">{s.id}</span>}
                  </div>
                  <span className={`mt-2 text-xs font-semibold whitespace-nowrap ${cur ? 'text-primary' : done ? 'text-text' : 'text-gray-400'}`}>
                    {s.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

