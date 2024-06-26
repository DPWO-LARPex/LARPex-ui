import { ROUTES } from '@/constants/routes'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
	return (
		<div className="navbar bg-stone-950 bg-opacity-90 text-white">
			<div className="navbar-start w-3/4">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<NavLink to={ROUTES.HOME}>Strona główna</NavLink>
						</li>
						<li>
							<NavLink to={ROUTES.AV_GAMES}>Gry</NavLink>
						</li>
						<li>
							<NavLink to={ROUTES.EVENTS}>Wydarzenia</NavLink>
						</li>
						<li>
							<NavLink to={ROUTES.PLAYER}>Panel gracza</NavLink>
						</li>
					</ul>
				</div>
				<a className="btn btn-ghost text-xl">LARPex</a>
				<ul className="menu menu-horizontal px-1 hidden lg:flex gap-4">
					<li>
						<NavLink to={ROUTES.HOME}>Strona główna</NavLink>
					</li>
					<li>
						<NavLink to={ROUTES.AV_GAMES}>Gry</NavLink>
					</li>
					<li>
						<NavLink to={ROUTES.EVENTS}>Wydarzenia</NavLink>
					</li>
					<li>
						<NavLink to={ROUTES.SHOP}>Sklep</NavLink>
					</li>
					<li>
						<NavLink to={ROUTES.PLAYER}>Panel gracza</NavLink>
					</li>
				</ul>
			</div>
			<div className="navbar-end">
				<Link to="/" className="btn bg-red-500 hover:bg-red-600 text-white">
					Zarezerwuj grę
				</Link>
			</div>
		</div>
	)
}
