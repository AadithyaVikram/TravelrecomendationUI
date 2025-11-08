import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Countries from '../pages/Destinations/Countries';
import States from '../pages/Destinations/States';
import Dashboard from '../pages/Homepage/Homepage';
import PageNotFound from '../pages/NotFound/PageNotFound';
import Destinations from '../pages/Destinations/Destinations';
// import DestinationDetails from '../pages/Destinations/DestinationDetails';

const AppRoutes: React.FC = () => {
  return (
    <div data-testid="app-routes">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/countries" element={<Countries />} />
        {/* <Route path="/states/:countryId" element={<States />} /> */}
        <Route path="/countries/:countryName/states/:countryId" element={<States />} />

        <Route path="/countries/:countryName/:stateName/destinations/:stateId" element={<Destinations />} />
        {/* <Route path="/destinations/details/:destinationId" element={<DestinationDetails />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
