import React, { useState, useEffect, useRef, createRef } from 'react'
import styled  from 'styled-components'
import Status from './Status';
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';
import '../style/style.css'

const BoxWrapper = styled.div`
display: flex;
border-radius; 10px;
justify-content: center;
align-items: center;
flex-direction: column;
`;

const Didsplayquote = styled.div`
align-items: center;
display: grid;
grid-row-flow: column;
gap: 2rem;
width: fit-content;
font-family: var(--quoteBox-fontFamily);
background-color: var(--quoteBox-background);
color: var(--quoteBox-text-color);
transition: background 500ms, color 700ms ease-in-out;
padding: 1em;
border-radius: .6em;
`;

const SpinnerWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;`

const Textwrapper = styled.div`
	padding-top: .4rem;
`
const Button = styled.button`
background: none;
border: none;
margin-left: auto;
color: var(	--text-color);
`

const Btn = styled.button`
font-family: var(--quoteBox-fontFamily);
background-color: var(--quoteBox-background);
color: var(	--text-color);
border: none;
`

const Lable = styled.div`
	display: flex;
	color: #d4d4d481;
	padding: .4em 0;
`
const State = styled.div`
padding: 8px 0;
display: grid;
grid-template-columns: repeat(2, 1fr);
color: var(	--text-color);
gap: 1.5em;
`
const Adjust = styled.div`
display: flex;
align-items: center;
gap: 1em;
padding: 10px 0;
`

const AdBtn = styled.li`
list-style-type: none;
cursor: pointer;
font-size: 1.4em;
font-family: var(--quoteBox-fontFamily);
color: var(	--text-color);
border: none;
border-radius: .2em;
`
const Input = ()=>{
	const [user, setUser] = useState(null)
	const [quote, setQuote] = useState({});
	const [maxLength, setMaxLength] = useState(()=>40)
	const [index, setIndex] = useState(()=>{i:0})
	const [result, setResult] = useState(null)
	const [loaded, setLoaded] = useState(()=>false)
	const [correct, setCorrect] = useState({c:0})
	const [startTime, setStartTune] = useState({t:null})
	const [game, setGame] = useState(()=>'off')
	const elRefs = useRef([])

	const fetchQuotes = async()=>{
		resetGame()
		await axios.get(`https://api.quotable.io/random?minLength=${maxLength}`)
		.then(res => {
			elRefs.current = 
			Array(res.data.content.length).fill().map((_, i) => 
				elRefs.current[i] || createRef());
				setQuote(res.data);
				setLoaded(true)
		})
		.catch((err) => {
			throw err;
		})
	}

	const fetchUser = async (token) => {
		await axios.get("/user", { cancelToken: token})
		  .then(response => {
			if(response.data.status == 200){
			  setUser(response.data.user)
			}
			setUser(null);
		  })
		  .catch((error) => { 
			if(error.response.status === 500)
			  console.log("server error")
			else console.log(error.response.data)
		  })
	  }

	const getResult = () => {
		const endTime = new Date();
		const seconds =(endTime - startTime.t) / 1000;
		const numberOfWords = quote.content.split(' ').length;
		const incorrect = quote.content.split('').length - correct.c;
		const check = incorrect - quote.content.split('').length;
		const acc = Math.floor(((correct.c - incorrect) / quote.content.length) * 100);;
		const accuracy = acc > 0 ? acc : 0
		const wpm = accuracy == 0 ? 0 :  Math.floor(( numberOfWords / seconds) * 60);
		setResult({wpm:wpm, accuracy:accuracy, quoteInfo:quote, id:user})
	}

	const checkChar = (key, ele) => {
		var temIndex = index
		var temCorrect = correct
		if(startTime.t==null)
			setStartTune(startTime.t = new Date())
		if(key === ele[temIndex.i].current.innerText){
			ele[temIndex.i].current.className = 'done'
			temIndex.i += 1
			temCorrect.c += 1
			setCorrect(temCorrect)
			setIndex(temIndex)
		}
		else if(key === 'Backspace' && temIndex.i > 0){
			temCorrect.c -= 1
			ele[temIndex.i].current.className = ''
			temIndex.i -= 1
			setIndex(temIndex)
			ele[temIndex.i].current.className = ''
		}
		else if(key !== ele[temIndex.i].current.innerHTMLL){
			ele[temIndex.i].current.className = 'incorrect'
			temIndex.i += 1
			setIndex(temIndex)
		}
		if(temIndex.i == ele.length){
			getResult()
			window.removeEventListener('keydown', handlekeyDown);
			
		}
		else ele[temIndex.i].current.className = 'cursor'
	}

	const handlekeyDown = (e) => {
		let currentChar = elRefs.current
		if(game === 'off')
			setGame('on')
		checkChar(e.key, currentChar)
		
	}

	const adjustQuote = (length) => {
		setMaxLength(length);
	}
	const handleClick = (e) => {
		e.target.blur();
		fetchQuotes()
	}

	// initialize state variables

	const resetGame = () =>{
		setResult(null)
		setLoaded(false)
		setIndex({i:0})
		setCorrect({c:0})
		setGame('off')
	}

	useEffect(() => {
		const source = axios.CancelToken.source();
		fetchQuotes();
		fetchUser(source.token);
	}, [maxLength]);


	useEffect(() => {
		if(loaded == true){
			elRefs.current.map((ele, i) => {
				if(i == 0) ele.current.className = 'cursor'
				else ele.current.className = null
			} )
		}
		window.addEventListener('keydown', handlekeyDown);
		return () => window.removeEventListener('keydown', handlekeyDown);
	}, [quote])



	return (
		<BoxWrapper> 
			<Didsplayquote >
				<Textwrapper>
					{result == null ?
					<>
					{loaded? 
						<>
							<Adjust>
								<AdBtn onClick={()=>adjustQuote(10)}>10</AdBtn>/
								<AdBtn onClick={()=>adjustQuote(100)}>25</AdBtn>/
								<AdBtn onClick={()=>adjustQuote(200)}>50</AdBtn>/
								<AdBtn onClick={()=>adjustQuote(300)}>100</AdBtn>
							</Adjust>
							{quote.content.split('').map((char, id) => {
								if(id==0)
									return <span  ref={elRefs.current[id]}  key={id} className="cursor">
									{char.toLowerCase()}
									</span>
								else return <span  ref={elRefs.current[id]}  key={id} className="">
								{char.toLowerCase()}
								</span>
							})}
							<Lable>
								<State>
									<div>Game / {game}</div>
									<div>Words / {quote.content.split(' ').length}</div>
								</State>
								<Button type="submit"tabindex="-1" onClick={handleClick} className="disabled" >
									Next quote
									<span  className="iconify" data-icon="grommet-icons:form-next-link"></span>
								</Button>
							</Lable>
						</>
						: 
						<SpinnerWrapper className="SpinnerWrapper">
							<Spinner className="spinner" animation="border" />
						</SpinnerWrapper>
					}
					</>
					:
					<>
						<Status result={result}/>
						<Button type="submit"tabindex="-1" onClick={handleClick} className="disabled" >
							Next quote
							<span  className="iconify" data-icon="grommet-icons:form-next-link"></span>
						</Button>
					</>
					}
				</Textwrapper>
			</Didsplayquote>
		</BoxWrapper>
	)
}

export default Input