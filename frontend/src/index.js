import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const theme = localStorage.getItem('theme');

const Index = () => {
  if(theme) document.body.classList.add(theme)
  return <App />
}
ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
