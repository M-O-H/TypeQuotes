import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Spinner from 'react-bootstrap/Spinner'

const Board = styled.div`
`

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	background: var(--quoteBox-background);
	align-items: center;
	border-radius: .6em;
	margin: 1em 0;
	padding: .6em 0; 
`
const Filed = styled.div`
	text-align: center;
	font-size: .9rem;
	color: #fff;
`
const Avatar = styled.img`
	width: 3em;
	height: 3em;
`
const Attribute = styled.div`
display: grid;
grid-template-columns: repeat(5, 1fr);
align-items: center;
border-radius: .7em;
`
const H1 = styled.div`
	font-size: 1rem;
	text-align: center;
	color: #fff;
	color: var(	--quoteBox-text-color)
`

const Table = styled.div`
	background-color: var--quoteBox-background);
	height: 100%;
	`


const SpinnerWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
`

const LeaderBoard = () => {
	const [players, setPlayers] = useState(()=>null)
	var rank = 1;
	const fetchUsers = async() => {
		fetch('/board').then(res => {
			if(res.ok) return res.json()})
		.then(data => setPlayers(data))
		.catch(err =>{ if(err) throw err})
	}

	

	useEffect(() => {
		fetchUsers()
	}, []);


	return (
		<Board>
			<Attribute>
				<H1>#</H1>
				<H1></H1>
				<H1>username</H1>
				<H1>rank</H1>
				<H1>wpm</H1>
			</Attribute>
			<Table>
			{
				players === null ? <SpinnerWrapper className="SpinnerWrapper"><Spinner className="spinner" animation="border" /></SpinnerWrapper>
				:
				players.map(ply => 
					<div key={ply.googleId}>
						<Wrapper className="box">
							<Filed>{rank++}</Filed>
							<Filed><Avatar src={ply.img}/></Filed>
							<Filed>{ply.username}</Filed>
							<Filed>{ply.rank}</Filed>
							<Filed>{ply.wpm}</Filed>
						</Wrapper>
					</div>
				)
			}
			</Table>
		</Board>
	)
}

export default LeaderBoard