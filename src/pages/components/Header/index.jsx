import {
	School,
	QuestionAnswer,
	Person,
	Leaderboard,
	Logout,
} from '@mui/icons-material';
import { IconInput } from '../Inputs';

export default function HeaderMenu() {
	return (
		<header className="MenuH">
			<div className="MenuMaxContent">
				<h1 className="Title" style={{ fontSize: 28 }}>
					TecLearn
				</h1>
				<div className="BoxInput">
					<IconInput />
					<input
						className="InputSearch"
						type="text"
						placeholder="Pesquisar"
					/>
				</div>
				<nav className="Navbar1">
					<ul className="ContainerList">
						<li className="List">
							<QuestionAnswer style={IconsMenu} />
							<a className="LinksMenu">Chat</a>
						</li>
						<li className="List">
							<School style={IconsMenu} />
							<a className="LinksMenu">Explorar</a>
						</li>
						<li className="List ativo">
							<Person style={IconsMenu} />
							<a
								href="../components/Profile"
								className="LinksMenu">
								Perfil
							</a>
						</li>
						<li className="List">
							<Leaderboard style={IconsMenu} />
							<a className="LinksMenu">Ranking</a>
						</li>
					</ul>
				</nav>
				<span className="LinkLogout">
					<Logout style={IconsMenu} />
					<a className="LinksMenu">Sair</a>
				</span>
			</div>
		</header>
	);
}

const IconsMenu = {
	fontSize: '1.8rem',
};
