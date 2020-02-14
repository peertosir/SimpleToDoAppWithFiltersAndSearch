import "./search-panel.css";

import React, { Component } from "react";

export default class SearchPanel extends Component {
  state = {
    searchText: ""
  };

  onSearchInputChanged = e => {
    this.setState({ searchText: e.target.value }, () => {
      this.props.onSearch(this.state.searchText);
    });
  };

  render() {
    return (
      <input
        type='text'
        className='form-control search-input'
        placeholder='search'
        onChange={this.onSearchInputChanged}
        value={this.state.searchText}
      />
    );
  }
}
