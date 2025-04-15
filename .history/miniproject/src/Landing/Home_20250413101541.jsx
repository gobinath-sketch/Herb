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
      style={{ perspective: '1000px', cursor: 'pointer' }}
    >
      <Card sx={{
        height: '100%',
        minHeight: '300px',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'all 0.4s ease',
        transform: `rotateX(${(mousePosition.y - 150) * 0.01}deg) rotateY(${(mousePosition.x - 150) * 0.01}deg)`,
        '&:hover': {
          transform: 'translateY(-10px) scale(1.02)',
          boxShadow: `0 20px 40px ${color}30`,
          background: 'rgba(255, 255, 255, 0.07)',
          border: `1px solid ${color}40`,
        }
      }}>
        <CardContent sx={{ 
          p: 4, 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
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
            <Box sx={{
              width: '90px',
              height: '90px',
              borderRadius: '24px',
              background: `linear-gradient(135deg, ${color}15, ${color}30)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: -1,
                borderRadius: '24px',
                padding: '1px',
                background: `linear-gradient(45deg, ${color}, transparent)`,
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }
            }}>
              {icon}
            </Box>
          </motion.div>
          <Typography variant="h5" gutterBottom sx={{ 
            color: 'white',
            fontWeight: '600',
            mb: 2,
            textAlign: 'center',
            textShadow: `0 0 20px ${color}40`,
          }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            lineHeight: 1.6,
          }}>
            {description}
          </Typography>
          <Box sx={{
            mt: 'auto',
            pt: 3,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Button
              variant="text"
              endIcon={<ArrowRight />}
              sx={{
                color: color,
                '&:hover': {
                  background: `${color}15`,
                }
              }}
            >
              Learn More
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const TestimonialCard = ({ name, role, image, rating, comment }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card sx={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        p: 3,
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 2,
          position: 'relative',
        }}>
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Avatar 
              src={image} 
              sx={{ 
                width: 60, 
                height: 60, 
                mr: 2,
                border: '2px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
              }} 
            />
          </motion.div>
          <Box>
            <Typography variant="h6" sx={{ 
              color: 'white',
              fontWeight: 'bold',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
            }}>
              {name}
            </Typography>
            <Typography variant="body2" sx={{ 
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.9rem',
            }}>
              {role}
            </Typography>
          </Box>
        </Box>
        <Rating 
          value={rating} 
          readOnly 
          sx={{ 
            color: '#FFC107',
            mb: 2,
            '& .MuiRating-iconFilled': {
              textShadow: '0 0 10px #FFC107',
            }
          }} 
        />
        <Typography variant="body1" sx={{ 
          color: 'rgba(255,255,255,0.9)',
          lineHeight: 1.6,
          fontSize: '1rem',
        }}>
          {comment}
        </Typography>
      </Card>
    </motion.div>
  );
};

const StatCard = ({ icon, value, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card sx={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        p: 3,
        textAlign: 'center',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }
      }}>
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
          <Box sx={{ 
            mb: 2,
            color: 'rgba(255, 255, 255, 0.9)',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))',
          }}>
            {icon}
          </Box>
        </motion.div>
        <Typography variant="h4" sx={{ 
          color: 'white', 
          fontWeight: 'bold', 
          mb: 1,
          textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
        }}>
          {count}+
        </Typography>
        <Typography variant="body1" sx={{ 
          color: 'rgba(255,255,255,0.7)',
          fontSize: '1rem',
        }}>
          {label}
        </Typography>
      </Card>
    </motion.div>
  );
};

const QuickTipCard = ({ icon, title, description, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card sx={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: `1px solid ${color}40`,
        p: 3,
        height: '100%',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-5px)',
          border: `1px solid ${color}`,
          boxShadow: `0 10px 30px ${color}20`,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(45deg, ${color}10, transparent)`,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover::before': {
          opacity: 1,
        }
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 2,
          position: 'relative',
        }}>
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
            style={{ color: color }}
          >
            {icon}
          </motion.div>
          <Typography variant="h6" sx={{ 
            ml: 2, 
            color: 'white',
            fontWeight: 'bold',
            textShadow: `0 0 10px ${color}40`,
          }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ 
          color: 'rgba(255,255,255,0.8)',
          lineHeight: 1.6,
          fontSize: '1rem',
        }}>
          {description}
        </Typography>
      </Card>
    </motion.div>
  );
};

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
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
    >
      <Card sx={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        height: '100%',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }
      }}>
        <Box sx={{ 
          height: '250px',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          transform: `scale(1.1) translate(${(mousePosition.x - 150) * 0.01}px, ${(mousePosition.y - 125) * 0.01}px)`,
          transition: 'transform 0.3s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)',
            opacity: 0.7,
            transition: 'opacity 0.3s ease',
          },
          '&:hover::before': {
            opacity: 0.5,
          }
        }}>
          <Box sx={{ 
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 3,
            color: 'white',
            transform: 'translateY(0)',
            transition: 'transform 0.3s ease',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
          }}>
            <Typography variant="h5" sx={{ 
              mb: 1,
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontSize: '1.5rem',
            }}>
              {name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip 
                label={category} 
                size="small" 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                  }
                }} 
              />
              <Chip 
                label={careLevel} 
                size="small" 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                  }
                }} 
              />
            </Box>
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
};

