import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { ThemeToggle } from './components/ThemeToggle';
import { useTodos } from './hooks/useTodos';
import ProjectDashboard from './components/ProjectDashboard';
import { Eye, List } from 'lucide-react';
import './App.css';

function TodoApp() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="app">
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="header">
          <motion.h1
            className="title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            ✨ Todo App
          </motion.h1>
          <ThemeToggle />
        </header>

        <TodoInput onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />

        {completedCount > 0 && (
          <motion.div
            className="stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p>{completedCount} completed</p>
            <motion.button
              className="clear-button"
              onClick={clearCompleted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear Completed
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function App() {
  const [showDashboard, setShowDashboard] = useState(true);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Toggle Bar */}
        <div className="relative z-50 p-6 flex justify-center">
          <motion.div
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-1 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-1">
              <motion.button
                onClick={() => setShowDashboard(true)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  showDashboard
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye className="w-4 h-4" />
                Dashboard
              </motion.button>
              <motion.button
                onClick={() => setShowDashboard(false)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  !showDashboard
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <List className="w-4 h-4" />
                Todo List
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {showDashboard ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectDashboard />
              </motion.div>
            ) : (
              <motion.div
                key="todos"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TodoApp />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
