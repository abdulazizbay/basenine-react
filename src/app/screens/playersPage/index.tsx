import { Route, Routes } from 'react-router-dom';
import Players from './Players';
import PlayerDetail from './PlayerDetail';

export default function PlayersPage() {
	return (
		<Routes>
			<Route index element={<Players />} />
			<Route path=":playerId" element={<PlayerDetail />} />
		</Routes>
	);
}
