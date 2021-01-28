import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import AppContext from '../AppContext';

function ListSideBar() {
  return (
    <AppContext.Consumer>
      {({ folders }) => (
        <div className="side-bar">
          <Link to="/add-folder">
            <button className="add-folder-button">Add Folder</button>
          </Link>

          {folders.map((folder) => {
            return (
              <NavLink
                key={folder.id}
                to={`/folder/${folder.id}`}
                className="folder-link"
                activeClassName="selected"
              >
                {folder.name}
              </NavLink>
            );
          })}
          <button className="add-folder-button">
            <Link to="/add-folder">Add Folder</Link>
          </button>
        </div>
      )}
    </AppContext.Consumer>
  );
}

export default ListSideBar;
