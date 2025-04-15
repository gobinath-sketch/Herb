import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, IconButton, useTheme, TextField, Avatar, Rating, Chip, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Leaf, Flower2, Sun, Droplets, ChevronRight, Search, Mail, Star, TrendingUp, Users, BookOpen, Clock, Calendar, Zap, Sparkles, Heart, Shield, Award, Sprout, CloudRain, Wind, Thermometer } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, color, delay, link }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      onClick={() => navigate(link)}
      className="cursor-pointer perspective-1000"
    >
      <div className="h-full min-h-[300px] bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 transition-all duration-400 hover:translate-y-[-10px] hover:scale-102 hover:shadow-lg hover:bg-white/10 hover:border-white/20"
        style={{
          transform: `rotateX(${(mousePosition.y - 150) * 0.01}deg) rotateY(${(mousePosition.x - 150) * 0.01}deg)`,
          boxShadow: `0 20px 40px ${color}30`,
        }}
      >
        <div className="p-8 h-full flex flex-col items-center justify-center relative">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-white/10 to-white/20 flex items-center justify-center mb-6 relative"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}30)`,
              }}
            >
              <div className="absolute inset-[-1px] rounded-3xl bg-gradient-to-br from-white/20 to-transparent" />
              {icon}
            </div>
          </motion.div>
          <h3 className="text-xl font-semibold text-white mb-4 text-center"
            style={{ textShadow: `0 0 20px ${color}40` }}
          >
            {title}
          </h3>
          <p className="text-white/70 text-center">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialCard = ({ name, role, image, rating, comment }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10"
  >
    <div className="flex items-center mb-4">
      <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <h4 className="text-white font-semibold">{name}</h4>
        <p className="text-white/60 text-sm">{role}</p>
      </div>
    </div>
    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-white/20'}`} />
      ))}
    </div>
    <p className="text-white/70">{comment}</p>
  </motion.div>
);

const StatCard = ({ icon, value, label }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 text-center"
  >
    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
    <p className="text-white/60">{label}</p>
  </motion.div>
);

const QuickTipCard = ({ icon, title, description, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10"
  >
    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
      style={{ background: `linear-gradient(135deg, ${color}15, ${color}30)` }}
    >
      {icon}
    </div>
    <h4 className="text-white font-semibold mb-2">{title}</h4>
    <p className="text-white/70">{description}</p>
  </motion.div>
);

const TrendingPlantCard = ({ name, image, category, careLevel }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseMove={handleMouseMove}
      className="cursor-pointer perspective-1000"
    >
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10 transition-all duration-400 hover:translate-y-[-10px] hover:scale-102"
        style={{
          transform: `rotateX(${(mousePosition.y - 150) * 0.01}deg) rotateY(${(mousePosition.x - 150) * 0.01}deg)`,
        }}
      >
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h4 className="text-white font-semibold mb-2">{name}</h4>
          <div className="flex items-center justify-between">
            <span className="text-white/60">{category}</span>
            <span className="text-white/60">{careLevel}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WeatherWidget = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10"
  >
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-white font-semibold">Weather</h4>
      <div className="flex items-center">
        <CloudRain className="w-5 h-5 text-white/60 mr-2" />
        <span className="text-white/60">{data.temperature}°C</span>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center">
        <Wind className="w-5 h-5 text-white/60 mr-2" />
        <span className="text-white/60">{data.windSpeed} km/h</span>
      </div>
      <div className="flex items-center">
        <Droplets className="w-5 h-5 text-white/60 mr-2" />
        <span className="text-white/60">{data.humidity}%</span>
      </div>
    </div>
  </motion.div>
);

const PlantCareTip = ({ tip }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10"
  >
    <div className="flex items-start">
      <Leaf className="w-6 h-6 text-white/60 mr-4 mt-1" />
      <div>
        <h4 className="text-white font-semibold mb-2">{tip.title}</h4>
        <p className="text-white/70">{tip.description}</p>
      </div>
    </div>
  </motion.div>
);

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState({
    temperature: 25,
    windSpeed: 12,
    humidity: 65
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-white" />,
      title: "Plant Identification",
      description: "Identify plants using AI technology",
      color: "#00ff9d",
      link: "/identify"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-white" />,
      title: "Learning Center",
      description: "Learn about plant care and gardening",
      color: "#00ff9d",
      link: "/learning"
    },
    {
      icon: <Flower2 className="w-8 h-8 text-white" />,
      title: "Explore Plants",
      description: "Discover various plant species",
      color: "#00ff9d",
      link: "/explore-plants"
    },
    {
      icon: <Sun className="w-8 h-8 text-white" />,
      title: "Virtual Farm",
      description: "Create your virtual garden",
      color: "#00ff9d",
      link: "/virtual-farm"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Plant Enthusiast",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5,
      comment: "This app has transformed my gardening experience!"
    },
    {
      name: "Michael Chen",
      role: "Botany Student",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 5,
      comment: "The plant identification feature is incredibly accurate."
    }
  ];

  const stats = [
    {
      icon: <Users className="w-8 h-8 text-white" />,
      value: "10K+",
      label: "Active Users"
    },
    {
      icon: <Leaf className="w-8 h-8 text-white" />,
      value: "5K+",
      label: "Plants Identified"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-white" />,
      value: "100+",
      label: "Learning Resources"
    }
  ];

  const quickTips = [
    {
      icon: <Sun className="w-6 h-6 text-white" />,
      title: "Light Requirements",
      description: "Most plants need 6-8 hours of sunlight daily",
      color: "#00ff9d"
    },
    {
      icon: <Droplets className="w-6 h-6 text-white" />,
      title: "Watering Tips",
      description: "Water when the top inch of soil is dry",
      color: "#00ff9d"
    }
  ];

  const trendingPlants = [
    {
      name: "Monstera Deliciosa",
      image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78",
      category: "Indoor",
      careLevel: "Easy"
    },
    {
      name: "Fiddle Leaf Fig",
      image: "https://images.unsplash.com/photo-1485955900006-10f4d1d1f0d6",
      category: "Indoor",
      careLevel: "Medium"
    }
  ];

  const careTips = [
    {
      title: "Pruning Basics",
      description: "Regular pruning helps plants grow healthier and stronger"
    },
    {
      title: "Soil Selection",
      description: "Choose the right soil type for your plant's needs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="text-[#00ff9d]">Plant</span> Explorer
          </h1>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Discover, learn, and grow with our comprehensive plant care platform
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/explore-plants")}
              className="bg-[#00ff9d] hover:bg-[#00ff9d]/80 text-black font-medium px-8 py-3 rounded-full transition-colors"
            >
              Explore Plants
            </button>
            <button
              onClick={() => navigate("/learning")}
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-full transition-colors"
            >
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 0.1} />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Quick Care Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quickTips.map((tip, index) => (
              <QuickTipCard key={index} {...tip} />
            ))}
          </div>
        </div>

        {/* Trending Plants */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Trending Plants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trendingPlants.map((plant, index) => (
              <TrendingPlantCard key={index} {...plant} />
            ))}
          </div>
        </div>

        {/* Weather Widget */}
        <div className="mb-20">
          <WeatherWidget data={weatherData} />
        </div>

        {/* Plant Care Tips */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Plant Care Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {careTips.map((tip, index) => (
              <PlantCareTip key={index} tip={tip} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 