import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import styles from './TodoInput.module.css';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <motion.form 
      className={styles.form}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className={styles.input}
          maxLength={100}
        />
        <motion.button
          type="submit"
          className={styles.addButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!text.trim()}
        >
          <Plus size={20} />
        </motion.button>
      </div>
    </motion.form>
  );
};