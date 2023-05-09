import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getSpotsThunk } from '../../store/spots'
import "./LandingPage.css";


export default function GetSpots() {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots)

    const spotsList = Object.values(spotsObj)

    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch])


    if (!spotsList.length) return null
    return (
        <div className='everything-wrapper'>
            <ul className='spots-ul'>
                {spotsList.map((spot) => (
                    <Link key={spot.id} title={spot?.name}to={`/spots/${spot.id}`}>
                        <div className='spot-container'>
                            <li>
                                <img src={spot.previewImage} alt='preview of a spot'/>
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
                                </div>
                            </li>

                        </div>
                    </Link>
                ))}

            </ul>
        </div>
    )



}
