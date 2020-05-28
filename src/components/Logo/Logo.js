import React from 'react';
import Tilt from 'react-tilt';

import './Logo.css';
import brain from './brain.png';

const Logo = () => {
	return (
		<div >
			<Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 100, width: 100, display:'flex', justifyContent:'center' }} >
				<div className="Tilt-inner pa3">
					<img alt="brain" src={brain} />
				</div>
			</Tilt>
		</div>
	)
}

export default Logo;