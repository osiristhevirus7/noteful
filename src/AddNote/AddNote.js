import React from 'react'
import AppContext from '../AppContext';
import PropTypes from 'prop-types'

class AddNote extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props)
        this.state = {
            noteName: '',
            noteContent: '',
            targetFolderId: ''
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const { addNote } = this.context;
        const modified = new Date().toISOString();

        fetch('http://localhost:9090/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.noteName,
                modified: modified,
                folderId: this.state.targetFolderId,
                content: this.state.noteContent,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('We could not post this new note')
                }
                return response.json()
            })
            .then(data => {
                addNote(data);
                this.setState({
                    noteName: '',
                    noteContent: '',
                    targetFolderId: ''
                })
                this.props.history.goBack();
            })
            .catch(err => {
                alert(err);
            })
    }

    updateNoteName(newNoteName) {
        this.setState({
            noteName: newNoteName
        })
    }

    updateNoteContent(newNoteContent) {
        this.setState({
            noteContent: newNoteContent
        })
    }

    updateTargetFolder(newTargetFolder) {
        this.setState({
            targetFolderId: newTargetFolder
        })
    }

    render() {
        const { folders } = this.context;

        const selectOptions = folders.map((folder, i) => {
            return (
                <option key={i} value={folder.id}>{folder.name}</option>
            )
        })

        return (
            <div className='AddNote'>
                <form className='addNoteForm' onSubmit={e => this.handleSubmit(e)}>
                    <fieldset>
                        <legend>Add a New Note!</legend>

                        <label htmlFor='noteName'>Note Name:</label>
                        <br></br>
                        <input type='text' name='noteName' id='noteName'
                            value={this.state.noteName}
                            onChange={e => this.updateNoteName(e.target.value)} />

                        <br></br>

                        <label htmlFor='noteContent'>Note Content:</label>
                        <br></br>
                        <textarea id="noteContent" name="noteContent" rows="4" cols="50"
                            value={this.state.noteContent}
                            onChange={e => this.updateNoteContent(e.target.value)} />

                        <br></br>

                        <label htmlFor='targetFolder'>Add to Which Folder?</label>
                        <br></br>
                        <select name='targetFolder' id='targetFolder'
                            onChange={e => this.updateTargetFolder(e.target.value)}>
                            <option value={''}>---</option>
                            {selectOptions}
                        </select>

                        <br></br>

                        <button type='submit'
                            disabled={
                                !(this.state.noteName.length > 0) ||
                                !(this.state.noteContent.length > 0) ||
                                !(this.state.targetFolderId.length > 0)
                            }>
                            Create New Note!
                        </button>
                    </fieldset>
                </form>
                <button onClick={() => this.props.history.goBack()}>
                    Cancel
                </button>
            </div>
        )
    }
}

AddNote.propTypes = {
    history: PropTypes
        .object,
    goBack: PropTypes
        .func
}

export default AddNote;
