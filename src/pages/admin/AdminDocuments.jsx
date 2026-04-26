import { Search, Filter, CheckCircle, XCircle, Download, Eye } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '../../components/ui/Toast';

const DOC_KEYS = ['doc10th', 'doc12th', 'idProof', 'photo'];
const DOC_LABELS = { doc10th: '10th Marksheet', doc12th: '12th Marksheet', idProof: 'ID Proof', photo: 'Passport Photo' };

function StatusDot({ status }) {
  const cls = { Verified: 'bg-green-500', Rejected: 'bg-red-500', Pending: 'bg-yellow-400' };
  return <span className={`inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0 ${cls[status] || cls.Pending}`} />;
}

export function AdminDocuments() {
  const toast = useToast();
  const [search, setSearch]               = useState('');
  const [showModal, setShowModal]         = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [docs, setDocs] = useState([
    { id: 'CG27-001', student: 'Rahul Sharma',   doc10th: 'Verified', doc12th: 'Pending',  idProof: 'Pending',  photo: 'Pending'  },
    { id: 'CG27-002', student: 'Priya Singh',    doc10th: 'Verified', doc12th: 'Verified', idProof: 'Verified', photo: 'Verified' },
    { id: 'CG27-003', student: 'Aditya Roy',     doc10th: 'Pending',  doc12th: 'Pending',  idProof: 'Pending',  photo: 'Pending'  },
    { id: 'CG27-004', student: 'Sneha Das',      doc10th: 'Verified', doc12th: 'Rejected', idProof: 'Verified', photo: 'Verified' },
  ]);

  const filtered = docs.filter(d =>
    d.student.toLowerCase().includes(search.toLowerCase()) ||
    d.id.toLowerCase().includes(search.toLowerCase())
  );

  const openReview = row => { setSelectedStudent({ ...row }); setShowModal(true); };

  const updateDocStatus = (key, status) => {
    setSelectedStudent(s => ({ ...s, [key]: status }));
    setDocs(d => d.map(r => r.id === selectedStudent.id ? { ...r, [key]: status } : r));
    toast && toast(`${DOC_LABELS[key]} marked as ${status}.`, status === 'Verified' ? 'success' : 'error');
  };

  const approveAll = () => {
    const updated = { ...selectedStudent };
    DOC_KEYS.forEach(k => { updated[k] = 'Verified'; });
    setSelectedStudent(updated);
    setDocs(d => d.map(r => r.id === selectedStudent.id ? updated : r));
    toast && toast('All documents approved.', 'success');
  };

  const rejectAll = () => {
    const updated = { ...selectedStudent };
    DOC_KEYS.forEach(k => { updated[k] = 'Rejected'; });
    setSelectedStudent(updated);
    setDocs(d => d.map(r => r.id === selectedStudent.id ? updated : r));
    toast && toast('All documents rejected.', 'error');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-text">Document Verification</h1>
        <p className="text-gray-500 mt-1 text-sm">Review and verify applicant uploaded documents.</p>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden animate-fade-in-up delay-100">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between gap-3">
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or ID..."
              className="pl-9 pr-4 py-2 border border-border rounded-xl outline-none focus:border-primary text-sm w-full transition-colors" />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-border">
              <tr>
                <th className="px-6 py-4">Student ID</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">10th</th>
                <th className="px-6 py-4">12th</th>
                <th className="px-6 py-4">ID Proof</th>
                <th className="px-6 py-4">Photo</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((row, i) => (
                <tr key={row.id} className="hover:bg-gray-50/70 transition-colors animate-fade-in"
                  style={{ animationDelay: `${i * 40}ms` }}>
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-text">{row.id}</td>
                  <td className="px-6 py-4 font-medium text-text">{row.student}</td>
                  {DOC_KEYS.map(k => (
                    <td key={k} className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <StatusDot status={row[k]} />{row[k]}
                      </div>
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openReview(row)}
                      className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modal ── */}
      {showModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl flex flex-col animate-scale-in">

            <div className="p-5 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-text">{selectedStudent.student}</h2>
                <p className="text-xs text-gray-400 font-mono mt-0.5">{selectedStudent.id}</p>
              </div>
              <button onClick={() => setShowModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              {DOC_KEYS.map(key => (
                <div key={key} className={`flex justify-between items-center p-4 rounded-xl border transition-colors ${selectedStudent[key] === 'Verified' ? 'bg-success/5 border-success/20' : selectedStudent[key] === 'Rejected' ? 'bg-danger/5 border-danger/20' : 'bg-gray-50 border-border'}`}>
                  <div>
                    <p className="font-semibold text-sm text-text">{DOC_LABELS[key]}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-0.5">
                      <StatusDot status={selectedStudent[key]} />
                      {selectedStudent[key]}
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Download">
                      <Download className="w-4 h-4 text-gray-500" />
                    </button>
                    <button onClick={() => updateDocStatus(key, 'Verified')}
                      className="p-2 hover:bg-green-100 text-green-600 rounded-lg transition-colors" title="Verify">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button onClick={() => updateDocStatus(key, 'Rejected')}
                      className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors" title="Reject">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border flex justify-between items-center">
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" /> Download All
              </button>
              <div className="flex gap-2">
                <button onClick={approveAll}
                  className="flex items-center gap-2 px-4 py-2 bg-success text-white rounded-xl text-sm font-semibold hover:bg-success/90 transition-colors shadow-sm">
                  <CheckCircle className="w-4 h-4" /> Approve All
                </button>
                <button onClick={rejectAll}
                  className="flex items-center gap-2 px-4 py-2 bg-danger text-white rounded-xl text-sm font-semibold hover:bg-danger/90 transition-colors shadow-sm">
                  <XCircle className="w-4 h-4" /> Reject All
                </button>
                <button onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
