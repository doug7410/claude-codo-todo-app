import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Star, 
  Users, 
  Calendar, 
  TrendingUp, 
  Award,
  Zap,
  Target,
  Clock
} from 'lucide-react';

interface ProjectStats {
  completion: number;
  teamMembers: number;
  daysLeft: number;
  tasks: number;
  completedTasks: number;
}

const ProjectDashboard: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [stats, setStats] = useState<ProjectStats>({
    completion: 0,
    teamMembers: 8,
    daysLeft: 12,
    tasks: 24,
    completedTasks: 0
  });
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'team'>('overview');

  // Animate progress bars on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(prev => ({
        ...prev,
        completion: 78,
        completedTasks: 18
      }));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: { 
      width: `${stats.completion}%`,
      transition: { duration: 2, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 flex items-center justify-center">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse-slow"></div>
      </div>

      <motion.div
        className="relative max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Card */}
        <motion.div
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl shadow-purple-500/20 hover:shadow-glow-lg transition-all duration-700 group"
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          {/* Header */}
          <motion.div 
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8"
            variants={itemVariants}
          >
            <div className="mb-4 lg:mb-0">
              <motion.h1 
                className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Project Aurora
              </motion.h1>
              <motion.p 
                className="text-gray-300 text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Next-gen design system implementation
              </motion.p>
            </div>
            
            <motion.div
              className="flex items-center space-x-4"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className="group relative p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg hover:shadow-glow transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: isPlaying ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </motion.div>
                <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </motion.button>
              
              <motion.div
                className="flex items-center space-x-1 text-yellow-400"
                whileHover={{ scale: 1.05 }}
              >
                <Star className="w-5 h-5 fill-current" />
                <span className="font-semibold">4.9</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div 
            className="flex space-x-1 mb-8 bg-white/5 p-1 rounded-2xl backdrop-blur-sm"
            variants={itemVariants}
          >
            {['overview', 'progress', 'team'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`flex-1 px-6 py-3 rounded-xl font-medium capitalize transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Progress Card */}
                  <motion.div
                    className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300 group"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Target className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
                      <span className="text-2xl font-bold text-white">{stats.completion}%</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Completion</h3>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        variants={progressVariants}
                        initial="hidden"
                        animate="visible"
                      />
                    </div>
                  </motion.div>

                  {/* Team Card */}
                  <motion.div
                    className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-400/50 transition-all duration-300 group"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Users className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-2xl font-bold text-white">{stats.teamMembers}</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Team Members</h3>
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white/20"
                        />
                      ))}
                      <div className="w-8 h-8 bg-gray-600/50 rounded-full border-2 border-white/20 flex items-center justify-center text-xs text-white font-semibold">
                        +{stats.teamMembers - 4}
                      </div>
                    </div>
                  </motion.div>

                  {/* Deadline Card */}
                  <motion.div
                    className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-yellow-400/50 transition-all duration-300 group"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Clock className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform" />
                      <span className="text-2xl font-bold text-white">{stats.daysLeft}</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Days Left</h3>
                    <div className="flex items-center text-sm text-gray-300">
                      <Calendar className="w-4 h-4 mr-1" />
                      Due March 15, 2024
                    </div>
                  </motion.div>
                </div>
              )}

              {activeTab === 'progress' && (
                <div className="space-y-6">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2 text-green-400" />
                      Project Milestones
                    </h3>
                    
                    <div className="space-y-4">
                      {[
                        { name: 'Design System Foundation', progress: 100, status: 'completed' },
                        { name: 'Component Library', progress: 85, status: 'in-progress' },
                        { name: 'Documentation', progress: 60, status: 'in-progress' },
                        { name: 'Testing & QA', progress: 30, status: 'pending' },
                      ].map((milestone, index) => (
                        <motion.div
                          key={milestone.name}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              milestone.status === 'completed' ? 'bg-green-400' :
                              milestone.status === 'in-progress' ? 'bg-yellow-400' : 'bg-gray-400'
                            }`} />
                            <span className="text-white font-medium">{milestone.name}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-24 bg-gray-700/50 rounded-full h-2">
                              <motion.div
                                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${milestone.progress}%` }}
                                transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                              />
                            </div>
                            <span className="text-sm text-gray-300 w-10">{milestone.progress}%</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}

              {activeTab === 'team' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: 'Alex Chen', role: 'Lead Designer', avatar: '🎨', status: 'online' },
                    { name: 'Sarah Johnson', role: 'Frontend Dev', avatar: '💻', status: 'online' },
                    { name: 'Michael Brown', role: 'Backend Dev', avatar: '⚙️', status: 'away' },
                    { name: 'Emily Davis', role: 'UX Researcher', avatar: '🔍', status: 'offline' },
                  ].map((member, index) => (
                    <motion.div
                      key={member.name}
                      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 group"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -2, scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-xl">
                            {member.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            member.status === 'online' ? 'bg-green-400' :
                            member.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{member.name}</h4>
                          <p className="text-gray-300 text-sm">{member.role}</p>
                        </div>
                        <div className="ml-auto">
                          <motion.button
                            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Zap className="w-4 h-4 text-yellow-400" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-8"
            variants={itemVariants}
          >
            <motion.button
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-glow transition-all duration-300 flex items-center justify-center space-x-2 group"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Award className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>View Full Report</span>
            </motion.button>
            
            <motion.button
              className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-6 rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2 group"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Manage Team</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectDashboard;