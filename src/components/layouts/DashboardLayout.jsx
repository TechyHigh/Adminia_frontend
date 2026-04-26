import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, ChevronDown, LogOut, User, GraduationCap, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function DashboardLayout({ navigation, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();

  const isStudent    = title === 'Student Portal';
  const isSuperAdmin = title === 'Super Admin';

  const gradients = {
    'Student Portal': 'from-blue-600 to-indigo-600',
    'Admin Panel':    'from-indigo-600 to-purple-600',
    'Super Admin':    'from-purple-600 to-pink-600',
  };
  const gradient = gradients[title] || gradients['Admin Panel'];

  const userMeta = {
    'Student Portal': { name: 'Student Name',  email: 'student@example.com',       initials: 'S',  Icon: GraduationCap },
    'Admin Panel':    { name: 'College Admin',  email: 'admin@college.edu',          initials: 'A',  Icon: ShieldCheck },
    'Super Admin':    { name: 'Super Admin',    email: 'superadmin@adminia.in',      initials: 'SA', Icon: ShieldCheck },
  };
  const user = userMeta[title] || userMeta['Admin Panel'];

  const isActive = (item) => {
    const roots = ['/student', '/admin', '/super-admin', '/'];
    if (roots.includes(item.href)) return location.pathname === item.href;
    return location.pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-background flex font-sans text-text">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-card border-r border-border flex flex-col
        transform transition-transform duration-250 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Logo */}
        <div className="h-[68px] flex items-center px-5 border-b border-border justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm`}>
              <span className="text-white text-xs font-extrabold">A</span>
            </div>
            <span className="text-xl font-bold text-text tracking-tight">Adminia</span>
          </div>
          <button onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role pill */}
        <div className="mx-3 mt-3 px-4 py-2 rounded-xl bg-primary/5 border border-primary/10 shrink-0">
          <p className="text-[11px] font-bold text-primary uppercase tracking-widest">{title}</p>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-3 space-y-0.5 mt-1 overflow-y-auto">
          {navigation.map((item) => {
            if (item.name === 'Logout') return null;
            const active = isActive(item);
            const Icon   = item.icon;
            return (
              <Link key={item.name} to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group
                  ${active
                    ? 'bg-primary text-white shadow-sm shadow-primary/20'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-text'}`}>
                <Icon className={`w-[18px] h-[18px] shrink-0 transition-transform duration-150 ${active ? '' : 'group-hover:scale-110'}`} />
                {item.name}
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />}
              </Link>
            );
          })}
        </nav>

        {/* User card */}
        <div className="p-3 border-t border-border shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
              <span className="text-white text-xs font-bold">{user.initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
            <button onClick={() => navigate('/')}
              title="Logout"
              className="p-1.5 text-gray-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors shrink-0">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 lg:pl-[260px] flex flex-col min-h-screen min-w-0 w-0">

        {/* Top header */}
        <header className="h-[68px] bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">

          {/* Hamburger (mobile) */}
          <button onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-500 hover:text-text hover:bg-gray-100 rounded-xl transition-colors">
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop breadcrumb */}
          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
            <span className="font-semibold text-text">{title}</span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1.5 ml-auto">

            {/* Notification bell */}
            <button className="relative p-2.5 text-gray-500 hover:text-text hover:bg-gray-100 rounded-xl transition-colors">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger border-2 border-card" />
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button onClick={() => setProfileOpen(p => !p)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-gray-100 transition-colors">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
                  <span className="text-white text-xs font-bold">{user.initials}</span>
                </div>
                <span className="hidden sm:block text-sm font-medium text-text">{user.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-xl shadow-xl z-20 overflow-hidden animate-scale-in">
                    <div className="p-3 border-b border-border">
                      <p className="font-semibold text-sm text-text">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                    <div className="p-1">
                      <button className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-text rounded-lg transition-colors">
                        <User className="w-4 h-4" /> Profile Settings
                      </button>
                      <button onClick={() => navigate('/')}
                        className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-danger hover:bg-danger/5 rounded-lg transition-colors">
                        <LogOut className="w-4 h-4" /> Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 min-w-0 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
