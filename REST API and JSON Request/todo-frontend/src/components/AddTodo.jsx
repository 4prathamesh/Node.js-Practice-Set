import { useState } from "react";

function AddTodo({ onNewItem }) {
  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAddButtonClicked = () => {
    if (!todoName || !dueDate) return;
    onNewItem(todoName, dueDate);
    setTodoName("");
    setDueDate("");
  };

  return (
  <div className="min-h-80 bg-gradient-to-br flex items-center justify-center px-4">
    <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg border border-white/40 shadow-2xl rounded-3xl p-8">
      
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        ✨ Add New Task
      </h2>

      <div className="flex flex-col md:flex-row gap-4">
        
        <input
          type="text"
          placeholder="Enter your task..."
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          className="flex-1 px-5 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition shadow-sm"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-5 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition shadow-sm"
        />

        <button
          onClick={handleAddButtonClicked}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-lg hover:shadow-xl"
        >
          Add
        </button>

      </div>
    </div>
  </div>

  );
}

export default AddTodo;
