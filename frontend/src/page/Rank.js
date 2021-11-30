import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'

const Board = styled.div`
`

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
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
grid-template-columns: repeat(6, 1fr);
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

	

	useEffect(() => {
		const source = axios.CancelToken.source();
		const fetchUsers = async(token) => {
			await axios.get('/board', { cancelToken: token})
			.then(response => {
				if(response.status == 200)
					setPlayers(response.data)
				else setPlayers(null)
			})
			.catch(error => {
				if(error.response.status == 500)
					console.log('netwrok error')
			})
		}

		fetchUsers(source.token);
	  	return () => {
            source.cancel();
        };
	}, []);


	return (
		<Board>
			<Attribute>
				<H1>#</H1>
				<H1></H1>
				<H1>username</H1>
				<H1>rank</H1>
				<H1>wpm</H1>
				<H1>accuracy</H1>
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
							<Filed>{ply.accuracy}%</Filed>
						</Wrapper>
					</div>
				)
			}
			</Table>
		</Board>
	)
}

export default LeaderBoard