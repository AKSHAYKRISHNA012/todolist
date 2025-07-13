
import React, { useState, useCallback, FormEvent } from 'react';
import { Todo } from './types';
import TodoItem from './components/TodoItem';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React and TypeScript', completed: true },
    { id: 2, text: 'Build a To-Do App', completed: false },
    { id: 3, text: 'Style with Tailwind CSS', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState<string>('');

  const addTodo = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    const newEntry: Todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
    };
    setTodos(prevTodos => [newEntry, ...prevTodos]);
    setNewTodo('');
  }, [newTodo]);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  return (
    <div className="min-h-screen font-sans flex flex-col items-center pt-8 sm:pt-16 px-4 bg-slate-900 text-white">
      <main className="w-full max-w-2xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 pb-2">
            React To-Do List
          </h1>
          <p className="text-slate-400">A simple, fast, and beautiful task manager.</p>
        </header>

        <form onSubmit={addTodo} className="mb-8 flex items-center gap-3">
          <input
            type="text"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow bg-slate-800 border-2 border-slate-700 rounded-lg p-3 text-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed"
            disabled={!newTodo.trim()}
          >
            Add
          </button>
        </form>

        <div className="bg-slate-800 p-4 sm:p-6 rounded-xl shadow-2xl">
          {todos.length > 0 ? (
            <ul>
              {todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </ul>
          ) : (
            <div className="text-center py-10">
              <p className="text-slate-400 text-lg">You're all caught up!</p>
              <p className="text-slate-500">Add a new task to get started.</p>
            </div>
          )}
        </div>
        
        <footer className="text-center mt-12 text-slate-500 text-sm">
            <p>Built with React & Tailwind CSS</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
