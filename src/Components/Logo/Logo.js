import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import brain from './brain.png';






const Logo = () => {
    return (
        <div className='ma3 mt0'>
        <Tilt className="Tilt br2 shadow-3" options={{ max: 55 }} style={{ height: 210, width: 210 }} >
                <div className="Tilt-inner"><img style={{paddingTop:'5px'}} src= {brain} alt="Logo"/> </div>
         </Tilt>
        </div>


    )
}


export default Logo;