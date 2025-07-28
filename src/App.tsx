import { useState } from 'react';
import { motion } from 'framer-motion';
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
      {showDashboard ? (
        <div className="relative">
          <ProjectDashboard />
          {/* Toggle Button */}
          <motion.button
            onClick={() => setShowDashboard(false)}
            className="fixed top-6 right-6 z-50 bg-white/10 backdrop-blur-lg border border-white/20 text-white p-3 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <List className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </motion.button>
        </div>
      ) : (
        <div className="relative">
          <TodoApp />
          {/* Toggle Button */}
          <motion.button
            onClick={() => setShowDashboard(true)}
            className="fixed top-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-glow transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </motion.button>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
