import React from 'react';
import ReactDOM from 'react-dom';
import './static/index.css';
import App from './app/App';
import registerServiceWorker from './tools/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
