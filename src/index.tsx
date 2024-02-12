import React from 'react';
import ReactDOM from 'react-dom/client';
import AnswerContainer from "./components/AnswerContainer";

const inner = document.createElement('div');
inner.setAttribute("id", "cheat-sheet-root");
document.body.append(inner);

const root = ReactDOM.createRoot(document.getElementById('cheat-sheet-root')!);

root.render(<React.StrictMode><AnswerContainer /></React.StrictMode>);
