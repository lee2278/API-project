import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSpotsThunk } from '../../store/spots'

export default function GetSpots() {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots ? state.spots.allSpots : [])

    const spotsList = Object.values(spotsObj)

    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch])


    if (!spotsObj) return
    return (
        <>
            <ul>
                {spotsList.map((spot) => (
                    <>
                        <li key={spot.id}>
                            <img src={spot.previewImage} />
                            <div className='details-container'>
                                <div className='info'>
                                    <p>{`${spot.city}, ${spot.state}`}</p>
                                    <p>{`$${spot.price} night`}</p>
                                </div>
                                <div className='stars'>
                                    <p>{`temporary stars ${spot.avgRating}`} </p>
                                </div>
                            </div>
                        </li>

                    </>
                ))}

            </ul>
        </>
    )



}
