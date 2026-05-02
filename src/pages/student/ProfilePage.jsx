
import { User, Mail, Phone, MapPin, Shield, Camera } from 'lucide-react';

export function ProfilePage() {
  const user = {
    name: "Rahul Sharma",
    id: "CG27-001",
    email: "rahul.sharma@example.com",
    mobile: "+91 98765 43210",
    college: "George College",
    course: "BCA",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-text">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your personal information and account settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {user.name.charAt(0)}
              </div>
              <button className="absolute -bottom-1 -right-1 p-2 bg-white border border-border rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
                <Camera className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <h2 className="text-lg font-bold text-text">{user.name}</h2>
            <p className="text-xs text-gray-500 font-medium font-mono mt-1">{user.id}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-text mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> Account Security
            </h3>
            <button className="w-full text-left px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-2 rounded-xl text-sm font-medium text-danger hover:bg-danger/5 transition-colors mt-1">
              Logout from all devices
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-gray-50/50">
              <h3 className="text-sm font-bold text-text">Personal Details</h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: 'Full Name', value: user.name, icon: User },
                { label: 'Email Address', value: user.email, icon: Mail },
                { label: 'Mobile Number', value: user.mobile, icon: Phone },
                { label: 'College', value: user.college, icon: MapPin },
                { label: 'Applied Course', value: user.course, icon: Shield },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-xs text-gray-400 mb-1.5 flex items-center gap-1.5">
                    <item.icon className="w-3 h-3" /> {item.label}
                  </p>
                  <p className="text-sm font-semibold text-text">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-primary mb-2">Need to update information?</h3>
            <p className="text-xs text-primary/70 leading-relaxed mb-4">
              Some fields are locked after application submission. If you need to correct important details, please contact the administrative office.
            </p>
            <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
