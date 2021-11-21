import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Card from '../components/Card'
import Spinner from 'react-bootstrap/Spinner'

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
	const fetchUser = async()=>{
		await fetch("/userInfo").then(res => res.json())
		.then(jsonRes => setUser(jsonRes))
		.catch((err)=> console.log(err))
	}
	useEffect(() => {
		fetchUser()
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