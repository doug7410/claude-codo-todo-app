// Tailwind CSS type declarations
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

// Extend global types for Tailwind classes
declare global {
  namespace React {
    interface HTMLAttributes<T> {
      className?: string;
    }
  }
}