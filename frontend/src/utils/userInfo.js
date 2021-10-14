const UserAuthInfo = async () => {
	await fetch("/user")
		.then(res => res.json())
		.then(data => {
		return data
	})
}

export default UserAuthInfo;
