

import useAuth from "../../Hooks/useAuth";


const Register = () => {
	const {user} = useAuth()
	return (
		<div>
			<h2>Register</h2>
		</div>
	);
};

export default Register;