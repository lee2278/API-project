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
import GetUserBookings from "./components/BookingsPage/GetUserBookings";
import GetSpotBookings from "./components/BookingsPage/GetSpotBookings";
import BookingsManagement from "./components/BookingsManagementPage/BookingsManagement";
import BookingDetails from "./components/BookingsPage/BookingDetails";
import UserReviews from "./components/ReviewsPage/UserReviews";

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
          <CreateSpot />
        </Route>
        <Route path='/spots/current'>
          <ManageSpot />
        </Route>
        <Route path='/spots/:spotId/edit'>
          <UpdateSpot />
        </Route>
        <Route path='/spots/:spotId/confirmed-bookings'>
          <BookingsManagement/>
        </Route>
        <Route path='/spots/:spotId/bookings/:startDate/:endDate'>
          <GetSpotBookings />
        </Route>
        <Route path='/spots/:spotId'>
          <GetSpotDetails />
        </Route>
        <Route path='/bookings/current'>
          <GetUserBookings />
        </Route>
        <Route path='/bookings/:bookingId/:spotId/details'>
          <BookingDetails/>
        </Route>
        <Route path='/reviews/current'>
          <UserReviews/>
        </Route>
      </Switch>}
    </>
  );
}

export default App;
