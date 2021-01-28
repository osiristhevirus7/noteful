import React from 'react';
import AppContext from '../AppContext';
import PropTypes from 'prop-types';

class AddNote extends React.Component {
  static defaultProps = {
    history: { goBack: () => {} },
  };
  state = { name: '', content: '', folderId: '', modified: '', touched: false };

  static contextType = AppContext;

  formUpdate = (event) => {
    this.setState({ [event.target.id]: event.target.value, touched: true });
  };

  handleAddNote = (e) => {
    e.preventDefault();
    const url = `http://localhost:9090/notes`;

    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        content: this.state.content,
        folderId: this.state.folderId,
        modified: this.state.modified,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((event) => Promise.reject(event));
        } else {
          return response.json();
        }
      })
      .then((responseJson) => {
        this.context.handleAddNote(responseJson);
        this.props.history.goBack();
      })
      .catch(() =>
        alert(
          'Oops! Something went wrong. Please refresh the page and try again.'
        )
      );
  };

  getFolderOptions = () => {
    let folderOptions = this.context.folders.map((folder) => {
      return (
        <option key={folder.id} value={folder.id}>
          {folder.name}
        </option>
      );
    });
    return folderOptions;
  };

  setModified = () => {
    let today = new Date();
    let todayIso = today.toISOString();
    this.setState({ modified: todayIso });
  };

  componentDidMount() {
    this.setModified();
  }

  validateName = () => {
    if (this.state.name === '') {
      return true;
    }
  };

  render() {
    return (
      <div className="add-note-comp">
        <button className="back-button" onClick={this.props.history.goBack}>
          Back
        </button>
        <form className="note-add-form" onSubmit={(e) => this.handleAddNote(e)}>
          <label htmlFor="#name">New Note Name:</label>
          <br />
          <input id="name" onChange={(e) => this.formUpdate(e)}></input>
          {this.validateName() && this.state.touched && (
            <p style={{ color: 'red' }}>
              ^The name field must not be left blank
            </p>
          )}
          <br />
          <label htmlFor="#content">New Note Content:</label>
          <br />
          <textarea
            rows="4"
            cols="50"
            id="content"
            onChange={(e) => this.formUpdate(e)}
          />
          <br />
          <label htmlFor="#folderId">Select a folder for this note:</label>
          <br />
          <select
            name="Folder"
            id="folderId"
            onChange={(e) => this.formUpdate(e)}
          >
            <option>Select a Folder</option>
            {this.getFolderOptions()}
          </select>
          <br />
          <div className="submit-note-div">
            <button className="submit-note" disabled={this.validateName()}>
              Submit New Note
            </button>
          </div>
        </form>
      </div>
    );
  }
}

AddNote.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AddNote;
