import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Card from '../components/Card'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-item: center;
	padding: 0 3em;
`

const SpinnerWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;`

const Profile = () => {
	const [user, setUser] = useState(()=>null)

	useEffect(() => {
		const source = axios.CancelToken.source();
		const fetchUser = async (token) => {
			await axios.get("/userInfo", { cancelToken: token})
			  .then(response => {
				if(response.status == 200)
					setUser(response.data)
				else setUser(null)
			  })
			  .catch((error) => { 
					if(error.response.status === 500)
						console.log("server error")
					else 
						console.log(error.response.data)
				setUser(null)
			  })
		}

		fetchUser(source.token);
	  	return () => {
            source.cancel();
        };
	}, [])
	
	return(
		<Wrapper>
			{user === null ?  <SpinnerWrapper className="SpinnerWrapper"><Spinner className="spinner" animation="border" /></SpinnerWrapper>
			: <Card props={user}/>
			}
		</Wrapper>
	)
}

export default Profile;