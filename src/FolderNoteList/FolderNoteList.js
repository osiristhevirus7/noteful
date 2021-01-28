import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import AppContext from '../AppContext';

class FolderNoteList extends React.Component {
  static contextType = AppContext;

  handleDelete = (noteId) => {
    const deleteUrl = `http://localhost:9090/notes/${noteId}`;

    fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          this.context.handleNoteDelete(noteId);
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { notes } = this.context;
    let folderId = this.props.match.params.folderId;

    const filteredNotes = notes.filter((note) => note.folderId === folderId);

    const notesArray = filteredNotes.map((note) => {
      let date = new Date(note.modified);
      let formatted = format(date, 'do LLL yyyy');

      return (
        <li className="note" key={note.id}>
          <div>
            <h2>
              <Link to={`/note/${note.id}`}>{note.name}</Link>
            </h2>
          </div>
          <div>
            <p>Note modified on: {formatted}</p>
            <button onClick={() => this.handleDelete(note.id)}>
              Delete Note
            </button>
          </div>
        </li>
      );
    });

    return (
      <div className="list">
        <Link to="/add-note">
          <button className="add-note">Add Note</button>
        </Link>

        {notesArray.length === 0 && (
          <p>
            Looks like there are no notes in this folder! Go ahead and add some
            to see them here
          </p>
        )}
        <ul>{notesArray}</ul>
      </div>
    );
  }
}

export default FolderNoteList;
