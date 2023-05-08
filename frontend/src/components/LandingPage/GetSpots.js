import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSpotsThunk } from '../../store/spots'
import "./LandingPage.css";


export default function GetSpots() {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots ? state.spots.allSpots : [])

    const spotsList = Object.values(spotsObj)

    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch])


    if (!spotsObj) return
    return (
        <div className='everything-wrapper'>
            <ul className='spots-ul'>
                {spotsList.map((spot) => (
                    <div key={spot.id} className='spot-container'>
                        <li>
                            <img src={spot.previewImage} />
                            <div className='details-container'>
                                <div className='info'>
                                    <p>{`${spot.city}, ${spot.state}`}</p>
                                    <p>{`$${spot.price} night`}</p>
                                </div>
                                <div className='stars'>
                                    <p>
                                        {<i className="fa-solid fa-star" style={{color: '#000000'}}></i>}
                                        {spot.avgRating === 'Not Available. No reviews yet' ? 'New' : `${spot.avgRating}`}
                                    </p>
                                    
                                </div>
                            </div>
                        </li>

                    </div>
                ))}

            </ul>
        </div>
    )



}
