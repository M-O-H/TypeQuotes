import React, { useState, useEffect } from 'react'
import { getResult ,replace } from './keyPress';
import styled  from 'styled-components'
import Status from './Status';
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';
import '../style/style.css'

var correctLetters = 0;
var startTime = null;
var mistakes = 0;
var  index = 0;
var string = 0;

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
color: #E9E1E1;
border: none;
margin-left: auto;
`

const Btn = styled.button`
font-family: var(--quoteBox-fontFamily);
background-color: var(--quoteBox-background);
color: var(	--text-color);
border: none;
`

const Lable = styled.div`
	display: flex;
	color: #E9E1E1;
	padding: .4em 0;
`
const State = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 1.5em;
`

const handleKeyPress = (e, text)=>{
	const arrayQuote = document.querySelectorAll('span');
	let cursorCharacter =  arrayQuote[index];
	arrayQuote[0].style.backgroundColor = 'initial';
	if(!startTime)
		startTime = new Date();
	if(e.keyCode === 8 && index > 0){
		--correctLetters;
		--string;
		cursorCharacter.classList.remove('cursor');
		cursorCharacter =  arrayQuote[--index];
		cursorCharacter.classList.remove('incorrect', 'done');
	}
	else if(string >= 93){
		console.log("inc")
	}
	else if(e.key === cursorCharacter.innerText ){
		++correctLetters;
		string = 0;
		replace(cursorCharacter, ['done', 'incorrect', 'cursor']);
		cursorCharacter =  arrayQuote[++index];
	}
	else if(e.key !== cursorCharacter.innerText){
		++mistakes;
		++string;
		replace(cursorCharacter, ['incorrect', 'done', 'cursor']);
		cursorCharacter =  arrayQuote[++index];
	}
	if(index  >= text.length){
		var result = getResult(arrayQuote,text, startTime, correctLetters, mistakes);
		return result
	}	
	cursorCharacter.classList.add('cursor');
};


const Input = ()=>{
	index = 0;
	correctLetters = 0;
	startTime = null;
	mistakes = 0;
	index = 0;

	const [quote, setQuote] = useState(()=>'');
	const [loading, setLoading] = useState(()=>true);
	const [result, setResult] = useState(()=>null);
	const [game, setGame] = useState(()=>'off')

	const KeyDownEvent = () => {
		document.onkeydown =((e)=>{
			if(game==='off')
				setGame('on')
			let value =  handleKeyPress(e, quote);
			if(value){
				var result;
				axios("/user")
				.then(res => {
					result = {id:res.data.id, wpm:value.wpm, acc:value.accuracy}
					setResult(result);
				})
				.then(err => {
					if(err){
					result = {wpm:value.wpm, acc:value.accuracy}
					setResult(result)
					}
				})
			}
		})
	}

	const fetchQuotes = async()=>{
		setGame('off')
		setLoading(true)
		setResult(null);
		await axios.get('https://api.quotable.io/random')
		.then(res => {
			setLoading(false)
			setQuote(res.data.content);
		})
		.catch((err) => {
			throw err;
		})
	}
	
	const handleClick = (e) => {
		e.target.blur();
		fetchQuotes()
	}
	

	if(!loading)
		KeyDownEvent()

useEffect(() => {
	setResult(null);
	fetchQuotes();
	return () => 
		document.onkeydown = null;
}, []);


const render = ()=>{
	if(loading === true)
		return <SpinnerWrapper className="SpinnerWrapper"><Spinner className="spinner" animation="border" /></SpinnerWrapper>
	else if(result == null){
		return <div>
		<Didsplayquote >
			<Textwrapper>
			{
				quote.split('').map((char, id) => <span key={id} className="char">{char.toLowerCase()}</span>)
			}
			</Textwrapper>
			<Lable>
				<State>
					<div>Game / {game}</div>
					<div>Words / {quote.split(' ').length}</div>
				</State>
				<Button type="submit" tabindex="-1" onClick={handleClick} className="disabled" >
					Next quote
					<span className="iconify" data-icon="grommet-icons:form-next-link"></span>
				</Button>
			</Lable>
		</Didsplayquote>
		</div>
		}
		else return <div>
			<Status result={result}/>
				<Btn type="submit" tabindex="-1" onClick={handleClick} className="disabled" >
					Next quote
					<span className="iconify" data-icon="grommet-icons:form-next-link"></span>
				</Btn>
		</div>
}
	return (
		<BoxWrapper> 
			{render()}
		</BoxWrapper>
	)
}

export default Input