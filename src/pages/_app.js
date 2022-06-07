import { AppThemeProvider, DrawerProvider } from '../shared/contexts';
import './globals.css';
import './components/Cards/card.css';
import './components/Header/index.css';
import './components/Texts/index.css';
import './components/Inputs/index.css';
import './components/Profile/index.css';
import './components/Post/post.css';
import './components/Buttons/buttons.css';
import styledComponents from 'styled-components';
import styled from 'styled-components';
import { AuthProvider } from '../shared/contexts/AuthAdmContext';
import { AuthUserProvider } from '../shared/contexts/AuthUserContext';

function MyApp({ Component, pageProps }) {
	return (
		<AuthUserProvider>
			<AuthProvider>
				<AppThemeProvider>
					<DrawerProvider>
						<Component {...pageProps} />
					</DrawerProvider>
				</AppThemeProvider>
			</AuthProvider>
		</AuthUserProvider>
	);
}

export default MyApp;
