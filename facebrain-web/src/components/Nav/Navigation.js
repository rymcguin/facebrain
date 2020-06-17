import React from 'react';
import Logo from '../Logo/Logo';

const Navigation = ({ onRouteChange, signedIn }) => {
	if (signedIn) {
		return (
			<nav style={{ display: 'flex', margin: '20px', padding: '0px', width: 'auto', justifyContent: 'space-between' }} >
				<div >
					<Logo />
				</div>
				<div>
					<p onClick={() => onRouteChange('signout')} className='f3 link dim  ba br2 pa2 shadow-3 pointer'>Sign Out</p>
				</div>
			</nav>
		);
	} else {
		return (
			<nav style={{ display: 'flex', margin: '20px', padding: '0px', width: 'auto', justifyContent: 'space-between' }} >
				<div >
					<Logo />
				</div>
				<div style={{ display: 'flex',  justifyContent: 'space-between' }}>
					<div  style={{marginRight:'20px'}}>
						<p onClick={() => onRouteChange('signin')} className='f3 grow link dim black ba br2 pa2 shadow-3 pointer'>Sign In</p>
					</div>
					<div style={{marginRight:'20px'}}>
						<p onClick={() => onRouteChange('Register')} className='f3 grow link dim black ba br2 pa2 shadow-3 pointer'>Register</p>
					</div>

				</div>
			</nav>
		);
	}



}

export default Navigation;
