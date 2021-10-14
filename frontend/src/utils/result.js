import axios from "axios";

const sendResult = (obj) => {
	axios.post('http://localhost:3001/result', obj)
}

export default sendResult;