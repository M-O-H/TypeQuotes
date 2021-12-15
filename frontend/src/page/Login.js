import React, {useState, useEffect} from 'react'
import { Redirect } from "react-router-dom"
import GoogleButton from 'react-google-button'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-item: center;
	padding: 3rem;
`

const redirectToGoogleSSO = async ()=> {
	const googleLoginURL = "http://localhost:3001/auth/google";
	window.open(googleLoginURL,"_self", "width=500, height=600");
}

const Login = () => {
	const [auth, setAuth] = useState(()=>false)

	useEffect(() => {
		const source = axios.CancelToken.source();
		const fetchUser = async (token) => {
			await axios.get("/user", { cancelToken: token})
			  .then(response => {
				if(response.data.status == 200)
					setAuth(true)
				else setAuth(false)
			  })
			  .catch((error) => {
					if(error.response.status === 500)
						console.log("server error")
					else console.log(error.response.data)
			  })
		}

		fetchUser(source.token);
	  	return () => {
            source.cancel();
        };
	}, [])

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