import { Link } from 'react-router-dom';

export default function HomePage() {
	return (
		<>
			<h1>Home</h1>
			<Link to='/new-diary'>New Diary</Link>
		</>
	);
}
