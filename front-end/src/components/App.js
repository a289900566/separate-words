import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import store from '../state/store'
import axios from 'axios'
import { connect } from "react-redux";

import Table from './Table'
import Login from './Login'
import Home from './Home'

class App extends React.Component {
  async componentWillMount() {
    let state = store.getState()
    let res = await axios({
      method: 'post',
      url: `${state.path}/api/login`,
      withCredentials: true
    })
    if (res.data.code != 0) {
      if (window.location.pathname != '/login') window.location.pathname = 'login'
      return 
    }
    store.dispatch({ type: 'SET_IS_LOGIN', isLogin: true })
    store.dispatch({ type: 'SET_USER', user: res.data.user })
  }

  render () {
    let { isLogin } = this.props
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact component={ Login }></Route>
          <Route path='/table' render={props => {
            return isLogin ? <Table bordered {...props}/> : null
          }}/>
          <Route path='/' render={props => {
            return isLogin ? <Home {...props}/> : null
          }}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

let mapStateToProps = state => state

export default connect(mapStateToProps)(App)