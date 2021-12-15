import React, {useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
const StatusWrapper = styled.div`
	padding: 0em;
	width: 100%;
	display:flex;
	// justify-content: center;
`

const Div = styled.div`
	color: var(	--text-color);
	padding: 1.5rem 2rem;
	font-size: 4rem;
	margin: .5rem;
`
const Column = styled.div`
	display: flex;
	font-family: var(--quoteBox-fontFamily);
	background-color: var(--quoteBox-background);
	justify-content: center;
	align-items: center;
	flex-directoin: column;
`
const Status = ({result})=>{
	const fetchData = async() => {
		if(result.id !== null){
			await axios.post('/result', result)
			.catch(err=> {
				if(err) throw err
			})
		}
	}

	useEffect(() => {
		fetchData()
	},[result])

	return (
		<StatusWrapper>
			<Column>
				<Div className="wpm">
					{result.wpm}
				</Div>
			</Column>
			<Column>
				<Div className="acc">
					{result.accuracy}
				</Div>
			</Column>
		</StatusWrapper>
	)
}

export default Status