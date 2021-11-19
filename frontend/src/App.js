import React, {useState, useEffect}from 'react';
import { Input, Header, Setting, Login, Profile, Rank} from './components/index'
import { BrowserRouter as Router, Redirect, Route , Switch} from "react-router-dom";
import styled from 'styled-components';
import './theme/themes.css'
import './App.css'

const Content = styled.div`
max-width: 1000px;
width: 100%;
display: grid;
grid-template-rows: auto 1fr auto;
grid-auto-flow: row;
gap: 1em;
min-height: 100vh;
padding: 2rem;
`

const Footer = styled.div`
  color: #fff;
`

// custome component to make https requests
function App() {
  const [auth, setAuth] = useState(()=>false)

  const fetchUser = async () => {
    await fetch("/user")
          .then(res => res.json())
          .then(data => {
            if(data === 'no user login')
              setAuth(false)
            else setAuth(true)
          })
          .catch(err => { if(err) setAuth(false) })
  }

  useEffect(() => {
    fetchUser()
  }, [])
  return (
      <div   className={'App'}>
        <Router>
          <Content>
            <Header />
            <Switch>
              <Route path="/" exact component={Input}/>
              <Route path="/settings" exact component={Setting}/>
              <Route path="/failed">Error loging in. please try again later!</Route>
              <Route path="/success" exact >thanks for login in </Route>
              <Route path="/login" exact component={Login}/>
              <Route path="/rank" exact component={Rank}/>
              {
                auth === true ? 
              <Route path="/profile" exact component={Profile}/> : <Redirect to="/login" />
              }
            </Switch>
          </Content>
        </Router>
      </div>
  );
}

export default App;
