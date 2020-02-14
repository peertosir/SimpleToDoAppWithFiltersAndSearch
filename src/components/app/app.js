import React, { Component } from "react";
import AppHeader from "../app-header";
import ToDoList from "../todo-list";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

import "./app.css";

export default class App extends Component {
  state = {
    todoData: [],
    filteredData: [],
    // 0 - All, 1 - Done, 2 - Active
    filterState: 0
  };

  todoFactory = label => {
    let id = 0;
    if (this.state.todoData.length > 0) {
      id =
        this.state.todoData.reduce((max, item) => Math.max(max, item.id), -1) +
        1;
    }
    return {
      label: label,
      important: false,
      id: id,
      done: false
    };
  };

  filterData = () => {
    this.setState(({ todoData }) => {
      switch (this.state.filterState) {
        case 0:
          return { filteredData: todoData };
        case 1:
          return { filteredData: todoData.filter(item => item.done === true) };
        case 2:
          return { filteredData: todoData.filter(item => item.done === false) };
        default:
          break;
      }
    });
  };

  onSearch = textToSearch => {
    this.setState(({ filteredData }) => {
      const result = filteredData.filter(item =>
        item.label.toLowerCase().includes(textToSearch.toLowerCase().trim())
      );
      return { filteredData: result };
    });
  };

  toggleProperty(arr, id, propName) {
    const indx = arr.findIndex(item => item.id === id);
    const editedElement = arr[indx];
    editedElement[propName] = !editedElement[propName];
    return [...arr.slice(0, indx), editedElement, ...arr.slice(indx + 1)];
  }

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, "important") };
    });
    this.filterData(this.props.filterState);
  };

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, "done") };
    });
    this.filterData(this.props.filterState);
  };

  deleteItem = id => {
    this.setState(({ todoData }) => {
      return { todoData: todoData.filter(item => item.id !== id) };
    });
    this.filterData(this.props.filterState);
  };

  onFilterDone = () => {
    this.setState({ filterState: 1 }, () =>
      this.filterData(this.props.filterState)
    );
  };

  onFilterActive = () => {
    this.setState({ filterState: 2 }, () =>
      this.filterData(this.props.filterState)
    );
  };

  onFilterAll = () => {
    this.setState({ filterState: 0 }, () =>
      this.filterData(this.props.filterState)
    );
  };

  addItem = text => {
    this.setState(({ todoData }) => {
      const result = [...todoData, this.todoFactory(text)];
      return {
        todoData: result
      };
    });
    this.filterData(this.props.filterState);
  };

  render() {
    const doneCount = this.state.todoData.filter(item => item.done === true)
      .length;
    const toDoCount = this.state.todoData.length - doneCount;

    return (
      <div className='todo-app'>
        <AppHeader toDo={toDoCount} done={doneCount} />
        <div className='top-panel d-flex'>
          <SearchPanel onSearch={this.onSearch} />
          <ItemStatusFilter
            onFilterActive={this.onFilterActive}
            onFilterDone={this.onFilterDone}
            onFilterAll={this.onFilterAll}
            filterState={this.state.filterState}
          />
        </div>
        <ToDoList
          todos={this.state.filteredData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={text => this.addItem(text)} />
      </div>
    );
  }
}
