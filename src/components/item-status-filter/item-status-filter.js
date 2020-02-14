import "./item-status-filter.css";
import React, { Component } from "react";

export default class ItemStatusFilter extends Component {
  render() {
    const { filterState } = this.props;

    const styleClasses = {
      all: "btn btn-outline-secondary",
      done: "btn btn-outline-secondary",
      active: "btn btn-outline-secondary"
    };

    switch (filterState) {
      case 0:
        styleClasses.all = "btn btn-info";
        break;
      case 1:
        styleClasses.done = "btn btn-info";
        break;
      case 2:
        styleClasses.active = "btn btn-info";
        break;
      default:
        break;
    }

    return (
      <div className='btn-group'>
        <button
          className={styleClasses.all}
          onClick={() => this.props.onFilterChange(0)}
        >
          All
        </button>
        <button
          className={styleClasses.active}
          onClick={() => this.props.onFilterChange(2)}
        >
          Active
        </button>
        <button
          className={styleClasses.done}
          onClick={() => {
            this.props.onFilterChange(1);
          }}
        >
          Done
        </button>
      </div>
    );
  }
}
