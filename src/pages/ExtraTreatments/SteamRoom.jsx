import React from "react";
import SteamRoomImage from "../../Pictures/SteamRoom.jpg";
import "../../styles/ExtraTreatments/SteamRoom.css";

function SteamRoom({ id }) {
  return (
    <div className="steam-room-block" id={id}>
      <img src={SteamRoomImage} id="steamRoom" alt="room" />
      <div className="steam-room-text-block">
        <h2 className="steam-room-h2">Steam Room</h2>
        <div className="steam-room-text">
          <p className="steam-room-p">
            {" "}
            Step into the ultimate relaxation at Cloud Spa's Steam Room. Let the
            gentle warmth envelop you as you unwind and detoxify in our
            luxurious steam chamber. Release tension, clear your mind, and
            rejuvenate your body as you bask in the calming mist. Recharge your
            senses and emerge feeling refreshed and revitalized.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SteamRoom;
