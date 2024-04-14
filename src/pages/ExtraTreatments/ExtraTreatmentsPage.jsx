import React, { useEffect, useState } from 'react';
import ClassicMassage from './ClassicMassage';
import MassageAndScrub from './MassageAndScrub';
import HotStoneMassage from './HotStoneMassage';
import FacialTreatment from './FacialTreatment';
import SteamRoom from './SteamRoom';
import TitleExtraTreatmentsPage from './TitleExtraTreatmentsPage';
import Layout from '../../components/layout';
import Footer from '../../components/footer';

function ExtraTreatmentsPage() {

    return (
        <>
            <Layout />
            <TitleExtraTreatmentsPage />
            <ClassicMassage />
            <MassageAndScrub />
            <HotStoneMassage />
            <FacialTreatment />
            <SteamRoom />
            <Footer />
        </>
    );
}

export default ExtraTreatmentsPage;
