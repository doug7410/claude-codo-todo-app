import { motion, AnimatePresence } from 'framer-motion';
import type { Todo } from '../types';
import { TodoItem } from './TodoItem';
import styles from './TodoList.module.css';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  if (todos.length === 0) {
    return (
      <motion.div
        className={styles.emptyState}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.emptyIcon}>📝</div>
        <p>No todos yet. Add one above!</p>
      </motion.div>
    );
  }

  return (
    <div className={styles.todoList}>
      {activeTodos.length > 0 && (
        <motion.div
          className={styles.section}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className={styles.sectionTitle}>
            Active ({activeTodos.length})
          </h3>
          <AnimatePresence>
            {activeTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {completedTodos.length > 0 && (
        <motion.div
          className={styles.section}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className={styles.sectionTitle}>
            Completed ({completedTodos.length})
          </h3>
          <AnimatePresence>
            {completedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};