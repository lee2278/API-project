import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetSpots from "./components/LandingPage/GetSpots"
import GetSpotDetails from './components/SpotDetailsPage/GetSpotDetails'
import GetReviews from './components/SpotDetailsPage/GetReviews'
import CreateSpot from './components/FormPage/CreateSpot'
import ManageSpot from "./components/ManagementPage/ManageSpots";

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
        <Route path='/spots/:spotId'>
          <GetSpotDetails/>
          <GetReviews/>
        </Route>
       
      </Switch>}
    </>
  );
}

export default App;
