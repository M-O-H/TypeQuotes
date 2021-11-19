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
	console.log(props)
	return(
		<>
			{/* <img width={'25%'} src={props.img}/> */}
			<UserWrapper>
				<span>{props.username}</span>
			</UserWrapper>
			<H>{serialize(props.wpm)}</H>
			<H>{serialize(props.rank)}</H>
		</>
	)
}

export default Card;