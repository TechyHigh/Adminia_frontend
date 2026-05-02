import { useState } from 'react';
import { Check, ChevronRight, Upload, File, Send, AlertCircle, Lock, CheckCircle, RefreshCcw } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

// ── Phase-II is locked unless Phase-I is approved ──
const PHASE1_APPROVED = true;

const STEPS = [
  { id: 1, name: 'Personal Info' },
  { id: 2, name: 'Guardian & Contact' },
  { id: 3, name: 'Educational' },
  { id: 4, name: 'Uploads' },
  { id: 5, name: 'Review' },
];

const inputCls  = 'w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm bg-white';
const selectCls = inputCls + ' cursor-pointer';

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-text mb-1.5">
        {label}{required && <span className="text-danger ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function FileUploadCard({ label, hint, required, uploaded, onUpload }) {
  return (
    <div className={`border rounded-xl p-4 transition-all ${uploaded ? 'border-success/40 bg-success/5' : 'border-border bg-white'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg ${uploaded ? 'bg-success/10' : 'bg-gray-100'}`}>
            <File className={`w-4 h-4 ${uploaded ? 'text-success' : 'text-gray-400'}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-text">{label}</p>
            {required && <span className="text-xs text-danger">Required</span>}
            {!required && <span className="text-xs text-gray-400">Optional</span>}
          </div>
        </div>
        {uploaded && <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />}
      </div>
      <p className="text-xs text-gray-400 mb-3">{hint}</p>
      {!uploaded ? (
        <button type="button" onClick={onUpload}
          className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all text-sm text-gray-500 font-medium flex items-center justify-center gap-2">
          <Upload className="w-4 h-4" /> Click to Upload
        </button>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-xs text-success font-semibold">Uploaded ✓</span>
          <button type="button" onClick={onUpload}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors">
            <RefreshCcw className="w-3 h-3" /> Replace
          </button>
        </div>
      )}
    </div>
  );
}

export function StudentDocuments() {
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const toast = useToast();

  const [form, setForm] = useState({
    // Step 1 – Student's Additional Information
    studentName: '', fatherName: '', motherName: '', dob: '',
    category: '', sex: '', bloodGroup: '', religion: '',
    
    // Step 2 – Guardian & Contact Details
    guardianName: '', guardianAddress: '', guardianContact: '', guardianRelation: '',
    studentAddress: '', alternativeMobile: '', domicileType: '',
    state: '', district: '', pin: '',
    
    // Step 3 – Educational Details
    examType: '', examName: '', passingYear: '', regNo: '', board: '',
    marksObtained: '', marks12th: '', classDivision: '', dgpaCgpa: '',
  });

  const [uploads, setUploads] = useState({
    finalMarksheet: false,
    photo: false,
    signature: false,
    dobProof: false,
    antiRagging: false,
    domicileDoc: false,
  });

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const upload = key => () => {
    setUploads(u => ({ ...u, [key]: true }));
    toast && toast('File uploaded successfully.', 'success');
  };

  const handleNext = e => { e.preventDefault(); setStep(s => Math.min(s + 1, 5)); window.scrollTo(0, 0); };
  const handleBack = () => { setStep(s => Math.max(s - 1, 1)); window.scrollTo(0, 0); };

  const requiredUploads = ['finalMarksheet', 'photo', 'signature', 'dobProof', 'antiRagging', 'domicileDoc'];
  const allRequiredUploaded = requiredUploads.every(k => uploads[k]);

  const handleConfirm = () => {
    if (!allRequiredUploaded) {
      toast && toast('Please upload all required documents before confirming.', 'warning');
      return;
    }
    setConfirmed(true);
    toast && toast('Phase-II submitted! Admission confirmed.', 'success', 'Confirmed 🎉');
  };

  // ── Locked State ──
  if (!PHASE1_APPROVED) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
          <Lock className="w-9 h-9 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-text mb-2">Phase-II Locked</h2>
        <p className="text-gray-500 text-sm max-w-xs mx-auto">Phase-II documentation is only available after your Phase-I application is approved by the college admin.</p>
      </div>
    );
  }

  // ── Confirmed State ──
  if (confirmed) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center animate-scale-in">
        <div className="w-20 h-20 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-text mb-2">Admission Confirmed! 🎉</h2>
        <p className="text-gray-500 text-sm">Welcome to <span className="font-semibold text-text">133/George College</span>. Your Phase-II documentation is complete.</p>
        <div className="mt-6 p-5 bg-success/5 border border-success/20 rounded-2xl text-sm text-success font-medium">
          Check your registered email for the admission letter and further instructions.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-semibold border border-success/20 mb-3">
          <Check className="w-3.5 h-3.5" /> Phase-I Approved — Proceed to Phase-II
        </div>
        <h1 className="text-2xl font-bold text-text">Phase-II Documentation</h1>
        <p className="text-gray-500 mt-1 text-sm">Submit your final documents and academic details to confirm your admission.</p>
      </div>

      {/* Stepper */}
      <div className="bg-card border border-border p-4 rounded-xl shadow-sm overflow-x-auto">
        <div className="flex items-center min-w-max gap-1 px-1">
          {STEPS.map((s, i) => {
            const done    = step > s.id;
            const current = step === s.id;
            return (
              <div key={s.id} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${done ? 'bg-success text-white' : current ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {done ? <Check className="w-4 h-4" /> : s.id}
                  </div>
                  <span className={`text-sm font-semibold whitespace-nowrap ${current ? 'text-primary' : done ? 'text-text' : 'text-gray-400'}`}>
                    {s.name}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <ChevronRight className={`w-5 h-5 mx-3 flex-shrink-0 ${done ? 'text-success' : 'text-gray-300'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-sm animate-scale-in">
        <form onSubmit={handleNext}>

          {/* ── Step 1: Student's Additional Information ── */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-lg font-bold text-text border-b border-border pb-3">Student's Additional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Student Name" required>
                  <input className={inputCls} value={form.studentName} onChange={set('studentName')} placeholder="Full Name" />
                </Field>
                <Field label="Father's Name" required>
                  <input className={inputCls} value={form.fatherName} onChange={set('fatherName')} placeholder="Father's Full Name" />
                </Field>
                <Field label="Mother's Name" required>
                  <input className={inputCls} value={form.motherName} onChange={set('motherName')} placeholder="Mother's Full Name" />
                </Field>
                <Field label="Date of Birth" required>
                  <input type="date" className={inputCls} value={form.dob} onChange={set('dob')} />
                </Field>
                <Field label="Category" required>
                  <select className={selectCls} value={form.category} onChange={set('category')}>
                    <option value="">Select Category</option>
                    <option>General</option><option>SC</option><option>ST</option><option>OBC-A</option><option>OBC-B</option>
                  </select>
                </Field>
                <Field label="Sex" required>
                  <select className={selectCls} value={form.sex} onChange={set('sex')}>
                    <option value="">Select Sex</option>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </Field>
                <Field label="Blood Group" required>
                  <select className={selectCls} value={form.bloodGroup} onChange={set('bloodGroup')}>
                    <option value="">Select Blood Group</option>
                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                  </select>
                </Field>
                <Field label="Religion" required>
                  <input className={inputCls} value={form.religion} onChange={set('religion')} placeholder="e.g. Hinduism, Islam" />
                </Field>
              </div>
            </div>
          )}

          {/* ── Step 2: Guardian & Contact Details ── */}
          {step === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-lg font-bold text-text border-b border-border pb-3 mb-5">Guardian's Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Guardian Name" required>
                    <input className={inputCls} value={form.guardianName} onChange={set('guardianName')} placeholder="Full Name" />
                  </Field>
                  <Field label="Relation with Student" required>
                    <input className={inputCls} value={form.guardianRelation} onChange={set('guardianRelation')} placeholder="e.g. Father, Mother" />
                  </Field>
                  <Field label="Contact No" required>
                    <input className={inputCls} value={form.guardianContact} onChange={set('guardianContact')} placeholder="10-digit Mobile No" />
                  </Field>
                  <Field label="Guardian Address" required>
                    <textarea className={inputCls + ' h-24 resize-none'} value={form.guardianAddress} onChange={set('guardianAddress')} placeholder="Full Address" />
                  </Field>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-text border-b border-border pb-3 mb-5">Student's Contact Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Student Address" required>
                    <textarea className={inputCls + ' h-24 resize-none'} value={form.studentAddress} onChange={set('studentAddress')} placeholder="Full Permanent Address" />
                  </Field>
                  <Field label="Alternative Mobile" required>
                    <input className={inputCls} value={form.alternativeMobile} onChange={set('alternativeMobile')} placeholder="Alternative Contact No" />
                  </Field>
                  <Field label="Domicile Type" required>
                    <select className={selectCls} value={form.domicileType} onChange={set('domicileType')}>
                      <option value="">Select Type</option>
                      <option>West Bengal</option><option>Other State</option>
                    </select>
                  </Field>
                  <Field label="State" required>
                    <input className={inputCls} value={form.state} onChange={set('state')} placeholder="e.g. West Bengal" />
                  </Field>
                  <Field label="District" required>
                    <input className={inputCls} value={form.district} onChange={set('district')} placeholder="Enter District" />
                  </Field>
                  <Field label="PIN Code" required>
                    <input className={inputCls} value={form.pin} onChange={set('pin')} placeholder="6-digit PIN" maxLength={6} />
                  </Field>
                </div>
              </div>
            </div>
          )}

          {/* ── Step 3: Educational Details ── */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-lg font-bold text-text border-b border-border pb-3">Educational Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Examination Type" required>
                  <select className={selectCls} value={form.examType} onChange={set('examType')}>
                    <option value="">Select Type</option>
                    <option>Regular</option><option>Distance</option><option>Vocational</option>
                  </select>
                </Field>
                <Field label="Examination Name" required>
                  <input className={inputCls} value={form.examName} onChange={set('examName')} placeholder="e.g. Higher Secondary" />
                </Field>
                <Field label="Passing Year" required>
                  <input className={inputCls} value={form.passingYear} onChange={set('passingYear')} placeholder="YYYY" maxLength={4} />
                </Field>
                <Field label="Registration No." required>
                  <input className={inputCls} value={form.regNo} onChange={set('regNo')} placeholder="Enter Registration No" />
                </Field>
                <Field label="Board / Council" required>
                  <input className={inputCls} value={form.board} onChange={set('board')} placeholder="e.g. WBCHSE, CBSE" />
                </Field>
                <Field label="Marks Obtained" required>
                  <input className={inputCls} value={form.marksObtained} onChange={set('marksObtained')} placeholder="Total Marks" />
                </Field>
                <Field label="Marks Entry of 12th" required>
                  <input className={inputCls} value={form.marks12th} onChange={set('marks12th')} placeholder="e.g. 450/500" />
                </Field>
                <Field label="Class / Division" required>
                  <select className={selectCls} value={form.classDivision} onChange={set('classDivision')}>
                    <option value="">Select Division</option>
                    <option>1st Division</option><option>2nd Division</option><option>3rd Division</option>
                  </select>
                </Field>
                <Field label="DGPA / CGPA" required>
                  <input className={inputCls} value={form.dgpaCgpa} onChange={set('dgpaCgpa')} placeholder="e.g. 8.5" />
                </Field>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-bold text-text mb-4">Final Marksheet / Certificate</h3>
                <FileUploadCard 
                  label="Upload Certificate/Final Marksheet" 
                  hint="Supported file: PDF. Max 1 MB." 
                  required 
                  uploaded={uploads.finalMarksheet} 
                  onUpload={upload('finalMarksheet')} 
                />
              </div>
            </div>
          )}

          {/* ── Step 4: Documents Upload ── */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-lg font-bold text-text border-b border-border pb-3">Documents Upload</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUploadCard 
                  label="Photo of Student" 
                  hint="Supported file: image. Max 1 MB." 
                  required 
                  uploaded={uploads.photo} 
                  onUpload={upload('photo')} 
                />
                <FileUploadCard 
                  label="Signature of Student" 
                  hint="Supported file: image. Max 1 MB." 
                  required 
                  uploaded={uploads.signature} 
                  onUpload={upload('signature')} 
                />
                <FileUploadCard 
                  label="DOB Proof" 
                  hint="Supported file: PDF. Max 1 MB." 
                  required 
                  uploaded={uploads.dobProof} 
                  onUpload={upload('dobProof')} 
                />
                <FileUploadCard 
                  label="Anti Ragging Declaration" 
                  hint="FORMS TO BE DOWNLOADED FROM antiragging.in. PDF. Max 1 MB." 
                  required 
                  uploaded={uploads.antiRagging} 
                  onUpload={upload('antiRagging')} 
                />
                <FileUploadCard 
                  label="Domicile Document" 
                  hint="Supported file: PDF. Max 1 MB." 
                  required 
                  uploaded={uploads.domicileDoc} 
                  onUpload={upload('domicileDoc')} 
                />
              </div>
            </div>
          )}

          {/* ── Step 5: Review & Confirm ── */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-lg font-bold text-text border-b border-border pb-3">Review & Confirm</h2>

              <div className="bg-warning/5 border border-warning/20 rounded-xl p-4 flex gap-3 text-sm">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <p className="text-gray-600">Please review all your information carefully. Clicking <strong>Confirm Admission</strong> will complete your Phase-II submission.</p>
              </div>

              {/* Personal Info Review */}
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 border-b border-border">
                  <h3 className="font-semibold text-text text-sm">Personal Information</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 p-5">
                  {[
                    ['Student Name', form.studentName], ['Father\'s Name', form.fatherName], ['Mother\'s Name', form.motherName],
                    ['DOB', form.dob], ['Category', form.category], ['Sex', form.sex],
                    ['Blood Group', form.bloodGroup], ['Religion', form.religion],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-text">{val || <span className="text-gray-300 font-normal">—</span>}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Educational Review */}
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 border-b border-border">
                  <h3 className="font-semibold text-text text-sm">Educational Details</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 p-5">
                  {[
                    ['Exam Type', form.examType], ['Exam Name', form.examName], ['Passing Year', form.passingYear],
                    ['Reg No', form.regNo], ['Board', form.board], ['Marks Obtained', form.marksObtained],
                    ['12th Marks', form.marks12th], ['Division', form.classDivision], ['DGPA/CGPA', form.dgpaCgpa],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-text">{val || <span className="text-gray-300 font-normal">—</span>}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents status */}
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 border-b border-border">
                  <h3 className="font-semibold text-text text-sm">Document Status</h3>
                </div>
                <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    ['Final Marksheet', uploads.finalMarksheet],
                    ['Photo', uploads.photo],
                    ['Signature', uploads.signature],
                    ['DOB Proof', uploads.dobProof],
                    ['Anti Ragging', uploads.antiRagging],
                    ['Domicile Doc', uploads.domicileDoc],
                  ].map(([label, done]) => (
                    <div key={label} className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium ${done ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                      {done ? <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" /> : <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />}
                      <span className="truncate">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {!allRequiredUploaded && (
                <div className="bg-danger/5 border border-danger/20 rounded-xl p-4 text-sm text-danger font-medium flex gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  Please complete all required document uploads before confirming.
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center pt-7 mt-6 border-t border-border gap-3">
            <button type="button" onClick={handleBack}
              disabled={step === 1}
              className="px-6 py-2.5 rounded-xl border border-border text-sm font-semibold text-text hover:bg-gray-50 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2">
              Back
            </button>
            
            {step < 5 ? (
              <button type="submit"
                className="px-8 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button type="button" onClick={handleConfirm}
                className="px-8 py-2.5 rounded-xl bg-success text-white text-sm font-bold hover:bg-success-dark shadow-lg shadow-success/20 transition-all flex items-center gap-2">
                Confirm Admission <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
