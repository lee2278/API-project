import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSpotsThunk } from '../../store/spots';
import OpenModalButton from "../OpenModalButton";
import DeleteModal from './DeleteSpotModal';
import './ManageSpots.css'

export default function ManageSpots() {
    const dispatch = useDispatch();
    const history = useHistory();
    const spotsObj = useSelector(state => state.spots.allSpots)

    const spotsList = Object.values(spotsObj)

    useEffect(() => {
        dispatch(getUserSpotsThunk())
    }, [dispatch])


    if (!spotsList.length) return (<Link to='/spots/new' id='link-button'>Create a New Spot</Link>)

    return (<div className='everything-wrapper'>
        <h1>Manage Your Spots</h1>
        <ul className='spots-ul'>
            {spotsList.map((spot) => (

                <li key={spot.id} className='outer-card-container'>

                    <Link key={spot.id} id='card-link' title={spot?.name} to={`/spots/${spot.id}`}>
                        <img className='manage-imgs' src={spot.previewImage} alt='preview of a spot' />
                        <div className='details-container'>
                            <div className='city-state'>
                                <p>{`${spot.city}, ${spot.state}`}</p>
                                <p>{`$${spot.price} night`}</p>
                            </div>
                            <div className='stars'>
                                <p>
                                    {<i className="fa-solid fa-star" style={{ color: '#000000' }}></i>}
                                    {spot.avgRating === 'Not Available. No reviews yet' ? 'New' : `${spot.avgRating}`}
                                </p>
                            </div>
                        </div>
                    </Link>

                    <div className='button-section'>
                        <div className='update-delete-top'> 
                        <Link id='link-button' to={`/spots/${spot.id}/edit`}>Update</Link>

                        <div className='delete-spot-modal-wrapper'>
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteModal spot={spot} />}
                            />
                        </div>
                        </div>
                        <button id='view-manage-booking-btn' onClick={() => history.push(`/spots/${spot.id}/confirmed-bookings`)}>View/Manage Bookings</button>
                    </div>
                </li>

            ))}

        </ul>
    </div>)

}
