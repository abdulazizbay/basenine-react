import { Route, Routes } from 'react-router-dom';
import Games from './Games';
import GameDetail from './GameDetail';

export default function GamesPage() {
	return (
		<Routes>
			<Route index element={<Games />} />
			<Route path=":gameId" element={<GameDetail />} />
		</Routes>
	);
}
