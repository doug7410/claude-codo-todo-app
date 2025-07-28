import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import type { Todo } from '../types';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <motion.div
      className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <motion.button
        className={styles.checkbox}
        onClick={() => onToggle(todo.id)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={styles.checkboxInner}
          animate={{ 
            backgroundColor: todo.completed ? '#10b981' : 'transparent',
            borderColor: todo.completed ? '#10b981' : '#d1d5db'
          }}
          transition={{ duration: 0.2 }}
        >
          {todo.completed && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Check size={14} color="white" />
            </motion.div>
          )}
        </motion.div>
      </motion.button>

      <motion.span
        className={styles.text}
        animate={{
          opacity: todo.completed ? 0.6 : 1,
          textDecoration: todo.completed ? 'line-through' : 'none'
        }}
        transition={{ duration: 0.2 }}
      >
        {todo.text}
      </motion.span>

      <motion.button
        className={styles.deleteButton}
        onClick={() => onDelete(todo.id)}
        whileHover={{ scale: 1.05, backgroundColor: '#ef4444' }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Trash2 size={16} />
      </motion.button>
    </motion.div>
  );
};