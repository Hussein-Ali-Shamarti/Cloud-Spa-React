import React from "react";
import HotStoneMassageImage from "../../Pictures/hotStoneMassage.jpg";
import "../../styles/ExtraTreatments/HotStoneMassage.css";

function HotStoneMassage({ id }) {
  return (
    <div className="hot-stone-massage-block" id={id}>
      <img src={HotStoneMassageImage} id="hotStoneMassage" alt="hotStones" />
      <div className="hot-stone-massage-text-block">
        <h2 className="hot-stone-massage-h2">Hot Stone Massage</h2>
        <div className="hot-stone-massage-text">
          <p>
            {" "}
            Indulge in the ultimate relaxation with our Hot Stone Massage at
            Cloud Spa. Smooth, heated stones glide over your body, melting away
            tension and promoting deep relaxation. Experience the perfect
            balance of warmth and pressure as our skilled therapists restore
            harmony to your mind and body, leaving you feeling renewed and
            revitalized.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HotStoneMassage;
