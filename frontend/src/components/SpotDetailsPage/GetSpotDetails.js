import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSpotDetailsThunk } from '../../store/spots';
import './SpotDetailsPage.css'
export default function GetSpotDetails() {
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot)

    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId))
    }, [dispatch, spotId])

   
    return (
        <>
            <header>
                <h1>{spot.name}</h1>
                <p>{`${spot?.city}, ${spot?.state}, ${spot?.country}`}</p>
            </header>

            <div className='images-container'>
                <div className = 'left-img'>
                    {spot.SpotImages && <img src={spot.SpotImages.find(image => image.preview === true).url}/>}
                </div>
                <div className = 'right-imgs'>
                    {spot.SpotImages && spot.SpotImages.map(image => image.preview === false ? (<img key={image.id} src={image.url}/>) : null )}
                </div>
            </div>
            <div className='Spot-info'>
                {spot.Owner && (
                    <div className='middle-section'>
                        <div className='text-info'>
                            <h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor qui neque blanditiis natus commodi tempora quaerat dolorem iusto, temporibus aperiam delectus fugiat alias accusamus accusantium, numquam, vel culpa corrupti atque.</p>
                        </div>
                        <div className='short-info-box'>
                            <div className='top-info'>
                                <p>{`$${spot.price} night`}</p>
                                <div className='rating'>
                                    <i className="fa-solid fa-star" style={{ color: '#000000' }}></i>
                                    <p>{`${spot.avgStarRating}`}</p>
                                </div>
                                <p>{`${spot.numReviews} reviews`}</p>
                            </div>
                            <div className='reserve-button'>
                                <button>Reserve</button>
                            </div>
                        </div>
                    </div>
                )}



            </div>

        </>
    )
}
