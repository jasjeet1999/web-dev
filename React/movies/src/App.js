import './App.css';
import React from 'react';
import MoviesList from './containers/moviesList';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <MoviesList/> {/* class component */}
      </div>
    );
  }
  
}


export default App;