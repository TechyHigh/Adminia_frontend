import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, File, CheckCircle, XCircle,
  Download, ExternalLink, AlertTriangle, User, BookOpen
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

function StatusPill({ status }) {
  const map = {
    'Under Review': 'bg-blue-100 text-blue-700 border-blue-200',
    Approved: 'bg-green-100 text-green-700 border-green-200',
    Rejected: 'bg-red-100 text-red-700 border-red-200',
    'Need Correction': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  };

  return (
    <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${map[status]}`}>
      {status}
    </span>
  );
}

export function ApplicationReview() {
  const { id } = useParams();
  const [phase, setPhase] = useState('phase1');
  const [appStatus, setAppStatus] = useState('Under Review');
  const [comment, setComment] = useState('');
  const toast = useToast();

  // 🔥 REAL DATA STRUCTURE BASED ON YOUR FORMS
  const application = {
    phase1: {
      Admission: [
        { label: 'Session', value: '2025-26' },
        { label: 'District', value: 'Kolkata' },
        { label: 'College', value: 'George College' },
        { label: 'Course Under By', value: 'BCA' },
        { label: 'Admission Type', value: 'Regular' },
        { label: "Category", value: 'General' },
        { label: "Entrance Test", value: 'CET' },
        { label: "Course", value: 'BCA' },
        { label: "Stream", value: 'BCA' },
        { label: "Entrance Rank", value: '1245' },
        { label: "Entrance Roll No", value: '1245' },
      ],
      personal: [
        { label: 'Student Name', value: 'Rahul Sharma' },
        { label: 'Sex', value: 'Male' },
        { label: 'Date of Birth', value: '15 May 2004' },
        { label: 'Mobile', value: '+91 98765 43210' },
        { label: 'Email', value: 'rahul@gmail.com' },
        { label: "Father's Name", value: 'Suresh Sharma' },
        { label: "Mother's Name", value: 'Kavita Sharma' },
      ],
      identity: [
        { label: 'Residential Status', value: 'Only West Bengal' },
        { label: 'Country', value: 'India' },
        { label: 'Nationality', value: 'Indian' },
        { label: 'Aadhaar No.', value: 'XXXX XXXX 1234' },
        { label: 'ABC / APAAR ID', value: 'ABC12345678' },
      ],
      // admission: [
      //   { label: 'Session', value: '2025-26' },
      //   { label: 'Course', value: 'BCA' },
      //   { label: 'Stream', value: 'BCA' },
      //   { label: 'Entrance Test', value: 'CET' },
      //   { label: 'Entrance Rank', value: '1245' },
      // ]
    },

    phase2: {
      additional: [
        { label: 'Student Name', value: 'Rahul Sharma' },
        { label: "Father's Name", value: 'Suresh Sharma' },
        { label: "Mother's Name", value: 'Kavita Sharma' },
        { label: 'DOB', value: '15 May 2004' },
        { label: 'Category', value: 'General' },
        { label: 'Sex', value: 'Male' },
        { label: 'Blood Group', value: 'B+' },
        { label: 'Religion', value: 'Hindu' },
      ],

      guardian: [
        { label: 'Name', value: 'Suresh Sharma' },
        { label: 'Address', value: 'Kolkata' },
        { label: 'Contact No', value: '9876543210' },
        { label: 'Relation', value: 'Father' },
      ],

      contact: [
        { label: 'Address', value: 'Howrah, WB' },
        { label: 'Alt Mobile', value: '9123456780' },
        { label: 'Domicile', value: 'West Bengal' },
        { label: 'State', value: 'West Bengal' },
        { label: 'District', value: 'Howrah' },
        { label: 'PIN', value: '711101' },
      ],

      education: [
        { label: 'Exam Type', value: '12th' },
        { label: 'Board', value: 'WBCHSE' },
        { label: 'Year', value: '2023' },
        { label: 'Marks', value: '89%' },
        { label: 'Division', value: 'First' },
        { label: 'CGPA', value: '8.9' },
      ],

      documents: [
        { name: 'Final Marksheet', status: 'Verified' },
        { name: 'Photo', status: 'Verified' },
        { name: 'Signature', status: 'Verified' },
        { name: 'DOB Proof', status: 'Pending' },
        { name: 'Anti Ragging', status: 'Pending' },
        { name: 'Domicile', status: 'Verified' },
      ]
    }
  };

  const current = application[phase];

  const handleAction = (type) => {
    const map = {
      approve: { status: 'Approved', msg: 'Approved', type: 'success' },
      reject: { status: 'Rejected', msg: 'Rejected', type: 'error' },
      correction: { status: 'Need Correction', msg: 'Correction sent', type: 'warning' }
    };

    setAppStatus(map[type].status);
    toast && toast(map[type].msg, map[type].type);
  };

  const Section = ({ title, data }) => (
    <div className="bg-card border rounded-xl p-6">
      <h2 className="font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.label}>
            <p className="text-xs text-gray-400">{item.label}</p>
            <p className="font-semibold text-sm">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link to="/admin/applications" className="p-2 border rounded-xl">
            <ArrowLeft className="w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Review Application</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm text-gray-400 font-mono">{id}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                {application.phase1.Admission.find(i => i.label === 'Course')?.value || 'N/A'}
              </span>
            </div>
          </div>
        </div>
        <StatusPill status={appStatus} />
      </div>

      {/* 🔥 PHASE TOGGLE */}
      <div className="flex gap-3">
        <button onClick={() => setPhase('phase1')}
          className={`px-4 py-2 rounded-xl ${phase==='phase1'?'bg-primary text-white':'border'}`}>
          Phase I
        </button>
        <button onClick={() => setPhase('phase2')}
          className={`px-4 py-2 rounded-xl ${phase==='phase2'?'bg-primary text-white':'border'}`}>
          Phase II
        </button>
      </div>

      {/* CONTENT */}
      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">

          {phase === 'phase1' && (
            <>
              <Section title="Admission Details" data={current.Admission} />
              <Section title="Personal Information" data={current.personal} />
              <Section title="Identity & Citizenship" data={current.identity} />
              {/* <Section title="Admission Details" data={current.admission} /> */}
            </>
          )}

          {phase === 'phase2' && (
            <>
              <Section title="Student Additional Info" data={current.additional} />
              <Section title="Guardian Details" data={current.guardian} />
              <Section title="Contact Details" data={current.contact} />
              <Section title="Education Details" data={current.education} />
            </>
          )}

        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-6">

          {phase === 'phase2' && (
            <div className="bg-card border rounded-xl p-5">
              <h2 className="font-bold mb-4">Documents</h2>
              {current.documents.map(doc => (
                <div key={doc.name} className="flex justify-between mb-2">
                  <span>{doc.name}</span>
                  {doc.status === 'Verified'
                    ? <CheckCircle className="text-green-500 w-4" />
                    : <span className="text-yellow-600 text-xs">Pending</span>}
                </div>
              ))}
            </div>
          )}

          <div className="bg-card border rounded-xl p-5">
            <h2 className="font-bold mb-4">Final Decision</h2>

            <textarea
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
              className="w-full border rounded p-2 mb-3"
              placeholder="Comments..."
            />

            <button onClick={()=>handleAction('approve')}
              className="w-full bg-green-500 text-white py-2 rounded mb-2">
              Approve
            </button>

            <button onClick={()=>handleAction('correction')}
              className="w-full bg-yellow-500 text-white py-2 rounded mb-2">
              Correction
            </button>

            <button onClick={()=>handleAction('reject')}
              className="w-full bg-red-500 text-white py-2 rounded">
              Reject
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
