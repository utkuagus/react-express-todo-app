import { useState } from "react";

export default function TodoList(props) {
  function handleEdit(it, i) {
    if (props.editList[it.id]) {
      props.updateItem(props.todoList[i].id, props.editList[it.id]);
    } else {
      props.updateEdit(props.todoList[i].id, props.todoList[i].item);
    }
  }

  function renderItem(it, i) {
    if (!props.editList[it.id]) {
      return <span class="text">{it.item}</span>;
    }
    return (
      <input
        type="text"
        class="text"
        value={props.editList[it.id]}
        onChange={(e) => props.updateEdit(props.todoList[i].id, e.target.value)}
      />
    );
  }

  function compareIds(a, b) {
    return a.id - b.id;
  }

  function sortById(list) {
    return list.sort(compareIds);
  }

  return (
    <ul class="TodoList">
      {sortById(props.todoList).map((it, idx) => (
        <li class="item">
          {renderItem(it, idx)}
          <div class="options">
            <button onClick={() => props.removeItem(it)}>delete</button>
            <button onClick={() => handleEdit(it, idx)}>update</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
