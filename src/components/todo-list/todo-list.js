import React from "react";
import ToDoListItem from "../todo-list-item/todo-list-item";
import "./todo-list.css";

const ToDoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
  const elements = todos.map(todo => {
    const { id, ...itemProps } = todo;
    return (
      <li className='list-group-item' key={id}>
        <ToDoListItem
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });

  return <ul className='list-group todo-list'>{elements}</ul>;
};

export default ToDoList;
