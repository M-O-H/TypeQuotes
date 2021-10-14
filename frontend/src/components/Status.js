import React, {useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'

const StatusWrapper = styled.div`
	padding: 2em;
	width: 100%;
	display:flex;
	justify-content: center;
`

const Div = styled.div`
	color: var(--body-background);
	padding: 1.5rem 2rem;
	font-size: 40px;
	margin: .5rem;
`
const Column = styled.div`
	display: flex;
	margin: 0 1rem;
	background: var(--icons-text-color);
	justify-content: center;
	align-items: center;
	flex-directoin: column;
`
const Status = ({result})=>{

	useEffect(() => {
		axios.post('/result', result)
		.catch(err => {
			if(err) console.log("network erorr");
		})
	})
	return (
		<StatusWrapper>
			<Column>
				<Div className="wpm">
					{result.wpm}
				</Div>
			</Column>
			<Column>
				<Div className="acc">
					{result.acc}
				</Div>
			</Column>
		</StatusWrapper>
	)
}

export default Status