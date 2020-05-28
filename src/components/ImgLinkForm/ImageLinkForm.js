import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return (
		<div>
			<p className='f3 white'>
				Enter Image
			</p>
			<div className='center' >
				<div className = ' center form pa4 br3 shadow-5' >
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
					<button 
					className='w-30 f4  ph3 pv2 dib white bg-green pointer'
					
					onClick={onButtonSubmit}
					>Detect</button>
				</div>

			</div>
		</div>
	)
}

export default ImageLinkForm;
