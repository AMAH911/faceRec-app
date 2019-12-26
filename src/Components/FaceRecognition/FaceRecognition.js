import React from 'react';
import './FaceRecognition.css'






const FaceRecogniton = ({imageUrl, box}) => {
    return (
        <div className='center ma'>
            <div className='absolute m2 pv3'>
                <img id='inputImage' src={imageUrl} alt="" className="ba bw2" width='500px' height='auto'/>
                <div className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left:box.leftCol}}></div>
            </div>
         
         
        </div>


    );
}























export default FaceRecogniton