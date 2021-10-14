import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Card from './Card'


const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-item: center;
	padding: 3em;
`

const Profile = () => {
	const [user, setUser] = useState({})

	useEffect(() => {
		document.onkeydown = null;
		fetch("/profile").then(res => {
			if(res.ok)
				return res.json()
		}).then(jsonRes => {
			setUser(jsonRes)
		}).catch((err)=>{
			console.log(err)
		})
	}, [])
	
	return(
		<Wrapper>
			<Card props={user}/>
		</Wrapper>
	)
}

export default Profile;