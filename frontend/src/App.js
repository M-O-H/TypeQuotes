import React, {useState, useEffect}from 'react';
import { Input, Header, Setting, Login, Profile, Rank} from './components/index'
import { BrowserRouter as Router, Redirect, Route , Switch} from "react-router-dom";
import './App.css'
import './theme/themes.css'

function App() {
  const [auth, setAuth] = useState(()=>false)

  const fetchUser = async () => {
    await fetch("/user")
          .then(res => res.json())
          .then(data => {
            setAuth(true)
          })
          .catch(err => { if(err) setAuth(false) })
  }

  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <Router>
      <div   className={'App'}>
        <Header />
        <Switch>
          <Route path="/" exact component={Input}/>
          <Route path="/settings" exact component={Setting}/>
          <Route path="/failed">Error loging in. please try again later!</Route>
          <Route path="/success" exact >thanks for login in </Route>
          <Route path="/login" exact component={Login}/>
          <Route path="/Rank" exact component={Rank}/>
          {
            auth === true ? <Route path="/profile" exact component={Profile}/> : <Redirect to="/login" />
          }
        </Switch>
      </div>
    </Router>
  );
}

export default App;
