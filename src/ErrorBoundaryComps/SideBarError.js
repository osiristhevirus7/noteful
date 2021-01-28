import React from 'react';
import { withRouter } from 'react-router-dom';

class SideBarError extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <p>
          Sorry, it looks like we were unable to retrieve your folders. Please
          refresh the page and try again.
        </p>
      );
    }
    return this.props.children;
  }
}

export default withRouter(SideBarError);
