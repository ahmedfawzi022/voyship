import React from 'react';
import { render } from 'react-dom'
import Root from './routes';
import * as serviceWorker from './serviceWorker';
import './scss/index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'tabler-react/dist/Tabler.css';
import 'c3/c3.css';
import './scss/App.scss';

render( <Root /> , document.getElementById('root'));
serviceWorker.unregister();
