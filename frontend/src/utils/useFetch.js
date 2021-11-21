import React, {useState, useEffect} from 'react'
import axios from 'axios';

const useFetch = (url) => {
	const [isLoading, setIsLoading] = useState(false);
	const [apitData, setApitData] = useState(null);
	const [serverError, setServerError] = useState(null)

		useEffect(() => {
			// setIsLoading(true);
			const fetchData = async () => {
				await axios(url)
				.then(res => res.json())
				.then(data => {
					setApitData(data);
					// setIsLoading(false)
				})
				.catch(error => {
					setApitData('something wrong');
					// setIsLoading(false);
				})
			};

			fetchData();
		}, [])

		return apitData
}

export default useFetch;