import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import collegeImg from '../../assets/college.jpg';

export function AdminLoginPage() {
    return (
        <div className="min-h-[calc(100vh-72px)] flex">
            {/* Left side - Image/Illustration */}
            <div className="hidden lg:flex w-1/2 bg-black relative items-center justify-center overflow-hidden">
                {/* Background Image with low opacity */}
                <div
                    className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${collegeImg})` }}
                />

                {/* Optional dark gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0" />
                
                <div className="relative z-10 text-center px-12">
                    <h2 className="text-4xl font-bold text-white mb-4">Admin Portal Access</h2>
                    <p className="text-lg text-gray-300">Secure administration panel for managing admission processes.</p>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-sm border border-border">
                    <div className="mb-8 text-center">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-text mb-2">Admin Login</h2>
                        <p className="text-gray-500">Enter your credentials to access the admin dashboard</p>
                    </div>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-medium text-text mb-1">Admin Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400"
                                placeholder="admin@adminia.com"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-sm font-medium text-text">Password</label>
                            </div>
                            <input
                                type="password"
                                className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                Remember me
                            </label>
                        </div>

                        <Link to="/admin" className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            Login as Administrator
                        </Link>
                    </form>
                    
                    <p className="mt-8 text-center text-sm text-gray-600">
                        <Link to="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                            ← Back to Student Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
