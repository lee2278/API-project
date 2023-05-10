import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSpotsThunk } from '../../store/spots';



export default function ManageSpots() {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots)

    const spotsList = Object.values(spotsObj)
    useEffect(() => {
        dispatch(getUserSpotsThunk())
    }, [dispatch])

    if (!spotsList.length) return (<Link to='/spots/new' id='link-button'>Create a New Spot</Link>)
    return (<div className='everything-wrapper'>
        <h1>Manage Your Spots</h1>
        <Link to='/spots/new' id='link-button'>Create a New Spot</Link>
        <ul className='spots-ul'>
            {spotsList.map((spot) => (
                <Link key={spot.id} title={spot?.name} to={`/spots/${spot.id}`}>
                    <div className='spot-container'>
                        <li>
                            <img src={spot.previewImage} alt='preview of a spot' />
                            <div className='details-container'>
                                <div className='info'>
                                    <p>{`${spot.city}, ${spot.state}`}</p>
                                    <p>{`$${spot.price} night`}</p>
                                </div>
                                <div className='stars'>
                                    <p>
                                        {<i className="fa-solid fa-star" style={{ color: '#000000' }}></i>}
                                        {spot.avgRating === 'Not Available. No reviews yet' ? 'New' : `${spot.avgRating}`}
                                    </p>

                                </div>
                                <div class='button-section'>
                                    <Link id='link-button'to={`/spots/${spot.id}/edit`}>Update</Link>
                                    <Link id='link-button'>Delete</Link>

                                </div>
                            </div>
                        </li>

                    </div>
                </Link>
            ))}

        </ul>
    </div>)

}
