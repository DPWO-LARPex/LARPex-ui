import { ROUTES } from '@/constants/routes'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	return (
		<div className="navbar bg-base-100">
			<div className="navbar-start">
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
				<a className="btn btn-ghost text-xl">[LOGO]</a>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
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
				<a className="btn">Book the game</a>

				{isSearchOpen && (
					<div className="form-control">
						<input
							type="text"
							placeholder="Search"
							className="input input-bordered w-24 md:w-auto"
						/>
					</div>
				)}

				<button
					className="btn btn-ghost btn-circle"
					onClick={() => setIsSearchOpen(!isSearchOpen)}
				>
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
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>
		</div>
	)
}
