import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Leaf, 
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  LogIn,
  Github,
  Twitter,
  Facebook,
  User,
  Zap,
  Star
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Form validation schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [hoveredField, setHoveredField] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [showDemoLogin, setShowDemoLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Get the redirect path from location state or default to home
  const from = location.state?.from?.pathname || "/";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Track mouse movement for 3D effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Check for remembered credentials on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      form.setValue("email", rememberedEmail);
      setRememberMe(true);
    }
  }, [form]);

  // Handle password change
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    form.setValue("password", password);
  };

  // Handle social login
  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    // Simulate social login
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", `user@${provider}.com`);
      setSuccess(`Logged in with ${provider}! Redirecting...`);
      setTimeout(() => navigate(from, { replace: true }), 1500);
      setIsLoading(false);
    }, 1500);
  };

  // Handle demo login
  const handleDemoLogin = () => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    // Simulate demo login
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", "demo@planthub.com");
      setSuccess("Logged in with demo account! Redirecting...");
      setTimeout(() => navigate(from, { replace: true }), 1500);
      setIsLoading(false);
    }, 1500);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any valid email/password combination
      // In a real app, you would validate against your backend
      if (data.email && data.password) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", data.email);
        
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", data.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => navigate(from, { replace: true }), 1500);
      } else {
        setError("Please enter both email and password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate 3D tilt effect based on mouse position
  const calculateTilt = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const tiltX = (mousePosition.y - centerY) / 20;
    const tiltY = (centerX - mousePosition.x) / 20;
    return { x: tiltX, y: tiltY };
  };

  const tilt = calculateTilt();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden flex items-center justify-center px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Animated grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />
        
        {/* Floating particles */}
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-yellow-400/50"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          >
            <Star className="w-3 h-3" />
          </motion.div>
        ))}

        {/* Animated lightning */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`lightning-${i}`}
            className="absolute text-blue-400/30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              rotate: Math.random() * 360,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 3,
              ease: "easeInOut",
            }}
          >
            <Zap className="w-6 h-6" />
          </motion.div>
        ))}

        {/* Animated plant elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`plant-${i}`}
            className="absolute text-emerald-400/30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              scale: 0.5 + Math.random() * 0.5,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: -50,
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut",
            }}
          >
            <Leaf className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      {/* Login form container with 3D tilt effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          rotateX: tilt.x,
          rotateY: tilt.y,
          perspective: 1000,
        }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 10
        }}
        className="relative z-10 w-full max-w-md"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
          {/* Enhanced glow effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-purple-500/10 animate-pulse"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 via-emerald-400/20 to-emerald-500/30 blur-xl opacity-70"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-transparent to-purple-500/20 blur-2xl opacity-50"></div>
          
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-purple-500/5 rounded-2xl"></div>
          
          {/* Animated border glow */}
          <motion.div 
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(90deg, rgba(16,185,129,0.3), rgba(139,92,246,0.3), rgba(16,185,129,0.3))",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Logo and title */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8 relative z-10"
          >
            <motion.div
              className="inline-block mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Leaf className="w-12 h-12 text-emerald-400 mx-auto drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </motion.div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white mb-2 relative"
            >
              <span className="relative z-10 drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">Welcome Back</span>
              <span className="absolute inset-0 blur-sm text-emerald-400/50 z-0">Welcome Back</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-emerald-200/70"
            >
              Sign in to continue your journey
            </motion.p>
          </motion.div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
                onHoverStart={() => setHoveredField('email')}
                onHoverEnd={() => setHoveredField(null)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white drop-shadow-[0_0_1px_rgba(255,255,255,0.5)]">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type="email"
                            className="bg-white/5 border-white/20 text-white pl-10 relative overflow-hidden"
                            placeholder="Enter your email"
                            style={{ boxShadow: "0 0 10px 2px rgba(16, 185, 129, 0.3)" }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5 shimmer"></div>
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400/70 w-5 h-5 drop-shadow-[0_0_2px_rgba(16,185,129,0.5)]" />
                          {hoveredField === 'email' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              <Sparkles className="w-4 h-4 text-emerald-400/50 drop-shadow-[0_0_3px_rgba(16,185,129,0.7)]" />
                            </motion.div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
                onHoverStart={() => setHoveredField('password')}
                onHoverEnd={() => setHoveredField(null)}
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white drop-shadow-[0_0_1px_rgba(255,255,255,0.5)]">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className="bg-white/5 border-white/20 text-white pl-10 relative overflow-hidden"
                            placeholder="Enter your password"
                            style={{ boxShadow: "0 0 10px 2px rgba(16, 185, 129, 0.3)" }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5 shimmer"></div>
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400/70 w-5 h-5 drop-shadow-[0_0_2px_rgba(16,185,129,0.5)]" />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-400/70 hover:text-emerald-400 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                          {hoveredField === 'password' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute right-10 top-1/2 transform -translate-y-1/2"
                            >
                              <Sparkles className="w-4 h-4 text-emerald-400/50 drop-shadow-[0_0_3px_rgba(16,185,129,0.7)]" />
                            </motion.div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Remember me and forgot password */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-between"
              >
                <label className="flex items-center space-x-2 text-emerald-200/70">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="form-checkbox h-4 w-4 text-emerald-500 rounded border-emerald-500/20 bg-white/5 relative z-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-transparent to-emerald-400/10 animate-shimmer rounded"></div>
                  </div>
                  <span>Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors relative group"
                >
                  Forgot password?
                  <motion.span
                    className="absolute -inset-1 bg-emerald-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2 }}
                  />
                </Link>
              </motion.div>

              {/* Submit button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-2 rounded-lg transition-all duration-300 relative overflow-hidden"
                  style={{ boxShadow: "0 0 15px 3px rgba(16, 185, 129, 0.5)" }}
                  disabled={isLoading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-transparent to-emerald-400/20 shimmer"></div>
                  <span className="relative z-10 drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      </motion.div>
                    ) : (
                      "Sign In"
                    )}
                  </span>
                </Button>
              </motion.div>
              
              {/* Social login buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="space-y-4"
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-emerald-500/30"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-black/80 px-2 text-emerald-200/50">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: <Github className="w-5 h-5" />, provider: "github" },
                    { icon: <Twitter className="w-5 h-5" />, provider: "twitter" },
                    { icon: <Facebook className="w-5 h-5" />, provider: "facebook" },
                  ].map(({ icon, provider }) => (
                    <motion.button
                      key={provider}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSocialLogin(provider)}
                      className="flex items-center justify-center p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors relative overflow-hidden"
                      style={{ boxShadow: "0 0 8px 2px rgba(16, 185, 129, 0.3)" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-transparent to-emerald-400/10 shimmer"></div>
                      <span className="relative z-10 text-emerald-200/70 hover:text-emerald-400">
                        {icon}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
              
              {/* Demo login */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <motion.button
                  type="button"
                  onClick={handleDemoLogin}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  Try demo account
                  <motion.span
                    className="absolute -inset-1 bg-emerald-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2 }}
                  />
                </motion.button>
              </motion.div>
            </form>
          </Form>

          {/* Sign up link */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 text-center text-emerald-200/70 relative z-10"
          >
            Don't have an account?{" "}
            <Link to="/signup">
              <motion.span
                className="text-emerald-400 hover:text-emerald-300 cursor-pointer relative inline-block group"
                whileHover={{ scale: 1.05 }}
              >
                Sign Up
                <motion.span
                  className="absolute -inset-1 bg-emerald-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.2 }}
                />
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-transparent to-emerald-400/10 animate-shimmer"></span>
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Success/Error messages */}
      <AnimatePresence>
        {(error || success) && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <div
              className={`p-4 rounded-lg shadow-lg ${
                error ? "bg-red-500" : "bg-emerald-500"
              } text-white flex items-center space-x-2`}
            >
              {error ? (
                <AlertCircle className="w-5 h-5" />
              ) : (
                <CheckCircle2 className="w-5 h-5" />
              )}
              <span>{error || success}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LoginPage; 