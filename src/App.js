import React from 'react';
import './styles/App.css';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import UserInput from './components/UserInput';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <ErrorBoundary>
        <UserInput />
      </ErrorBoundary>
    </div>
  );
}

export default App;
