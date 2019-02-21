import ReactDOM from "react-dom";
import React from 'react';
import Chat from './Chat';

export const renderChat = (parentId) => {
	ReactDOM.render(<Chat />, document.getElementById(parentId));
};