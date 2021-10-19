import React from 'react'
import {MdKeyboard, MdSettings} from "react-icons/md"
import {FaUser} from 'react-icons/fa'
import styled from 'styled-components';
import {Link } from "react-router-dom";
const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;`

const NavBar = styled.div`
display: flex;
justify-content: space-between;
width: 50%;
align-items: center;
padding: 2em 0;
color: lightgoldenrodyellow;`

const Logo = styled.div`
font-size: 30px;
font-family:  "Roboto Mono";`

const Menu = styled.div`
display: flex;
justify-content: space-between;
width: 10em;`

const Header = ()=>{

	return (
		<Container>
			<NavBar>
				<Logo>
					<div>Type</div>
					<div>quotes</div>
				</Logo>
					<Menu>
						<Link to="/"><MdKeyboard  size="1.5em"  className="kb icons"/></Link>
						<Link to="/settings"><MdSettings size="1.5em"  className="kb icons"/></Link>
						<Link to="/profile"><FaUser size="23px"  className="kb icons" /></Link>
						<Link to="/rank"><FaUser size="23px"  className="kb icons" /></Link>
					</Menu>
			</NavBar>
		</Container>
	)}

export default Header