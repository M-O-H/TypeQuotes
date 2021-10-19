import React, {useState, useEffect} from 'react';
import GoogleButton from 'react-google-button';
import styled from 'styled-components'
import { Redirect } from "react-router-dom";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-item: center;
	padding: 3rem;
`


const redirectToGoogleSSO = async ()=> {
	const googleLoginURL = "http://localhost:3001/auth/google";
	const HgoogleLoginURL = "/auth/google/";
	window.open(googleLoginURL,"_self", "width=500, height=600");
}

const Login = () => {
	const [auth, setAuth] = useState(()=>false)
  
	const fetchUser = async () => {
	  await fetch("/user")
			.then(res => res.json())
			.then(data => {
			  setAuth(true)
			})
			.catch(err => {if(err) setAuth(false)})
	}
	useEffect(() => {
	  fetchUser()
	  document.onkeydown = null;
	}, [])

	return (
		<Container>
			{
				// loader === false? <SpinnerWrapper className="SpinnerWrapper"><Spinner className="spinner" animation="border" /></SpinnerWrapper> :
				auth ? <Redirect to="/profile" /> : 
				<GoogleButton onClick={redirectToGoogleSSO} style={{width: "17em"}}/>
			}
		</Container>
	)
}

export default Login;