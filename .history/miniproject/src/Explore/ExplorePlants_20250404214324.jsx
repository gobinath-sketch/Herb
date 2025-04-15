import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ChevronDown, X } from "lucide-react";

const ExplorePlants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    difficulty: [],
    sunlight: [],
  });

  const plants = [
    {
      id: 1,
      name: "Aloe Vera",
      description: "A succulent plant with medicinal properties, known for its soothing gel.",
      category: "Medicinal",
      difficulty: "Easy",
      sunlight: "Partial"
    },
    {
      id: 2,
      name: "Basil",
      description: "Aromatic herb used in cooking and traditional medicine.",
      category: "Culinary",
      difficulty: "Easy",
      sunlight: "Full"
    },
    {
      id: 3,
      name: "Lavender",
      description: "Fragrant herb known for its calming properties and beautiful purple flowers.",
      category: "Aromatic",
      difficulty: "Medium",
      sunlight: "Full"
    }
  ];

  const clearAllFilters = () => {
    // Clear search and filters
    setSearchQuery("");
    setSelectedFilters({
      category: [],
      difficulty: [],
      sunlight: [],
    });
    setShowFilters(false);
  };

  // Filter plants based on search and filters
  const filteredPlants = plants.filter((plant) => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = Object.entries(selectedFilters).every(([key, values]) => {
      if (values.length === 0) return true;
      return values.includes(plant[key]);
    });

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-emerald-900/20 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Explore Plants</h1>
          <motion.button
            onClick={clearAllFilters}
            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear All Filters
          </motion.button>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400" />
              <input
                type="text"
                placeholder="Search plants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
            <Button
              variant="outline"
              className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 p-4 bg-white/5 border border-emerald-500/20 rounded-lg"
              >
                {/* ... existing filter options ... */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* All Plants Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map((plant) => (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-md rounded-xl border border-emerald-500/20 p-6 relative group"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">{plant.name}</h3>
                <p className="text-emerald-200/70">{plant.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    {plant.category}
                  </Badge>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    {plant.difficulty}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePlants; 