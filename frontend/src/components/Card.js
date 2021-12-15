import  React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%

`
const CarWrapper  = styled.div`
	display: grid;
	width: 70%;
	border-radius: 1rem;
	grid-template-rows; 1fr auto;
	background-color: var(--quoteBox-background);
`
const Avatar = styled.img`
	width: 18%;
	border-radius: 10em;
`
const Banner = styled.div`
	display: flex;
	flex-direction: column;
	color: var(--icons-text-color);
	align-items: center;
	padding: 1em;
`
const Status = styled.div`
	padding: 1rem;
`
const StatusBar = styled.div`
	display: flex;
	border-radius: .3rem;
	align-items: center;
	background: var(--body-background);
	color: var(--icons-text-color);
`

const Gap = styled.div`
	width: 10%;
	border-radius: 10rem;
	background: white;
`

const Filed = styled.div`
	width: 100%;
	dispaly: flex;
	text-align: center;
	flex-direction: column;
	line-height: 1.4em;
	font-size: 1.8rem;
	padding: 1rem 0;
`

const Title = styled.div`
	font-size: 1rem
`

const Card = ({props}, { serialize = JSON.stringify , deserialize = JSON.parse }) => {
	const logout = async () => {
		document.cookie('express:sess', )
	}

	return(
		<Container>
			<CarWrapper>
				<Banner>
					<Avatar src={props.img}/>
					<h2>{props.username}</h2>
				</Banner>
				<Status>
					<StatusBar>
						<Gap></Gap>
						<Filed>
							<div>{serialize(props.wpm)}</div>
							<Title>Wpm</Title>
						</Filed>
						<Gap></Gap>
						<Filed>
							<div>{serialize(props.accuracy)}%</div>
							<Title>Accuracy</Title>
						</Filed>
						<Gap></Gap>
						<Filed>
							{props.rank}
							<Title>Rank</Title>
						</Filed>
					</StatusBar>
				</Status>
			</CarWrapper>
		</Container>
	)
}

export default Card;