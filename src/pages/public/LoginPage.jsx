import { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn, Eye, EyeOff, User, GraduationCap } from "lucide-react";
import collegeImg from "../../assets/college.jpg";

export function LoginPage() {
    const [role, setRole] = useState("student"); // student | admin
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-[calc(100vh-72px)] flex">
            {/* LEFT SIDE */}
            <div className="hidden lg:flex w-1/2 bg-black relative items-center justify-center overflow-hidden">
                {/* Background Image with low opacity */}
                <div
                    className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${collegeImg})` }}
                />

                {/* Optional dark gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0" />
                
                <div className="relative z-10 text-center px-12">
                    <h2 className="text-4xl font-bold text-white mb-4">Welcome Back to Adminia</h2>
                    <p className="text-lg text-gray-300">Access your dashboard to continue your admission process.</p>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-6">
                <div className="w-full max-w-md bg-gradient-to-br from-cyan-200 to-blue-200 p-8 rounded-3xl shadow-xl">
                    
                    {/* TITLE */}
                    <h2 className="text-2xl font-semibold text-center mb-6">
                        Log in as {role === "student" ? "Student" : "Admin"}
                    </h2>

                    {/* TOGGLE BUTTON */}
                    <div className="flex bg-white rounded-xl p-1 mb-6 shadow-inner">
                        <button
                            onClick={() => setRole("student")}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition ${
                                role === "student"
                                    ? "bg-blue-600 text-white shadow"
                                    : "text-gray-500"
                            }`}
                        >
                            <GraduationCap size={16} />
                            Student Portal
                        </button>

                        <button
                            onClick={() => setRole("admin")}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition ${
                                role === "admin"
                                    ? "bg-blue-600 text-white shadow"
                                    : "text-gray-500"
                            }`}
                        >
                            <User size={16} />
                            Admin Portal
                        </button>
                    </div>

                    {/* FORM */}
                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        
                        {/* EMAIL */}
                        <div>
                            <label className="text-sm font-medium block mb-1">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                                />
                                <User className="absolute right-3 top-2.5 text-gray-400" size={18} />
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="text-sm font-medium block mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* REMEMBER */}
                        <div className="flex items-center text-sm">
                            <input type="checkbox" className="mr-2" />
                            Remember me
                        </div>

                        {/* LOGIN BUTTON */}
                        <Link
                            to={role === "student" ? "/student" : "/admin"}
                            className="w-full flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:opacity-90 transition"
                        >
                            <LogIn className="mr-2" size={18} />
                            Login
                        </Link>
                    </form>

                    {/* FOOTER */}
                    {/* <p className="text-center text-sm mt-6">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-blue-600 font-semibold">
                            Register
                        </Link>
                    </p> */}
                </div>
            </div>
        </div>
    );
}