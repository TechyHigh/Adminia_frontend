import {
  Search,
  Filter,
  Download,
  Eye,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "../../components/ui/Toast";

const DOC_KEYS = ["doc10th", "doc12th", "idProof", "photo"];

const DOC_LABELS = {
  doc10th: "10th",
  doc12th: "12th",
  idProof: "ID Proof",
  photo: "Photo",
};

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
  "Bachelor's Degree in Interior Design",
];

function StatusDot({ status }) {
  const cls = {
    Verified: "bg-green-500",
    Pending: "bg-yellow-400",
    Rejected: "bg-red-500",
  };
  return (
    <span className={`w-2 h-2 rounded-full mr-2 inline-block ${cls[status]}`} />
  );
}

export function AdminDocuments() {
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [docs] = useState([
    {
      id: "CG27-001",
      student: "Rahul Sharma",
      course: COURSES[0],
      doc10th: "Verified",
      doc12th: "Pending",
      idProof: "Pending",
      photo: "Rejected",
    },
    {
      id: "CG27-002",
      student: "Priya Singh",
      course: COURSES[1],
      doc10th: "Verified",
      doc12th: "Verified",
      idProof: "Verified",
      photo: "Verified",
    },
    {
      id: "CG27-003",
      student: "Amit Kumar",
      course: COURSES[2],
      doc10th: "Verified",
      doc12th: "Pending",
      idProof: "Pending",
      photo: "Pending",
    },
    {
      id: "CG27-004",
      student: "Sneha Das",
      course: COURSES[3],
      doc10th: "Verified",
      doc12th: "Verified",
      idProof: "Verified",
      photo: "Verified",
    },
    {
      id: "CG27-005",
      student: "Aditya Roy",
      course: COURSES[4],
      doc10th: "Verified",
      doc12th: "Pending",
      idProof: "Pending",
      photo: "Pending",
    },
    {
      id: "CG27-006",
      student: "Anjali Singh",
      course: COURSES[5],
      doc10th: "Verified",
      doc12th: "Verified",
      idProof: "Verified",
      photo: "Verified",
    },
    {
      id: "CG27-007",
      student: "Vikram Roy",
      course: COURSES[6],
      doc10th: "Verified",
      doc12th: "Pending",
      idProof: "Pending",
      photo: "Pending",
    },
    {
      id: "CG27-008",
      student: "Sonia Das",
      course: COURSES[7],
      doc10th: "Verified",
      doc12th: "Verified",
      idProof: "Verified",
      photo: "Verified",
    },
  ]);

  // ✅ FILTER LOGIC (PRECise)
  const filtered = docs.filter((d) => {
    const searchLower = search.toLowerCase();
    const matchSearch =
      d.student.toLowerCase().includes(searchLower) ||
      d.id.toLowerCase().includes(searchLower) ||
      d.course.toLowerCase().includes(searchLower);

    const matchCourse =
      selectedCourses.length === 0 ||
      selectedCourses.includes(d.course);

    return matchSearch && matchCourse;
  });

  const openModal = (row) => {
    setSelectedStudent(row);
    setShowModal(true);
  };

  // 🔥 BULK DOWNLOAD
  const handleBulkDownload = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/download-documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courses: selectedCourses,
        }),
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "documents.zip";
      a.click();
    } catch {
      toast("Download failed", "error");
    }
  };

  // 🔥 STUDENT DOWNLOAD
  const handleStudentDownload = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/download-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: selectedStudent.id,
        }),
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedStudent.id}.zip`;
      a.click();
    } catch {
      toast("Download failed", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-text">
          Document Verification
        </h1>
        <p className="text-gray-500 text-sm">
          Review and verify applicant uploaded documents.
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-card border border-border rounded-xl shadow-sm">
        <div className="p-4 flex justify-between relative">
          {/* SEARCH */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="pl-9 pr-4 py-2 border border-border rounded-xl w-full"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2">
            {/* ACTIVE FILTERS CLEAR */}
            {selectedCourses.length > 0 && (
              <button
                onClick={() => setSelectedCourses([])}
                className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" /> Clear ({selectedCourses.length})
              </button>
            )}

            {/* FILTER */}
            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-xl transition-colors ${
                  showFilter || selectedCourses.length > 0
                    ? "bg-blue-50 border-blue-200 text-blue-600"
                    : "hover:bg-gray-50"
                }`}
              >
                <Filter className="w-4 h-4" /> Filter
              </button>

              {showFilter && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-border rounded-2xl shadow-2xl z-30 animate-scale-in origin-top-right overflow-hidden">
                  <div className="p-3 border-b border-border bg-gray-50 flex justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase">
                      Filter by Course
                    </span>
                    <button onClick={() => setShowFilter(false)}>
                      <XCircle className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  <div className="max-h-64 overflow-y-auto p-2">
                    <button
                      onClick={() => setSelectedCourses([])}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 ${
                        selectedCourses.length === 0
                          ? "bg-blue-600 text-white font-bold"
                          : "hover:bg-gray-100 text-gray-600"
                      }`}
                    >
                      All Courses
                    </button>

                    {COURSES.map((course) => {
                      const isSelected = selectedCourses.includes(course);

                      return (
                        <button
                          key={course}
                          onClick={() =>
                            setSelectedCourses((prev) =>
                              isSelected
                                ? prev.filter((c) => c !== course)
                                : [...prev, course]
                            )
                          }
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm flex justify-between ${
                            isSelected
                              ? "bg-blue-600 text-white font-bold"
                              : "hover:bg-gray-100 text-gray-600"
                          }`}
                        >
                          {course}
                          {isSelected && "✓"}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* DOWNLOAD */}
            <button
              onClick={handleBulkDownload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl"
            >
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4">Student ID</th>
                <th>Student Name</th>
                <th>Course</th>
                <th>10th</th>
                <th>12th</th>
                <th>ID Proof</th>
                <th>Photo</th>
                <th className="text-right px-6">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{row.id}</td>
                  <td>{row.student}</td>
                  <td className="text-xs">{row.course}</td>

                  {DOC_KEYS.map((k) => (
                    <td key={k}>
                      <div className="flex items-center">
                        <StatusDot status={row[k]} />
                        {row[k]}
                      </div>
                    </td>
                  ))}

                  <td className="text-right px-6">
                    <button onClick={() => openModal(row)}>
                      <Eye />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-gray-400 text-sm"
                  >
                    No students found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && selectedStudent && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-6 rounded-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-4">
              <h2 className="font-bold">{selectedStudent.student}</h2>
              <button onClick={() => setShowModal(false)}>
                <XCircle />
              </button>
            </div>

            {DOC_KEYS.map((k) => (
              <div key={k} className="flex justify-between py-1">
                <span>{DOC_LABELS[k]}</span>
                <span>{selectedStudent[k]}</span>
              </div>
            ))}

            <button
              onClick={handleStudentDownload}
              className="mt-4 w-full border py-2 flex justify-center gap-2 rounded-lg"
            >
              <Download className="w-4 h-4" />
              Download All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}