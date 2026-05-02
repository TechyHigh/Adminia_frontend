import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import collegeImg from '../../assets/college.jpg';

export function RegisterPage() {
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
                    <h2 className="text-4xl font-bold text-white mb-4">Start Your Journey</h2>
                    <p className="text-lg text-gray-300">Create an account to submit and track your admission application effortlessly.</p>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-sm border border-border">
                    <div className="mb-8 text-center">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                            <UserPlus className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-text mb-2">Create Account</h2>
                        <p className="text-gray-500">Sign up to begin your application</p>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-medium text-text mb-1">Full Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text mb-1">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text mb-1">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text mb-1">Confirm</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <Link to="/login" className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-primary mt-2">
                            Create Account
                        </Link>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
