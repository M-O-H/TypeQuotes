import  React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-item: center;
`

const H = styled.h1`
	color: var(--text-color);
`
const Avatar = styled.img`
	width: 3em;
	height: 3em;
`
const Card = ({props}) => {
	return(
		<Wrapper>
			<Avatar src={props.img}/>
			<H>{JSON.stringify(props.username)}</H>
			<H>{JSON.stringify(props.wpm)}</H>
			<H>{JSON.stringify(props.rank)}</H>
		</Wrapper>
	)
}

export default Card;