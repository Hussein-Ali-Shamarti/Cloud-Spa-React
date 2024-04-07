import React from 'react';
import HotStoneMassageImage from '../public/assets/Pictures/hotStoneMassage.jpg';
import '../public/assets/styles/ExtraTreatmentsPage.css';

function HotStoneMassage() {
    return (
        <div className="hot-stone-massage-block">
            <img src={HotStoneMassageImage} id="hotStoneMassage" alt="hotStones" />
            <h2>Hot Stone Massage</h2>
            <div className="text-box">
                <p> Indulge in the ultimate relaxation with our Hot Stone Massage at Cloud Spa. 
                    Smooth, heated stones glide over your body, melting away tension and promoting 
                    deep relaxation. Experience the perfect balance of warmth and pressure as 
                    our skilled therapists restore harmony to your mind and body, leaving you 
                    feeling renewed and revitalized.
                </p>
            </div>
        </div>
    );
}

export default HotStoneMassage;