import React, {useRef} from 'react'
import styled  from 'styled-components'

const Container = styled.div`
	width: 100%;
	padding: 1rem 10rem;
`;

const ThemedButton = styled.button`
	border: 1px solid;
	border-radius: 3px;
    padding: 10px;
    font-size: 14px;
	text-align: center;
	outline: none;
    cursor: pointer;
`;

const CardWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-gap: 1rem;
	padding: 1rem 2rem;
	// background-color: #27252585;
`;
const Header = styled.h2`
	font-size: 20px;
	text-align: center;
	color: var(--text-color)
`;


const settting = () => {
	const ref = useRef('default')

	document.onkeydown = null;
	const setTheme = (selectedTheme) => {
		document.body.classList.replace(ref.current, selectedTheme)
		ref.current = selectedTheme
		localStorage.setItem('theme', ref.current)
	}

	return(
		<Container>
			<Header>Themes</Header>
		<CardWrapper>
			<ThemedButton className="DefaultBtn" onClick={()=>setTheme('default')}>Default</ThemedButton>
			<ThemedButton className="ishtarBtn" onClick={()=>setTheme('ishtar')}>Ishtar</ThemedButton>
			<ThemedButton className="bentoBtn"  onClick={()=>setTheme('bento')}>bento</ThemedButton>
			<ThemedButton className="archBtn"  onClick={()=>setTheme('arch')}>Arch</ThemedButton>
			<ThemedButton className="campingBtn"  onClick={()=>setTheme('camping')}>camping</ThemedButton>
		</CardWrapper>
		</Container>
	)
}

export default settting;