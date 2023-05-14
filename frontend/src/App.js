import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetSpots from "./components/LandingPage/GetSpots"
import GetSpotDetails from './components/SpotDetailsPage/GetSpotDetails'
import CreateSpot from './components/FormPage/CreateSpot'
import ManageSpot from "./components/ManagementPage/ManageSpots";
import UpdateSpot from './components/FormPage/UpdateSpot'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      <Route exact path='/'>
        <GetSpots />
      </Route>
      {isLoaded && <Switch>
        <Route path='/spots/new'>
          <CreateSpot/>
        </Route>
        <Route path='/spots/current'>
          <ManageSpot/>
        </Route>
        <Route path='/spots/:spotId/edit'>
          <UpdateSpot/>
        </Route>
        <Route path='/spots/:spotId'>
          <GetSpotDetails/>
        </Route>
       
      </Switch>}
    </>
  );
}

export default App;
