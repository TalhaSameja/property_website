// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import App from './App';
// import { store } from './store/index.js';
// import './index.css';


// ReactDOM.createRoot(document.getElementById('root')).render(
  //   <React.StrictMode>
  //     <Provider store={store}>
  //       <App />
  //     </Provider>
  //   </React.StrictMode>
  // );
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './App';
  import { Provider } from 'react-redux';
  import store from './store/index.js'; // <- this must export a properly configured store
  import './index.css';
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
