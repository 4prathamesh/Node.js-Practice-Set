function TodoItem({ id, todoName, todoDate, onDeleteClick }) {
  return (
    <div className="flex items-center justify-between bg-white shadow-md rounded-xl px-6 py-4 mb-4 hover:shadow-lg transition">
      <div className="flex flex-col">
        <span className="text-lg font-medium text-gray-800">
          {todoName}
        </span>
        <span className="text-sm text-gray-500">
          Due: {todoDate}
        </span>
      </div>

      <button
        onClick={() => onDeleteClick(id)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
