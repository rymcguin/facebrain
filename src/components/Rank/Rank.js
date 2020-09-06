import React from 'react';
//import './Rank.css';

const Rank = ({name, entries}) => {
	return (
		<div>
			<div className='black f5 ul'>
				{'Ryan\'s Face Detection App'}
			</div>
			<br/>
			<div className='black f3'>
				{`${name} Current Entry Count:`}
			</div>
			<div className='black f1'>
				{entries}
			</div>
		</div>
	)
}

export default Rank;
