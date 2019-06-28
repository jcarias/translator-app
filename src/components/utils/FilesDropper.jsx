import React, { Component } from "react";
import isEmpty from "lodash/isEmpty";

class FilesDropper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false
    };

    this.internalInputId = `file-upload-input-${props.componentId}`;
    this.internalDnDId = `drag-and-drop-${props.componentId}`;
  }

  handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ dragging: true });
    }
  };

  handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0 || isNaN(this.dragCounter)) {
      this.setState({ dragging: false });
    }
  };

  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  handleFileChange = evt => {
    if (evt && evt.currentTarget) {
      if (!isEmpty(evt.currentTarget.files)) {
        this.props.handleDrop(evt.currentTarget.files);
      }
    }
  };

  resetInputValue = evt => {
    if (evt && evt.currentTarget) {
      evt.currentTarget.value = null;
    }
  };

  componentDidMount() {
    let div = document.querySelector("#" + this.internalDnDId);
    div.addEventListener("dragenter", this.handleDragIn);
    div.addEventListener("dragleave", this.handleDragOut);
    div.addEventListener("dragover", this.handleDrag);
    div.addEventListener("drop", this.handleDrop);
  }

  componentWillUnmount() {
    let div = document.querySelector("#" + this.internalDnDId);
    div.removeEventListener("dragenter", this.handleDragIn);
    div.removeEventListener("dragleave", this.handleDragOut);
    div.removeEventListener("dragover", this.handleDrag);
    div.removeEventListener("drop", this.handleDrop);
  }

  render() {
    const { draggingClass, accept } = this.props;

    return (
      <label htmlFor={this.internalInputId} id={this.internalDnDId}>
        <input
          type="file"
          style={{ display: "none" }}
          id={this.internalInputId}
          onChange={this.handleFileChange}
          onClick={this.resetInputValue}
          accept={accept}
        />
        <div className={this.state.dragging ? draggingClass : ""}>
          {this.props.children}
        </div>
      </label>
    );
  }
}
export default FilesDropper;
