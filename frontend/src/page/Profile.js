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


let obj = {
	img:'loadding..',
	username:'loadding...',
	wpm:12,
	rank:'loadding...'
}

const Profile = () => {
	const [user, setUser] = useState(()=>obj)
	const fetchUser = async()=>{
		await fetch("/userInfo").then(res => res.json())
		.then(jsonRes => setUser(jsonRes))
		.catch((err)=> console.log(err))
	}
	useEffect(() => {
		fetchUser()
		document.onkeydown = null;
	}, [])
	
	return(
		<Wrapper>
			<Card props={user}/>
		</Wrapper>
	)
}

export default Profile;