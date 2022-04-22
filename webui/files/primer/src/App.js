import './App.css';
import { StartPage } from './StartPage';
import UserPage from './UserPage';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {showLoginScreen: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick(){
    this.setState(state => ({
      showLoginScreen: !this.state.showLoginScreen
    }));
  }

  render(){
    return (
      <div className="App">
        <StartPage login={this.state.showLoginScreen}/>
        <button onClick={this.handleToggleClick}>
          {this.state.showLoginScreen ? 'Not logged in' : 'Logged in'}
        </button>
        <UserPage/>
      </div>
    );
  }
}
export default App;
