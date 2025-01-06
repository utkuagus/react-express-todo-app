import Title from "./components/Title";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { useState, useEffect } from "react";
import Api from "./Api";

function App() {
  const [editList, setEditList] = useState({});
  const [todoList, setTodoList] = useState([]);
  const [trigger, setTrigger] = useState(false);

  function setStartState(data) {
    setTodoList(data.map((it) => it));
  }

  const toggleTrigger = () => setTrigger((trigger) => !trigger);

  useEffect(() => {
    Api()
      .getAllItems()
      .then((res) => res.json())
      .then(setStartState);
  }, [trigger]);

  const addItem = (item) => Api().insertItem(item).then(toggleTrigger);

  const removeItem = (item) => {
    Api().deleteItem(item).then(toggleTrigger);
  };

  const updateIt = (id, newItem) => {
    Api().updateItem(id, newItem).then(toggleTrigger);
    setEditList(
      Object.fromEntries(Object.entries(editList).filter((i) => i[0] != id))
    );
  };

  const updateEdit = (id, newEdit) => {
    const a = {};
    a[id] = newEdit;
    setEditList({ ...editList, ...a });
  };

  return (
    <div class="App">
      <Title />
      <Form addItem={addItem} />
      <TodoList
        todoList={todoList}
        editList={editList}
        removeItem={removeItem}
        updateItem={updateIt}
        updateEdit={updateEdit}
      />
    </div>
  );
}

export default App;
