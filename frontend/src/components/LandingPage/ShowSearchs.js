import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSpotsThunk } from '../../store/spots';


export default function ShowSearches() {

    const dispatch = useDispatch();
    const { search } = useParams()

    const searchLower = search.toLowerCase()


    const splitSearch = searchLower.split(' ')


    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch])

    const spotsObj = useSelector(state => state.spots.allSpots)
    const spotsList = Object.values(spotsObj)

    const matchedSpotsArray = []
   


    if (spotsList && spotsList.length > 0) {
        for (let spot of spotsList) {
             for (let searchWord of splitSearch) {
                if (spot.name.toLowerCase().includes(searchWord) && !matchedSpotsArray.includes(spot)) matchedSpotsArray.push(spot)
                if (spot.city.toLowerCase().includes(searchWord)  && !matchedSpotsArray.includes(spot)) matchedSpotsArray.push(spot)
                if (spot.state.toLowerCase().includes(searchWord)  && !matchedSpotsArray.includes(spot)) matchedSpotsArray.push(spot)
                if (spot.description.toLowerCase().includes(searchWord)  && !matchedSpotsArray.includes(spot)) matchedSpotsArray.push(spot)
            }
        }
       
    } 
    




    return (
        <>
            <div className='everything-wrapper'>
                
                {matchedSpotsArray && matchedSpotsArray.length > 0 ? <ul className='spots-ul'>
                    {matchedSpotsArray.map(spot => (
                        <li key={spot.id} id='spot-container'>
                            <Link id='card-link' title={spot?.name} to={`/spots/${spot.id}`}>
                            <div className='card'>

                                <img id='spot-image' src={spot.previewImage} alt='preview of a spot' />
                                <div className='details-container'>
                                    <div className='info'>
                                        <p className= 'city-state'>{`${spot.city}, ${spot.state}`}</p>
                                        <p className='price'>{`$${spot.price} night`}</p>
                                    </div>
                                    <div className='stars'>
                                        <p>
                                            {<i className="fa-solid fa-star" style={{ color: '#000000' }}></i>}
                                        
                                           {spot.avgRating === 'Not Available. No reviews yet' ? ` New` : ` ${spot.avgRating}`} 
                                        </p>

                                    </div>
                                </div>


                            </div>
                        </Link>
                        </li>
                    ))} 
                </ul>: <p>Sorry, we did not find any spots that matched your search</p>}
            </div>
        </>
    )
}
