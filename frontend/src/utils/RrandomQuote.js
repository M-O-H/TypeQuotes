import React, {useState, useEffect} from 'react'
import axios from 'axios';

const RrandomQuote = (url) => {
	const [state, setState] = useState(()=>'');

		useEffect(() => {
			const fetchData = async() => {
				await axios.get('https://api.quotable.io/random')
				.then(res => {
					setState(res.data.content)
				})
				.catch(err => {if(err)throw err})
			}
			fetchData();
		}, [])

		return [state, setState]
}

export default RrandomQuote;