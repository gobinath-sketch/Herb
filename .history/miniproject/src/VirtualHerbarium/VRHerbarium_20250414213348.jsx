import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Float, Text3D, Html } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowLeft, ArrowRight, Info, Bookmark, Volume2, VolumeX } from 'lucide-react';
import * as THREE from 'three';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error in VR Herbarium:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="mb-4">We're having trouble loading the Virtual Herbarium.</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Plant Model Component
function PlantModel({ position, rotation, scale, type = 'default' }) {
  const meshRef = useRef();
  const time = useRef(0);

  // Gentle swaying animation
  useFrame(() => {
    time.current += 0.01;
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(time.current) * 0.03;
      meshRef.current.rotation.x = Math.sin(time.current * 0.5) * 0.01;
    }
  });

  // Plant variants with realistic properties
  const variants = {
    monstera: {
      stemColor: '#2d5a27',
      leafColor: '#4a8a3c',
      height: 1.2,
      leafSize: 0.4,
      leafCount: 6,
      spread: 0.5,
    },
    'fiddle-leaf': {
      stemColor: '#2d5a27',
      leafColor: '#3a6a2d',
      height: 1.5,
      leafSize: 0.5,
      leafCount: 4,
      spread: 0.6,
    },
    'snake-plant': {
      stemColor: '#2d5a27',
      leafColor: '#4a8a3c',
      height: 1.0,
      leafSize: 0.3,
      leafCount: 8,
      spread: 0.4,
    },
    default: {
      stemColor: '#2d5a27',
      leafColor: '#4a8a3c',
      height: 1.0,
      leafSize: 0.3,
      leafCount: 6,
      spread: 0.4,
    },
  };

  const plantVariant = variants[type] || variants.default;

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {/* Main stem */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, plantVariant.height, 6]} />
        <meshStandardMaterial
          color={plantVariant.stemColor}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Leaves */}
      {Array.from({ length: plantVariant.leafCount }).map((_, i) => {
        const angle = (i / plantVariant.leafCount) * Math.PI * 2;
        const x = Math.sin(angle) * plantVariant.spread;
        const z = Math.cos(angle) * plantVariant.spread;
        return (
          <mesh
            key={i}
            position={[x, plantVariant.height * 0.5, z]}
            rotation={[0, angle, 0]}
          >
            <planeGeometry args={[plantVariant.leafSize, plantVariant.leafSize]} />
            <meshStandardMaterial
              color={plantVariant.leafColor}
              side={THREE.DoubleSide}
              roughness={0.7}
              metalness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Interactive Info Panel
function InfoPanel({ plant, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-6 rounded-t-2xl border-t border-emerald-500/20"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{plant.name}</h2>
            <p className="text-emerald-400">{plant.scientificName}</p>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-white hover:text-emerald-400"
          >
            <ArrowRight className="w-6 h-6" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
            <p className="text-gray-300">{plant.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Characteristics</h3>
            <ul className="space-y-2 text-gray-300">
              {plant.characteristics.map((char, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2" />
                  {char}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Main VR Herbarium Component
function VRHerbarium() {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [muted, setMuted] = useState(false);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch plants data
    const fetchPlants = async () => {
      try {
        const response = await fetch('/plant.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError("Response was not JSON");
        }
        const data = await response.json();
        setPlants(data.plants || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching plants:', error);
        setError(error.message);
        setPlants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-emerald-500 rounded-full animate-spin border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Plants</h2>
          <p className="mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black">
        {/* Top Navigation */}
        <div className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md p-4 border-b border-emerald-500/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white hover:text-emerald-400">
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <h1 className="text-2xl font-bold text-white">VR Herbarium Tour</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search plants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-black/50 border-emerald-500/20 text-white w-64"
                />
              </div>
              <Button
                variant="ghost"
                onClick={() => setMuted(!muted)}
                className="text-white hover:text-emerald-400"
              >
                {muted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* 3D Scene */}
        <div className="h-screen pt-16">
          <Canvas
            camera={{ position: [0, 2, 5], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            onCreated={({ gl }) => {
              gl.setClearColor('#000000', 0);
            }}
          >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Environment preset="forest" />
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={10}
            />
            
            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
              <planeGeometry args={[100, 100]} />
              <meshStandardMaterial color="#2d5a27" />
            </mesh>
            
            {/* Plant Models */}
            {filteredPlants.map((plant, index) => (
              <Float
                key={plant.id}
                speed={2}
                rotationIntensity={0.5}
                floatIntensity={0.5}
              >
                <PlantModel
                  type={plant.id.toLowerCase().replace(/\s+/g, '-')}
                  position={[
                    Math.sin(index * 2) * 3,
                    0,
                    Math.cos(index * 2) * 3
                  ]}
                  rotation={[0, index * 0.5, 0]}
                  scale={0.5}
                />
                {/* Plant Name Label */}
                <Html
                  position={[0, -1, 0]}
                  center
                  style={{
                    color: '#4ade80',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    textShadow: '0 0 10px rgba(0,0,0,0.5)',
                    pointerEvents: 'none',
                  }}
                >
                  {plant.name}
                </Html>
              </Float>
            ))}
          </Canvas>
        </div>

        {/* Info Panel */}
        <AnimatePresence>
          {selectedPlant && (
            <InfoPanel
              plant={selectedPlant}
              onClose={() => setSelectedPlant(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}

export default VRHerbarium; 