import { useState } from "react";

export default function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState({});
  const [search, setSearch] = useState("");
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDesc, setErrorDesc] = useState(false);

  const regexTitle = /^[A-Za-z\s]{6,}$/;
  const regexDesc = /^.{10,}$/;

  const validateTitle = (value) => {
    setErrorTitle(!regexTitle.test(value));
  };

  const validateDesc = (value) => {
    setErrorDesc(!regexDesc.test(value));
  };

  const addToDoFunc = () => {
    if (regexTitle.test(title) && regexDesc.test(description)) {
      const id = Date.now().toString();
      setTodos({
        ...todos,
        [id]: { title, description, completed: false },
      });
      setTitle("");
      setDescription("");
    }
  };

  const markAsCompleted = (id) => {
    setTodos({
      ...todos,
      [id]: { ...todos[id], completed: !todos[id].completed },
    });
  };

  const updateTodo = (id) => {
    setTitle(todos[id].title);
    setDescription(todos[id].description);
    const updatedTodos = { ...todos };
    delete updatedTodos[id];
    setTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    const updatedTodos = { ...todos };
    delete updatedTodos[id];
    setTodos(updatedTodos);
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="input-container mb-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="To do title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            validateTitle(e.target.value);
          }}
        />
        {errorTitle && (
          <p className="text-red-500 text-sm error-title error">
            Error: Title must be at least 6 chars
          </p>
        )}
        <textarea
          className="border p-2 w-full mt-2"
          placeholder="To do description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            validateDesc(e.target.value);
          }}
        ></textarea>
        {errorDesc && (
          <p className="text-red-500 text-sm error-title error">
            Error: Description must be at least 10 chars
          </p>
        )}
        <button
          className="bg-blue-500 text-white p-2 mt-2 w-full addToDo"
          onClick={addToDoFunc}
        >
          Add
        </button>
      </div>
      <div className="search mb-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      <div className="todos space-y-2">
        {Object.keys(todos)
          .filter((id) => todos[id].title.toLowerCase().includes(search))
          .map((id) => (
            <div
              key={id}
              className={`p-4 border rounded-lg todo ${
                todos[id].completed ? "bg-green-200" : ""
              }`}
            >
              <div className="text">
                <p className="font-bold title">{todos[id].title}</p>
                <p className="desc">{todos[id].description}</p>
              </div>
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-green-500 text-white p-1"
                  onClick={() => markAsCompleted(id)}
                >
                  ✅
                </button>
                <button
                  className="bg-yellow-500 text-white p-1"
                  onClick={() => updateTodo(id)}
                >
                  ✏️
                </button>
                <button
                  className="bg-red-500 text-white p-1 "
                  onClick={() => removeTodo(id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
