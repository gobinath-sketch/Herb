import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Info, Bookmark, Map, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const VirtualHerbarium = () => {
  const navigate = useNavigate();
  const [currentRoom, setCurrentRoom] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [collectedPlants, setCollectedPlants] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const audioRef = useRef(null);

  const rooms = [
    {
      id: 0,
      name: "Tropical Plants Room",
      description: "Explore exotic tropical plants from around the world",
      plants: [
        { id: 1, name: "Monstera Deliciosa", scientificName: "Monstera deliciosa", image: "/plants/tropical/monstera.jpg" },
        { id: 2, name: "Bird of Paradise", scientificName: "Strelitzia reginae", image: "/plants/tropical/bird-of-paradise.jpg" },
        { id: 3, name: "Fiddle Leaf Fig", scientificName: "Ficus lyrata", image: "/plants/tropical/fiddle-leaf.jpg" }
      ]
    },
    {
      id: 1,
      name: "Desert Plants Room",
      description: "Discover resilient plants from arid environments",
      plants: [
        { id: 4, name: "Saguaro Cactus", scientificName: "Carnegiea gigantea", image: "/plants/desert/saguaro.jpg" },
        { id: 5, name: "Aloe Vera", scientificName: "Aloe vera", image: "/plants/desert/aloe.jpg" },
        { id: 6, name: "Prickly Pear", scientificName: "Opuntia", image: "/plants/desert/prickly-pear.jpg" }
      ]
    },
    {
      id: 2,
      name: "Temperate Plants Room",
      description: "Explore plants from temperate climate zones",
      plants: [
        { id: 7, name: "Japanese Maple", scientificName: "Acer palmatum", image: "/plants/temperate/japanese-maple.jpg" },
        { id: 8, name: "Hydrangea", scientificName: "Hydrangea macrophylla", image: "/plants/temperate/hydrangea.jpg" },
        { id: 9, name: "Rhododendron", scientificName: "Rhododendron", image: "/plants/temperate/rhododendron.jpg" }
      ]
    }
  ];

  useEffect(() => {
    // Load ambient sound
    audioRef.current = new Audio('/sounds/ambient-nature.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.play();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    setProgress((collectedPlants.length / (rooms.length * 3)) * 100);
  }, [collectedPlants]);

  const handlePlantClick = (plant) => {
    if (!collectedPlants.some(p => p.id === plant.id)) {
      setCollectedPlants([...collectedPlants, plant]);
      // Play collection sound
      const sound = new Audio('/sounds/collect.mp3');
      sound.play();
    }
  };

  const handleRoomChange = (direction) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentRoom(prev => {
        const newRoom = direction === 'next' 
          ? (prev + 1) % rooms.length 
          : (prev - 1 + rooms.length) % rooms.length;
        return newRoom;
      });
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-emerald-800 text-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Progress value={progress} className="h-2" />
          <p className="text-sm mt-2 text-center">
            Collection Progress: {collectedPlants.length}/{(rooms.length * 3)}
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-4 left-4 right-4 flex justify-between items-center">
        <Button
          onClick={() => handleRoomChange('prev')}
          className="bg-emerald-700 hover:bg-emerald-600 text-white p-4 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div className="flex gap-4">
          <Button
            onClick={() => setShowInfo(!showInfo)}
            className="bg-emerald-700 hover:bg-emerald-600 text-white p-4 rounded-full"
          >
            <Info className="w-6 h-6" />
          </Button>
          <Button
            onClick={() => navigate('/explore-plants')}
            className="bg-emerald-700 hover:bg-emerald-600 text-white p-4 rounded-full"
          >
            <Map className="w-6 h-6" />
          </Button>
        </div>
        <Button
          onClick={() => handleRoomChange('next')}
          className="bg-emerald-700 hover:bg-emerald-600 text-white p-4 rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoom}
            initial={{ opacity: 0, x: isTransitioning ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isTransitioning ? -100 : 100 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-emerald-800/50 backdrop-blur-md rounded-2xl p-8 border border-emerald-600/20">
              <h1 className="text-4xl font-bold mb-4">{rooms[currentRoom].name}</h1>
              <p className="text-emerald-200 mb-8">{rooms[currentRoom].description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms[currentRoom].plants.map(plant => (
                  <motion.div
                    key={plant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    className={`relative bg-emerald-700/50 rounded-xl p-4 cursor-pointer ${
                      collectedPlants.some(p => p.id === plant.id) ? 'ring-2 ring-emerald-400' : ''
                    }`}
                    onClick={() => handlePlantClick(plant)}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden mb-4">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{plant.name}</h3>
                    <p className="text-emerald-200 text-sm">{plant.scientificName}</p>
                    {collectedPlants.some(p => p.id === plant.id) && (
                      <div className="absolute top-2 right-2">
                        <Bookmark className="w-6 h-6 text-emerald-400" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Info Panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 left-4 right-4 bg-emerald-800/90 backdrop-blur-md rounded-xl p-6 border border-emerald-600/20"
          >
            <h2 className="text-2xl font-bold mb-4">Virtual Herbarium Tour</h2>
            <p className="text-emerald-200 mb-4">
              Explore different rooms to discover and collect various plant species. 
              Click on plants to add them to your collection. Complete your collection 
              to become a master botanist!
            </p>
            <div className="flex items-center gap-2 text-emerald-400">
              <Leaf className="w-5 h-5" />
              <span>Collected: {collectedPlants.length} plants</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VirtualHerbarium; 