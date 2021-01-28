import React from 'react';
import AppContext from '../AppContext';
import PropTypes from 'prop-types';

class AddFolder extends React.Component {
  static defaultProps = {
    history: { goBack: () => {} },
  };
  state = { folderName: '' };

  static contextType = AppContext;

  setFolderName = (e) => {
    this.setState({ folderName: e.target.value });
  };

  handleAddFolder = (e) => {
    e.preventDefault();
    const url = `http://localhost:9090/folders`;

    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.folderName }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((event) => Promise.reject(event));
        } else {
          return response.json();
        }
      })
      .then((responseJson) => {
        this.context.handleAddFolder(responseJson);
        this.setState({ folderName: '' });
        this.props.history.goBack();
      })
      .catch(() => alert('Oops!'));
  };

  render() {
    return (
      <div className="add-folder">
        <button className="back-button" onClick={this.props.history.goBack}>
          Back
        </button>
        <form
          className="folder-add-form"
          onSubmit={(e) => this.handleAddFolder(e)}
        >
          <label htmlFor="#add-folder">New Folder Name:</label>
          <br />
          <input id="add-folder" onChange={this.setFolderName}></input>
          <br />
          <button className="submit-folder">Submit New Folder</button>
        </form>
      </div>
    );
  }
}

AddFolder.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AddFolder;
