import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Star,
  Loader2
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("login");

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
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden flex items-center justify-center px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#00ff9d]/10 via-transparent to-[#00ff9d]/10"
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
            className="absolute w-1 h-1 bg-[#00ff9d]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative w-full max-w-md bg-[#1a1a1a]/50 backdrop-blur-md rounded-2xl p-8 border border-[#00ff9d]/20 shadow-2xl"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-4"
          >
            <Leaf className="w-12 h-12 text-[#00ff9d]" />
          </motion.div>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Welcome Back
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[#00ff9d]/70"
          >
            Sign in to continue exploring plants
          </motion.p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00ff9d]/70 w-5 h-5" />
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 bg-[#0a0a0a]/50 border-[#00ff9d]/20 text-white h-12"
                        onFocus={() => setHoveredField("email")}
                        onBlur={() => setHoveredField(null)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00ff9d]/70 w-5 h-5" />
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 bg-[#0a0a0a]/50 border-[#00ff9d]/20 text-white h-12"
                        onFocus={() => setHoveredField("password")}
                        onBlur={() => setHoveredField(null)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00ff9d]/70 hover:text-[#00ff9d]"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#00ff9d]/20 bg-[#0a0a0a]/50 text-[#00ff9d] focus:ring-[#00ff9d]"
                />
                <span className="text-[#00ff9d]/70 text-sm">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-[#00ff9d] hover:text-[#00ff9d]/80 text-sm"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#00ff9d] hover:bg-[#00ff9d]/80 text-black font-medium h-12"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#00ff9d]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1a1a1a]/50 text-[#00ff9d]/70">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin("google")}
                className="bg-[#0a0a0a]/50 border-[#00ff9d]/20 text-[#00ff9d] hover:bg-[#00ff9d]/10 h-12"
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin("twitter")}
                className="bg-[#0a0a0a]/50 border-[#00ff9d]/20 text-[#00ff9d] hover:bg-[#00ff9d]/10 h-12"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin("facebook")}
                className="bg-[#0a0a0a]/50 border-[#00ff9d]/20 text-[#00ff9d] hover:bg-[#00ff9d]/10 h-12"
              >
                <Facebook className="w-5 h-5" />
              </Button>
            </div>

            <div className="text-center">
              <p className="text-[#00ff9d]/70">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[#00ff9d] hover:text-[#00ff9d]/80 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </Form>

        {/* Demo login button */}
        <div className="mt-6 text-center">
          <Button
            type="button"
            variant="outline"
            onClick={handleDemoLogin}
            className="bg-[#0a0a0a]/50 border-[#00ff9d]/20 text-[#00ff9d] hover:bg-[#00ff9d]/10 h-12 w-full"
          >
            <Zap className="w-5 h-5 mr-2" />
            Try Demo Account
          </Button>
        </div>

        {/* Success/Error messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
            >
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
              </div>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-4 bg-[#00ff9d]/10 border border-[#00ff9d]/20 rounded-lg text-[#00ff9d] text-sm"
            >
              <div className="flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                {success}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default LoginPage; 