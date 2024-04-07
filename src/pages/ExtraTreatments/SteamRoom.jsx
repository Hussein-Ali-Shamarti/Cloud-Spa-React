import React from 'react';
import SteamRoomImage from '../public/assets/Pictures/SteamRoom.jpg';
import '../public/assets/styles/ExtraTreatmentsPage.css';

function SteamRoom() {
    return (
        <div className="steam-room-block">
            <img src={SteamRoomImage} id="steamRoom" alt="room" />
            <h2>Steam Room</h2>
            <div className="text-box">
                <p> Step into the ultimate relaxation at Cloud Spa's Steam Room. 
                    Let the gentle warmth envelop you as you unwind and detoxify in our 
                    luxurious steam chamber. Release tension, clear your mind, and rejuvenate 
                    your body as you bask in the calming mist. Recharge your senses and emerge 
                    feeling refreshed and revitalized.
                </p>
            </div>
        </div>
    );
}

export default SteamRoom;