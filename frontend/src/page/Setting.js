import React, {useRef, useEffect} from 'react'
import styled  from 'styled-components'

const Container = styled.div`
height: 100%;
`;

const ThemeBtn = styled.div`
align-self: start;
text-align: center;
font-size: 1rem;
padding: .4rem;
cursor: pointer;
color: #fff;
box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
border-radius: 4px;
transition: all 500ms;
`;

const CardWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const GridWrapper = styled.div`
display: grid;
align-items: center;
grid-template-columns: repeat(3, 1fr);
grid-template-columns: repeat(3, minmax(200px, 1fr));
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
gap: 1rem;
padding: 0 3rem;
width: 100%;
`
const Header = styled.div`
	font-size: 20px;
	padding: 2rem;
	text-align: center;
	color: var(--text-color)
`;


const settting = () => {
	console.log('redener ')

	const ref = useRef('default')
	const setTheme = (selectedTheme) => {
		document.body.classList.replace(ref.current, selectedTheme)
		ref.current = selectedTheme
		localStorage.setItem('theme', ref.current)
	}


	useEffect(() => {
		document.onkeydown = null;
	}, [])
	return(
		<Container>
			<Header>Themes</Header>
			<CardWrapper>
				<GridWrapper>
				<ThemeBtn className="DefaultBtn" onClick={()=>setTheme('default')}>Default</ThemeBtn>
				<ThemeBtn className="ishtarBtn" onClick={()=>setTheme('ishtar')}>Ishtar</ThemeBtn>
				<ThemeBtn className="bentoBtn"  onClick={()=>setTheme('bento')}>bento</ThemeBtn>
				<ThemeBtn className="archBtn"  onClick={()=>setTheme('arch')}>Arch</ThemeBtn>
				<ThemeBtn className="campingBtn"  onClick={()=>setTheme('camping')}>camping</ThemeBtn>
				{/* <ThemeBtn className="ishtarBtn" onClick={()=>setTheme('ishtar')}>Ishtar</ThemeBtn>
				<ThemeBtn className="bentoBtn"  onClick={()=>setTheme('bento')}>bento</ThemeBtn>
				<ThemeBtn className="archBtn"  onClick={()=>setTheme('arch')}>Arch</ThemeBtn>
				<ThemeBtn className="campingBtn"  onClick={()=>setTheme('camping')}>camping</ThemeBtn> */}
				</GridWrapper>
			</CardWrapper>
		</Container>
	)
}

export default settting;