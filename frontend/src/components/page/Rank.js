import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios';
const Board = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0em 11em;
`

const Wrapper = styled.div`
	display: flex;
	justify-content: space-around;
	align-item: center;
	background: var(--text-color);
	margin: 10px;
`

const Filed = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`
const Avatar = styled.img`
	width: 3em;
	height: 3em;
`

const LeaderBoard = () => {
	const [players, setPlayers] = useState([])

	const fetchUsers = async() => {
		fetch('/board').then(res => {
			if(res.ok)
			 return res.json()
		}).then(data => setPlayers(data))
	}

	useEffect(() => {
		document.onkeydown = null;
		fetchUsers()
	});

	return (
		<Board>
			{
				players.map(ply => 
					<div key={ply.googleId}>
						<Wrapper>
						<Avatar src={ply.img} />
						<Filed>{ply.googleId}</Filed>
						<Filed>{ply.username}</Filed>
						<Filed>{ply.rank}</Filed>
						<Filed>{ply.wpm}</Filed>
						</Wrapper>
					</div>
					)
			}
		</Board>
	)
}

export default LeaderBoard