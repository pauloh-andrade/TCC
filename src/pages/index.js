import styled from 'styled-components';
import Feed from './Feed';
import Ranking from './Ranking/Ranking';
import EditProfile from './Profile/EditProfile';
import Login from './Login/Login';
import ForgotPassword from './Login/ForgotPassword';
import ResetPassword from './Login/ResetPassword';
import NewData from './Login/NewData';
import AuthenticationCode from './Login/AuthenticationCode';
import AreaInteresse from './Login/AreaInteresse';
import SavePosts from './Profile/SavePosts';
import Profile from './Profile';

const Home = () => {
	return (
		<>
			<Login />
		</>
	);
};

export default Home;
