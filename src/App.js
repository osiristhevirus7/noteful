import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header/Header';
import './App.css';
import MainSideBar from './MainSideBar/MainSideBar';
import NoteSideBar from './NoteSideBar/NoteSideBar';
import ListSideBar from './ListSideBar/ListSideBar';
import NoteList from './NoteList/NoteList';
import FolderNoteList from './FolderNoteList/FolderNoteList';
import Note from './Note/Note';
import NotFound from './NotFound/NotFound';
import AppContext from './AppContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import SideBarError from './ErrorBoundaryComps/SideBarError';
import NoteListWindowError from './ErrorBoundaryComps/NoteListWindowError';

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
  };

  getFolders = () => {
    const folderURL = 'http://localhost:9090/folders';
    fetch(folderURL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((data) => {
        this.setState({ folders: data });
      })
      .catch((error) => console.log(error.message));
  };

  getNotes = () => {
    const folderURL = 'http://localhost:9090/notes';
    fetch(folderURL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((data) => {
        this.setState({ notes: data });
      })
      .catch((error) => console.log(error.message));
  };

  handleNoteDelete = (noteId) => {
    let newNotes = this.state.notes.filter((note) => note.id !== noteId);

    this.setState({ notes: newNotes });
  };

  handleAddFolder = (folder) => {
    this.setState({ folders: [...this.state.folders, folder] });
  };

  handleAddNote = (note) => {
    this.setState({ notes: [...this.state.notes, note] });
  };

  componentDidMount() {
    this.getFolders();
    this.getNotes();
  }

  render() {
    return (
      <main className="App">
        <Header />
        <AppContext.Provider
          value={{
            folders: this.state.folders,
            notes: this.state.notes,
            handleNoteDelete: this.handleNoteDelete,
            handleAddFolder: this.handleAddFolder,
            handleAddNote: this.handleAddNote,
          }}
        >
          <Switch>
            <Route exact path="/add-folder" component={AddFolder} />
            <Route exact path="/add-note" component={AddNote} />
            <div className="app-window">
              <section className="side-bar-section">
                <SideBarError>
                  <Route exact path="/" component={MainSideBar} />
                  <Route
                    exact
                    path="/folder/:folderId"
                    component={ListSideBar}
                  />
                  <Route path="/note/:noteId" component={NoteSideBar} />
                </SideBarError>
              </section>
              <section className="main">
                <NoteListWindowError>
                  <Route exact path="/" component={NoteList} />
                  <Route path="/folder/:folderId" component={FolderNoteList} />
                  <Route path="/note/:noteId" component={Note} />
                </NoteListWindowError>
              </section>
            </div>
            <Route component={NotFound} />
          </Switch>
        </AppContext.Provider>
      </main>
    );
  }
}

export default App;
