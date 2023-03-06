import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


function RenderRoot(componet, rootes) {
    const root = ReactDOM.createRoot(document.getElementById(`${rootes}`));
    root.render(componet);
}
RenderRoot(<App/>, 'root');




