import React, { useEffect, useState } from 'react';
import ClassicMassage from './ClassicMassage';
import MassageAndScrub from './MassageAndScrub';
import HotStoneMassage from './HotStoneMassage';
import FacialTreatment from './FacialTreatment';
import SteamRoom from './SteamRoom';
import '../public/assets/styles/headerfooter.css';
import HeaderExstraTreatmentsPage from './HeaderExstraTreatmentsPage';

function ExtraTreatmentsPage() {

    return (
        <div>
            {/* Header */}
            <div id="header-placeholder" dangerouslySetInnerHTML={{ __html: header }}></div>

            {/* components */}
            <HeaderExstraTreatmentsPage />
            <ClassicMassage />
            <MassageAndScrub />
            <HotStoneMassage />
            <FacialTreatment />
            <SteamRoom />

            {/* Footer */}
            <div id="footer" dangerouslySetInnerHTML={{ __html: footer }}></div>
        </div>
    );
}

export default ExtraTreatmentsPage;
