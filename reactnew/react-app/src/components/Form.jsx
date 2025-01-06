import { useState } from "react";

export default function Form(props) {
  const [newItem, setNewItem] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!newItem) {
      return;
    }
    props.addItem(newItem);
    setNewItem("");
  }

  function handleChange(e) {
    setNewItem(e.target.value);
  }

  return (
    <form class="Form" onSubmit={handleSubmit}>
      <input
        type="text"
        class="input"
        value={newItem}
        placeholder="add new item..."
        onChange={handleChange}
      />
      <button class="submit">Add</button>
    </form>
  );
}
