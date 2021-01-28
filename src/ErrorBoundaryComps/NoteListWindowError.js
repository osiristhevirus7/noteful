import React from 'react';
import { withRouter } from 'react-router-dom';

class NoteListWindowError extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>
            Sorry, it looks like we were unable to retrieve your notes. Please
            refresh the page and try again.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default withRouter(NoteListWindowError);
