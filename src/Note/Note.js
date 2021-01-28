import React from 'react';
import { format } from 'date-fns';
import AppContext from '../AppContext';

class Note extends React.Component {
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
          this.props.history.push('/');
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { notes } = this.context;
    const noteId = this.props.match.params.noteId;

    let note = notes.find((note) => note.id === noteId) || {
      modified: new Date().toISOString(),
    };

    let date = new Date(note.modified);
    let formatted = format(date, 'do LLL yyyy');

    return (
      <section className="note">
        <div className="note-title">
          <div className="christmas"></div>
          <h2>{note.name}</h2>
        </div>
        <div className="note-details">
          <p>Note modified on: {formatted}</p>
          <button onClick={() => this.handleDelete(note.id)}>
            Delete Note
          </button>
        </div>
        <div>{note.content}</div>
      </section>
    );
  }
}

export default Note;
