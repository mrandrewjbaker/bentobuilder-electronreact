import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';


import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App  />
    </Provider>
  </React.StrictMode>
, document.getElementById('root'));

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('project', (arg: any) => {
  // eslint-disable-next-line no-console
  console.log(arg + 'ok');
});

window.electron.ipcRenderer.projectCreate();
