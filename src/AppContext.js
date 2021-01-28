import React from 'react';

const AppContext = React.createContext({
  folders: [],
  notes: [],
  handleNoteDelete: () => {},
  handleAddFolder: () => {},
  handleAddNote: () => {},
});

AppContext.displayName = 'AppContext';

export default AppContext;
