import  React from 'react'
import styled from 'styled-components'

const UserWrapper  = styled.div`
	display: flex;
	align-items: center;
	background: var(--quoteBox-background);
`
const H = styled.h1`
	color: var(--text-color);
`
const Avatar = styled.img`
	width: 3em;
	height: 3em;
`
const TestImg = styled.span`
background: lightblue;
padding: 3rem;
border-radius: 5rem;
`
const Card = ({props}, { serialize = JSON.stringify , deserialize = JSON.parse }) => {
	return(
		<>
			<img width={'25%'} src={props.img}/>
			<UserWrapper>
			</UserWrapper>
				<H>{props.username}</H>
			<H>{serialize(props.wpm)}</H>
			<H>{serialize(props.accuracy)}%</H>
			<H>{serialize(props.rank)}</H>
			<a href='/auth/logout'>logout</a>
		</>
	)
}

export default Card;