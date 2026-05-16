import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, File, CheckCircle, XCircle,
  Download, ExternalLink, AlertTriangle, User, BookOpen,
  Building2, Calendar, MapPin, GraduationCap, Globe, Mail, Phone, Activity, FileText, Shield
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import Skeleton, { CardSkeleton } from '../../components/ui/Skeleton';

function StatusPill({ status }) {
  const map = {
    'Under Review': 'bg-primary/15 text-primary border border-primary/30',
    Approved: 'bg-success/15 text-success border border-success/30',
    Rejected: 'bg-danger/15 text-danger border border-danger/30',
    'Need Correction': 'bg-warning/15 text-warning border border-warning/30',
  };

  return (
    <span className={`px-4 py-1.5 rounded-xl text-xs font-bold border uppercase tracking-wider shadow-sm ${map[status] || map['Under Review']}`}>
      {status}
    </span>
  );
}

export function ApplicationReview() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState('phase1');
  const [appStatus, setAppStatus] = useState('Under Review');
  const [comment, setComment] = useState('');
  const toast = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // 🔥 REAL DATA STRUCTURE BASED ON YOUR FORMS
  const [docs, setDocs] = useState([
    { id: 'd1', name: 'Final Marksheet', status: 'Verified', url: '#' },
    { id: 'd2', name: 'Photo', status: 'Verified', url: '#' },
    { id: 'd3', name: 'Signature', status: 'Verified', url: '#' },
    { id: 'd4', name: 'DOB Proof', status: 'Pending', url: '#' },
    { id: 'd5', name: 'Anti Ragging', status: 'Pending', url: '#' },
    { id: 'd6', name: 'Domicile', status: 'Verified', url: '#' },
  ]);

  const [previewDoc, setPreviewDoc] = useState(null);

  const application = {
    phase1: {
      Admission: [
        { label: 'Session', value: '2025-26', icon: BookOpen },
        { label: 'District', value: 'Kolkata', icon: MapPin },
        { label: 'College', value: 'George College', icon: Building2 },
        { label: 'Course Under By', value: 'BCA', icon: GraduationCap },
        { label: 'Admission Type', value: 'Regular', icon: User },
        { label: "Category", value: 'General', icon: Shield },
        { label: "Entrance Test", value: 'CET', icon: FileText },
        { label: "Course", value: 'BCA', icon: GraduationCap },
        { label: "Stream", value: 'BCA', icon: BookOpen },
        { label: "Entrance Rank", value: '1245', icon: Activity },
        { label: "Entrance Roll No", value: '1245', icon: FileText },
      ],
      personal: [
        { label: 'Student Name', value: 'Rahul Sharma', icon: User },
        { label: 'Sex', value: 'Male', icon: User },
        { label: 'Date of Birth', value: '15 May 2004', icon: Calendar },
        { label: 'Mobile', value: '+91 98765 43210', icon: Phone },
        { label: 'Email', value: 'rahul@gmail.com', icon: Mail },
        { label: "Father's Name", value: 'Suresh Sharma', icon: User },
        { label: "Mother's Name", value: 'Kavita Sharma', icon: User },
      ],
      identity: [
        { label: 'Residential Status', value: 'Only West Bengal', icon: MapPin },
        { label: 'Country', value: 'India', icon: Globe },
        { label: 'Nationality', value: 'Indian', icon: Globe },
        { label: 'Aadhaar No.', value: 'XXXX XXXX 1234', icon: Shield },
        { label: 'ABC / APAAR ID', value: 'ABC12345678', icon: Shield },
      ],
    },

    phase2: {
      additional: [
        { label: 'Student Name', value: 'Rahul Sharma', icon: User },
        { label: "Father's Name", value: 'Suresh Sharma', icon: User },
        { label: "Mother's Name", value: 'Kavita Sharma', icon: User },
        { label: 'DOB', value: '15 May 2004', icon: Calendar },
        { label: 'Category', value: 'General', icon: Shield },
        { label: 'Sex', value: 'Male', icon: User },
        { label: 'Blood Group', value: 'B+', icon: Activity },
        { label: 'Religion', value: 'Hindu', icon: Globe },
      ],

      guardian: [
        { label: 'Name', value: 'Suresh Sharma', icon: User },
        { label: 'Address', value: 'Kolkata', icon: MapPin },
        { label: 'Contact No', value: '9876543210', icon: Phone },
        { label: 'Relation', value: 'Father', icon: User },
      ],

      contact: [
        { label: 'Address', value: 'Howrah, WB', icon: MapPin },
        { label: 'Alt Mobile', value: '9123456780', icon: Phone },
        { label: 'Domicile', value: 'West Bengal', icon: MapPin },
        { label: 'State', value: 'West Bengal', icon: MapPin },
        { label: 'District', value: 'Howrah', icon: MapPin },
        { label: 'PIN', value: '711101', icon: MapPin },
      ],

      education: [
        { label: 'Exam Type', value: '12th', icon: BookOpen },
        { label: 'Board', value: 'WBCHSE', icon: Building2 },
        { label: 'Year', value: '2023', icon: Calendar },
        { label: 'Marks', value: '89%', icon: Activity },
        { label: 'Division', value: 'First', icon: Shield },
        { label: 'CGPA', value: '8.9', icon: Activity },
      ],
    }
  };

  const current = application[phase];

  const handleDocAction = (docId, newStatus) => {
    setDocs(prev => prev.map(d => d.id === docId ? { ...d, status: newStatus } : d));
    toast(`${newStatus} document`, newStatus === 'Verified' ? 'success' : 'error');
  };

  const handleAction = (type) => {
    const map = {
      approve: { status: 'Approved', msg: 'Application Approved', type: 'success' },
      reject: { status: 'Rejected', msg: 'Application Rejected', type: 'error' },
      correction: { status: 'Need Correction', msg: 'Correction request sent', type: 'warning' }
    };

    setAppStatus(map[type].status);
    toast && toast(map[type].msg, map[type].type);
  };

  const Section = ({ title, data, icon: TitleIcon }) => (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden animate-fade-in-up">
      <div className="px-6 py-4 border-b border-border bg-muted/50 flex items-center gap-3">
        {TitleIcon && <TitleIcon className="w-4 h-4 text-primary" />}
        <h2 className="text-sm font-bold text-text uppercase tracking-wider">{title}</h2>
      </div>
      <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
        {data.map((item) => (
          <div key={item.label} className="space-y-1">
            <p className="text-[10px] font-bold text-text/50 uppercase flex items-center gap-1.5">
              {item.icon && <item.icon className="w-3 h-3" />}
              {item.label}
            </p>
            <p className="font-semibold text-sm text-text">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="h-8 w-24 rounded-xl" />
        </div>
        <Skeleton className="h-12 w-48 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex gap-6 items-center">
          <Link to="/admin/applications" className="p-2.5 border border-border rounded-xl hover:bg-muted/50 transition-colors shadow-sm">
            <ArrowLeft className="w-5 h-5 text-text/60" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-text">Review Application</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm text-text/45 font-mono">{id}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                {application.phase1.Admission.find(i => i.label === 'Course')?.value || 'N/A'}
              </span>
            </div>
          </div>
        </div>
        <StatusPill status={appStatus} />
      </div>

      {/* 🔥 PHASE TOGGLE */}
      <div className="flex p-1 bg-muted/80 border border-border rounded-2xl w-fit shadow-inner">
        <button 
          onClick={() => setPhase('phase1')}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
            phase === 'phase1' 
            ? 'bg-card text-primary shadow-md border border-primary/25' 
            : 'text-text/55 hover:text-text'
          }`}
        >
          Phase I
        </button>
        <button 
          onClick={() => setPhase('phase2')}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
            phase === 'phase2' 
            ? 'bg-card text-primary shadow-md border border-primary/25' 
            : 'text-text/55 hover:text-text'
          }`}
        >
          Phase II
        </button>
      </div>

      {/* CONTENT */}
      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">

          {phase === 'phase1' && (
            <>
              <Section title="Admission Details" data={current.Admission} icon={BookOpen} />
              <Section title="Personal Information" data={current.personal} icon={User} />
              <Section title="Identity & Citizenship" data={current.identity} icon={Shield} />
            </>
          )}

          {phase === 'phase2' && (
            <>
              <Section title="Student Additional Info" data={current.additional} icon={User} />
              <Section title="Guardian Details" data={current.guardian} icon={Shield} />
              <Section title="Contact Details" data={current.contact} icon={MapPin} />
              <Section title="Education Details" data={current.education} icon={GraduationCap} />
            </>
          )}

        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-6">

          {phase === 'phase2' && (
            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden animate-fade-in-up">
              <div className="px-5 py-4 border-b border-border bg-muted/50">
                <h2 className="text-xs font-bold text-text uppercase tracking-wider flex items-center gap-2">
                  <File className="w-4 h-4 text-primary" />
                  Document Verification
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {docs.map(doc => (
                  <div key={doc.id} className="p-3.5 border border-border rounded-xl bg-muted/25 hover:bg-muted/40 transition-all group">
                    <div className="flex justify-between items-start mb-3">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-text truncate">{doc.name}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            doc.status === 'Verified' ? 'bg-green-500' : 
                            doc.status === 'Rejected' ? 'bg-red-500' : 'bg-yellow-500'
                          }`} />
                          <p className={`text-[10px] font-bold uppercase tracking-wider ${
                            doc.status === 'Verified' ? 'text-green-600' : 
                            doc.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'
                          }`}>
                            {doc.status}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setPreviewDoc(doc)}
                        className="p-2 bg-card border border-border rounded-lg shadow-sm hover:text-primary hover:border-primary transition-all group-hover:scale-105"
                        title="View Document"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleDocAction(doc.id, 'Verified')}
                        className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg border transition-all ${
                          doc.status === 'Verified' 
                          ? 'bg-green-500 border-green-500 text-white shadow-sm' 
                          : 'bg-card border-border text-text/60 hover:border-green-500/60 hover:text-success'
                        }`}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleDocAction(doc.id, 'Rejected')}
                        className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg border transition-all ${
                          doc.status === 'Rejected' 
                          ? 'bg-red-500 border-red-500 text-white shadow-sm' 
                          : 'bg-card border-border text-text/60 hover:border-red-500/60 hover:text-danger'
                        }`}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-border bg-muted/30">
                <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-card border border-border rounded-xl text-xs font-bold text-text hover:text-primary hover:border-primary/40 transition-all shadow-sm">
                  <Download className="w-3.5 h-3.5" />
                  Download Bundle (.zip)
                </button>
              </div>
            </div>
          )}

          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden animate-fade-in-up">
            <div className="px-5 py-4 border-b border-border bg-muted/50">
              <h2 className="text-xs font-bold text-text uppercase tracking-wider flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Final Decision
              </h2>
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-text/50 uppercase">Verification Comments</label>
                <textarea
                  value={comment}
                  onChange={(e)=>setComment(e.target.value)}
                  className="w-full border border-border rounded-xl p-3 text-sm focus:border-primary outline-none transition-colors resize-none bg-card text-text placeholder:text-text/45"
                  rows="4"
                  placeholder="Enter feedback for the student..."
                />
              </div>

              <div className="space-y-2">
                <button onClick={()=>handleAction('approve')}
                  className="w-full bg-green-500 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-green-600 transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Approve Application
                </button>

                <button onClick={()=>handleAction('correction')}
                  className="w-full bg-warning text-white py-2.5 rounded-xl font-bold text-sm hover:bg-warning/90 transition-all shadow-lg shadow-warning/20 flex items-center justify-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Request Correction
                </button>

                <div className="pt-2 border-t border-border mt-2">
                  <button onClick={()=>handleAction('reject')}
                    className="w-full bg-card border border-red-400/40 text-red-500 py-2.5 rounded-xl font-bold text-sm hover:bg-red-500/10 transition-all flex items-center justify-center gap-2">
                    <XCircle className="w-4 h-4" /> Reject Application
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 🔥 DOCUMENT PREVIEW MODAL */}
      {previewDoc && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in" onClick={() => setPreviewDoc(null)}>
          <div className="bg-card w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col animate-scale-in overflow-hidden border border-border mt-8 sm:mt-12" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-border flex justify-between items-center bg-muted/40">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <File className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-text text-lg">{previewDoc.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-text/50">Student: Rahul Sharma</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      previewDoc.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
                    }`}>
                      {previewDoc.status}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="p-2 hover:bg-muted/50 rounded-2xl transition-all">
                <XCircle className="w-8 h-8 text-text/40 hover:text-text/60" />
              </button>
            </div>
            
            <div className="flex-1 min-h-0 overflow-y-auto bg-background p-6 sm:p-12 flex flex-col items-center justify-start sm:justify-center">
              <div className="bg-card p-4 rounded-3xl shadow-xl border border-border w-full max-w-[260px] sm:max-w-[340px] aspect-[3/4] flex items-center justify-center relative group my-auto shrink-0">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-muted rounded-3xl flex items-center justify-center mx-auto border border-dashed border-border">
                    <File className="w-12 h-12 text-text/25" />
                  </div>
                  <div>
                    <p className="font-bold text-text/40 text-xl tracking-tight">Document Preview</p>
                    <p className="text-xs text-text/35 mt-1 uppercase font-bold tracking-widest italic">Simulation Mode</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border bg-muted/30 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => { handleDocAction(previewDoc.id, 'Verified'); setPreviewDoc(null); }}
                  className="flex-1 sm:flex-none px-8 py-3 bg-green-500 text-white rounded-2xl font-bold text-sm hover:bg-green-600 transition-all shadow-lg shadow-green-500/25 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> Approve Document
                </button>
                <button 
                  onClick={() => { handleDocAction(previewDoc.id, 'Rejected'); setPreviewDoc(null); }}
                  className="flex-1 sm:flex-none px-8 py-3 bg-red-500 text-white rounded-2xl font-bold text-sm hover:bg-red-600 transition-all shadow-lg shadow-red-500/25 flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" /> Reject Document
                </button>
              </div>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-2xl font-bold text-sm text-text/70 hover:bg-muted/50 transition-all">
                <Download className="w-4 h-4" /> Download Original
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
