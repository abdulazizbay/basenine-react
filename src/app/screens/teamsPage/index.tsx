import { Route, Routes } from 'react-router-dom';
import Teams from './Teams';
import TeamDetail from './TeamDetail';

export default function TeamsPage() {
	return (
		<Routes>
			<Route index element={<Teams />} />
			<Route path=":teamId" element={<TeamDetail />} />
		</Routes>
	);
}