// Weather Widget Component
const WeatherWidget = ({ data }) => {
  return (
    <Paper sx={{
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(10px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      p: 3,
      height: '100%',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <CloudRain size={24} style={{ marginRight: '8px', color: '#64B5F6' }} />
        <Typography variant="h6" sx={{ color: 'white' }}>Plant Care Weather</Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Thermometer size={18} style={{ marginRight: '8px', color: '#FF7043' }} />
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Temperature
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ color: 'white' }}>24°C</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Wind size={18} style={{ marginRight: '8px', color: '#81C784' }} />
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Humidity
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ color: 'white' }}>65%</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

// Plant Care Tips Component
const PlantCareTip = ({ tip }) => {
  return (
    <Paper sx={{
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(10px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      p: 3,
      height: '100%',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        background: 'rgba(255, 255, 255, 0.07)',
      }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
        {tip.icon}
        <Box sx={{ ml: 2 }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
            {tip.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {tip.description}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      title: 'Plant Identification',
      description: 'Identify any plant instantly with our advanced AI technology',
      icon: <Leaf size={40} color="#4CAF50" />,
      color: '#4CAF50',
      link: '/identify'
    },
    {
      title: 'Virtual Garden',
      description: 'Design and manage your dream garden in 3D',
      icon: <Flower2 size={40} color="#2196F3" />,
      color: '#2196F3',
      link: '/virtual-farm'
    },
    {
      title: 'Plant Care Guide',
      description: 'Personalized care instructions for every plant',
      icon: <Heart size={40} color="#E91E63" />,
      color: '#E91E63',
      link: '/plant-care-guide'
    },
    {
      title: 'Disease Detection',
      description: 'Early detection of plant diseases using AI',
      icon: <Shield size={40} color="#9C27B0" />,
      color: '#9C27B0',
      link: '/disease-detection'
    }
  ];

  const quickTips = [
    {
      title: 'Smart Watering',
      description: 'Get AI-powered watering schedules based on your plant type and local weather',
      icon: <Droplets size={24} color="#2196F3" />,
      color: '#2196F3'
    },
    {
      title: 'Light Optimization',
      description: 'Find the perfect spot for your plants with our light meter tool',
      icon: <Sun size={24} color="#FFC107" />,
      color: '#FFC107'
    },
    {
      title: 'Growth Tracking',
      description: 'Monitor your plants growth with time-lapse photography',
      icon: <Sprout size={24} color="#4CAF50" />,
      color: '#4CAF50'
    },
    {
      title: 'Smart Reminders',
      description: 'Never forget to care for your plants with customized notifications',
      icon: <Clock size={24} color="#FF5722" />,
      color: '#FF5722'
    }
  ];

  const trendingPlants = [
    {
      name: 'Monstera Deliciosa',
      image: 'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg',
      category: 'Tropical',
      careLevel: 'Intermediate'
    },
    {
      name: 'Snake Plant',
      image: 'https://images.pexels.com/photos/6597437/pexels-photo-6597437.jpeg',
      category: 'Air Purifying',
      careLevel: 'Beginner'
    },
    {
      name: 'Fiddle Leaf Fig',
      image: 'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg',
      category: 'Indoor Tree',
      careLevel: 'Expert'
    },
    {
      name: 'String of Pearls',
      image: 'https://images.pexels.com/photos/4425201/pexels-photo-4425201.jpeg',
      category: 'Succulent',
      careLevel: 'Intermediate'
    }
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated Background */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0,
      }}>
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              background: 'white',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        {/* Hero Section */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 12,
          position: 'relative',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h1" sx={{
              color: 'white',
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 'bold',
              mb: 2,
              textShadow: '0 0 30px rgba(255,255,255,0.3)',
              background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Your Smart Garden Companion
            </Typography>
            <Typography variant="h5" sx={{
              color: 'rgba(255,255,255,0.8)',
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
            }}>
              Transform your gardening experience with AI-powered plant care, expert guidance, and a thriving community.
            </Typography>
          </motion.div>
        </Box>

        {/* Features Grid */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h2" sx={{
            color: 'white',
            textAlign: 'center',
            mb: 6,
            fontSize: { xs: '2rem', md: '3rem' },
            textShadow: '0 0 20px rgba(255,255,255,0.2)',
          }}>
            Smart Features
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FeatureCard {...feature} delay={index * 0.1} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Weather and Tips Section */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h2" sx={{
            color: 'white',
            textAlign: 'center',
            mb: 6,
            fontSize: { xs: '2rem', md: '3rem' },
            textShadow: '0 0 20px rgba(255,255,255,0.2)',
          }}>
            Smart Care
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <WeatherWidget />
            </Grid>
            {quickTips.map((tip, index) => (
              <Grid item xs={12} md={4} key={index}>
                <PlantCareTip tip={tip} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Trending Plants */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h2" sx={{
            color: 'white',
            textAlign: 'center',
            mb: 6,
            fontSize: { xs: '2rem', md: '3rem' },
            textShadow: '0 0 20px rgba(255,255,255,0.2)',
          }}>
            Featured Plants
          </Typography>
          <Grid container spacing={4}>
            {trendingPlants.map((plant, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <TrendingPlantCard {...plant} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Newsletter Section */}
        <Box sx={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          p: 6,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <Typography variant="h3" sx={{
            color: 'white',
            mb: 2,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            textShadow: '0 0 20px rgba(255,255,255,0.2)',
          }}>
            Join Our Community
          </Typography>
          <Typography variant="body1" sx={{
            color: 'rgba(255,255,255,0.8)',
            mb: 4,
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.6,
          }}>
            Get weekly plant care tips, exclusive guides, and early access to new features.
          </Typography>
          <Box sx={{
            display: 'flex',
            gap: 2,
            maxWidth: '500px',
            mx: 'auto',
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4CAF50',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              size="large"
              endIcon={<Mail />}
              sx={{
                background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: '50px',
                whiteSpace: 'nowrap',
                boxShadow: '0 0 20px rgba(76,175,80,0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #45a049, #388E3C)',
                }
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Home; 