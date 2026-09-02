import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './screens/homePage';
import GamesPage from './screens/gamesPage';
import OrdersPage from './screens/ordersPage';
import PlayersPage from './screens/playersPage';
import ProductsPage from './screens/productsPage';
import TeamsPage from './screens/teamsPage';
import UsersPage from './screens/userPage';
import HomeNavbar from './components/header/HomeNavbar';
import OtherNavbar from './components/header/OtherNavbar';
import NotFoundPage from './screens/notFoundPage';
import Footer from './components/footer';
import AuthModal from './components/auth';

function App() {
	const location = useLocation();
	return (
		<div className="flex min-h-screen flex-col bg-bn-bg">
			{location.pathname === '/' ? <HomeNavbar /> : <OtherNavbar />}
			<main className="flex-1">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/games" element={<GamesPage />} />
					<Route path="/orders" element={<OrdersPage />} />
					<Route path="/players" element={<PlayersPage />} />
					<Route path="/products/*" element={<ProductsPage />} />
					<Route path="/teams/*" element={<TeamsPage />} />
					<Route path="/user" element={<UsersPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
			<Footer />
			<AuthModal />
		</div>
	);
}

export default App;
