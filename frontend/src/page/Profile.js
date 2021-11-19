import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Card from '../components/Card'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-item: center;
	padding: 0 3em;
`


const Profile = () => {
	const [user, setUser] = useState(()=>{})

	useEffect(() => {
		document.onkeydown = null;
		fetch("/userInfo").then(res => res.json())
		.then(jsonRes => {
			if(!jsonRes === 'no user found')
				setUser(jsonRes)
		})
		.catch((err)=> console.log(err))
	}, [user])
	
	return(
		<Wrapper>
			<Card props={user}/>
		</Wrapper>
	)
}

export default Profile;