import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, UploadCloud, Users, Clock,
  CheckSquare, User, Building2, Activity, BookOpen, Shield
} from 'lucide-react';

import LandingLayout from './components/layouts/LandingLayout';
import DashboardLayout from './components/layouts/DashboardLayout';
import { ToastProvider } from './components/ui/Toast';

import {
  LandingPage, LoginPage, RegisterPage, AdminLoginPage,
  StudentDashboard, ApplicationForm, StudentDocuments, ProfilePage,
  AdminDashboard, ApplicationsTable, ApplicationReview, StudentTable, AdminDocuments,
  SuperAdminDashboard, CollegesPage, SuperAdminStudents, SuperAdminLogs, // SuperAdminApplications, 
} from './pages';

const studentNav = [
  { name: 'Dashboard',   href: '/student',             icon: LayoutDashboard },
  { name: 'Phase-I Application', href: '/student/application', icon: FileText },
  { name: 'Phase-II Application',   href: '/student/documents',   icon: UploadCloud },
  { name: 'Profile',     href: '/student/profile',     icon: User },
];

const adminNav = [
  { name: 'Dashboard',    href: '/admin',              icon: LayoutDashboard },
  { name: 'Applications', href: '/admin/applications', icon: FileText },
  { name: 'Students',     href: '/admin/students',     icon: Users },
  { name: 'Documents',    href: '/admin/documents',    icon: UploadCloud },
];

const superAdminNav = [
  { name: 'Dashboard',    href: '/super-admin',                   icon: LayoutDashboard },
  { name: 'Colleges',     href: '/super-admin/colleges',          icon: Building2 },
  { name: 'Students',     href: '/super-admin/students',          icon: Users },
  // { name: 'Applications', href: '/super-admin/applications',      icon: FileText },
  { name: 'Logs',         href: '/super-admin/logs',              icon: Activity },
];

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route element={<LandingLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
          </Route>

          {/* Student Portal */}
          <Route path="/student" element={<DashboardLayout navigation={studentNav} title="Student Portal" role="student" />}>
            <Route index element={<StudentDashboard />} />
            <Route path="application" element={<ApplicationForm />} />
            <Route path="documents" element={<StudentDocuments />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Admin Panel */}
          <Route path="/admin" element={<DashboardLayout navigation={adminNav} title="Admin Panel" role="admin" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="applications" element={<ApplicationsTable />} />
            <Route path="applications/:id" element={<ApplicationReview />} />
            <Route path="students" element={<StudentTable />} />
            <Route path="documents" element={<AdminDocuments />} />
          </Route>

          {/* Super Admin */}
          <Route path="/super-admin" element={<DashboardLayout navigation={superAdminNav} title="Super Admin" role="superadmin" />}>
            <Route index element={<SuperAdminDashboard />} />
            <Route path="colleges" element={<CollegesPage />} />
            <Route path="students" element={<SuperAdminStudents />} />
            {/* <Route path="applications" element={<SuperAdminApplications />} /> */}
            <Route path="logs" element={<SuperAdminLogs />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
