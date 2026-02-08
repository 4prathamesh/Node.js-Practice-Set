import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import { useState, useEffect } from "react";
import { addItemToServer, getItemsFromServer, deleteItemFromServer } from "../services/itemsService";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    getItemsFromServer().then(initialItems => {
      const itemsWithCompletedFalse = initialItems.map(item => ({ ...item, completed: item.completed || false }));
      setTodoItems(itemsWithCompletedFalse);
    });
  },[])

  const handleNewItem = async (itemName, itemDueDate) => {
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    const item = await addItemToServer(itemName, itemDueDate);
    const newitem = { ...item, completed: false };
    const newTodoItems = [
      ...todoItems,
      newitem,
    ];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = async (id) => {
    const deletedId = await deleteItemFromServer(id);
    const newTodoItems = todoItems.filter((item) => item.id !== deletedId);
    setTodoItems(newTodoItems);
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-12 px-4">
    
    <div className="max-w-4xl mx-auto">
      
      <AppName />

      <div className="mt-8">
        <AddTodo onNewItem={handleNewItem} />
      </div>

      <div className="mt-10">
        {todoItems.length === 0 ? (
          <WelcomeMessage />
        ) : (
          <TodoItems
            todoItems={todoItems}
            onDeleteClick={handleDeleteItem}
          />
        )}
      </div>

    </div>
  </div>
);

}

export default App;
