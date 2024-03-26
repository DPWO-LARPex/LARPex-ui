import { ROUTES } from '@/constants/routes'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
	return (
		<div className="navbar bg-stone-950 bg-opacity-90">
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
							<NavLink to={ROUTES.HOME}>Home</NavLink>
						</li>
						<li>
							<NavLink to={ROUTES.AV_GAMES}>Avaliable Games</NavLink>
						</li>
						<li>
							<NavLink to={ROUTES.ABOUT}>About</NavLink>
						</li>
						<li>
							<NavLink to={ROUTES.GALLERY}>Gallery</NavLink>
						</li>
					</ul>
				</div>
				<a className="btn btn-ghost text-xl">LARPex</a>
				{/* </div>
				<div className="navbar-center hidden lg:flex"> */}
				<ul className="menu menu-horizontal px-1 hidden lg:flex gap-4">
					<li>
						<NavLink to={ROUTES.HOME}>Home</NavLink>
					</li>
					<li>
						<NavLink to={ROUTES.AV_GAMES}>Avaliable Games</NavLink>
					</li>
					<li>
						<NavLink to={ROUTES.ABOUT}>About</NavLink>
					</li>
					<li>
						<NavLink to={ROUTES.GALLERY}>Gallery</NavLink>
					</li>
				</ul>
			</div>
			<div className="navbar-end">
				<Link to="/" className="btn">
					Book the game
				</Link>

				<Link to="/payments" className="btn btn-ghost">
					Cart
				</Link>
			</div>
		</div>
	)
}
