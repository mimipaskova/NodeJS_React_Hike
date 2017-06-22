import React, { Component } from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './App.css';
import axios from 'axios';
import Welcome from './pages/welcome';
import Login from './components/login';
import Register from './components/register';
import Profile from './components/profile';
import StoryContainer from './components/storyContainer';
import ViewStory from './components/viewStory';
import AddStory from './components/addStory';
import EditStory from './components/editStory';

class App extends Component {

  state = {users: []}

  componentDidMount() {
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users }));
    axios.get('/users')
      // .then(res => res.data)
      .then(res => this.setState({ users:res.data }));
  }

  render() {
    return (
      <BrowserRouter>
          <div>
          <Route exact path="/" component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/add" component={AddStory} />
          <Route path="/edit/:id" component={EditStory} />
          <Route path="/story" component={StoryContainer} />
          <Route path="/storyy/:id" component={ViewStory} />
          </div>
      </BrowserRouter>

    );
  }
}

export default App;


/*
      <div className="App">
        <Login />
        <Register />
        <AddStory />
        <StoryContainer />
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>*/