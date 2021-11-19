import React from 'react'
import styled from 'styled-components';
import {Link } from "react-router-dom";

const Topbar = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 2rem;
`

const NavBar = styled.div`
font-size: 1rem;
align-items: center;
display: grid;
grid-auto-flow: column;
gap: 2rem;
width: fit-content;
`

const Logo = styled.div`
font-size: 2em;
font-family:  "Roboto Mono";
color: lightgoldenrodyellow;
`

const Icon = styled.span`
	color: var(--icons-text-color);
	background-color: var(--icons-background);
	cursor: pointer;
	font-size: 1.7em;
`
const Crown = styled.span`
	color: var(--icons-text-color);
	background-color: var(--icons-background);
	cursor: pointer;
	font-size: 1.5em;
`

const Header = ()=>{

	return (
		<Topbar>
			<Logo>
				<div>Type</div>
				<div>quotes</div>
			</Logo>
				<NavBar>
					<Link to="/">
							<Icon className="iconify" data-icon="fluent:keyboard-layout-split-24-filled"></Icon>
					</Link>

					<Link to="/settings">
							<Icon className="iconify" data-icon="fluent:dark-theme-24-filled"></Icon>
					</Link>

					<Link to="/profile">
							<Icon className="iconify" data-icon="carbon:user-avatar-filled"></Icon>
					</Link>

					<Link to="/rank">
							<Crown className="iconify" data-icon="fa-solid:crown"></Crown>
					</Link>
				</NavBar>
		</Topbar>
	)}

export default Header