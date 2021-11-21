import React, {useState, useEffect} from 'react'
import { Redirect } from "react-router-dom"
import GoogleButton from 'react-google-button'
import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-item: center;
	padding: 3rem;
`

// /auth/google/
const redirectToGoogleSSO = async ()=> {
	const googleLoginURL = "http://localhost:3001/auth/google";
	window.open(googleLoginURL,"_self", "width=500, height=600");
}

// lift and colocating components

const Login = () => {
	const [auth, setAuth] = useState(()=>false)
  
	const fetchUser = async () => {
	  await fetch("/user")
			.then(res => res.json())
			.then(data => {
				if(data === 'no user login')
				  setAuth(false)
				else setAuth(true)
				})
			.catch(err => {if(err) setAuth(false)})
	}

	useEffect(() => {
	  fetchUser()
	}, [auth])

	return (
		<Container>
			{
				auth ? <Redirect to="/profile" /> : 
			<GoogleButton onClick={redirectToGoogleSSO} style={{width: "17em"}}/>
			}
		</Container>
	)
}

export default Login;