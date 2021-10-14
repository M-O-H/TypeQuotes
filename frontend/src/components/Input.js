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
padding: 0 6em;
justify-content: center;
align-items: center;
height: 60vh;
width: 100%;
`;

const SpinnerWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;`

const Button = styled.button`
border: none;
outline: none;
padding: 1rem;
background: var(--icons-text-color);
color: var(--body-background);
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
	const [quote, setQuote] = useState(()=>'');
	const [loading, setLoading] = useState(()=>true);
	const [result, setResult] = useState(()=>null);

	index = 0;
	correctLetters = 0;
	startTime = null;
	mistakes = 0;
	index = 0;
	

	const KeyDownEvent = () => {
		document.onkeydown =((e)=>{
			let value =  handleKeyPress(e, quote);
			if(value){
				var result;
				axios("/user")
				.then(res => {
					result = {id:res.data.id, wpm:value.wpm, acc:value.accuracy}
					setResult(result);
					document.onkeydown = null;
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
}, []);


const render = ()=>{
	if(loading === true)
		return <SpinnerWrapper className="SpinnerWrapper"><Spinner className="spinner" animation="border" /></SpinnerWrapper>
	else if(result == null){
		return <div>
		<div className="display-quote">{
				quote.split('').map((char, id) => <span key={id} className="char">{char.toLowerCase()}</span>)}
			</div>
			<Button type="submit" tabindex="-1" onClick={handleClick} className="disabled" >NEXT</Button>
		</div>
		}
		else return <div>
			<Status result={result}/>
			<Button type="submit" tabindex="-1" onClick={handleClick} className="disabled" >Next</Button>
		</div>
}
	return (
		<BoxWrapper> 
			{render()}
		</BoxWrapper>
	)
}

export default Input