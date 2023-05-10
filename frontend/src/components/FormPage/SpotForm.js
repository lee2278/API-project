import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createSpotThunk } from '../../store/spots'

const SpotForm = ({ spot, formType }) => {
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [spotImage1, setSpotImage1] = useState('')
    const [spotImage2, setSpotImage2] = useState('')
    const [spotImage3, setSpotImage3] = useState('')
    const [spotImage4, setSpotImage4] = useState('')

    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        spot = { ...spot }

        if (formType === 'Create Spot') {
            spot.country = country
            spot.address = address
            spot.city = city
            spot.state = state
            spot.lat = latitude
            spot.lng = longitude
            spot.description = description
            spot.name = name
            spot.price = price



            const newSpot = await dispatch(createSpotThunk(spot))
            history.push(`/spots/${newSpot.id}`)
            
        }
        if (spot.errors) {
            setErrors(spot.errors)
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a new Spot</h2>
            <div>Where's your place located?</div>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <label>Country
                <input
                    type='text'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder='Country'
                />
            </label>
            <label>Street Address
                <input
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder='Address'
                />
            </label>
            <label>City
                <input
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='City'
                />
            </label>
            <label>State
                <input
                    type='text'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder='STATE'
                />
            </label>
            <label>Latitude
                <input
                    type='text'
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder='Latitude'
                />
            </label>
            <label>Longitude
                <input
                    type='text'
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder='Longitude'
                />
            </label>
            <label>Describe your place to guests
                <p>Mention the best features of your space, any special amentities like
                    fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Please write at least 30 characters'
                >
                </textarea>
            </label>
            <label>Create a title for your spot
                <p>Catch guests' attention with a spot title that highlights what makes
                    your place special.</p>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name of your spot'
                />
            </label>
            <label>Set a base price for your spot
                <p>Competitive pricing can help your listing stand out and rank higher
                    in search results.</p>
                <p>$</p>
                <input
                    type='text'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder='Price per night (USD)'
                />

            </label>
            <label>Liven up your spot with photos
                <p>Submit a link to at least one photo to publish your spot.</p>
                <input
                    type='text'
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                    placeholder='Preview Image URL'
                />
                <input
                    type='text'
                    value={spotImage1}
                    onChange={(e) => setSpotImage1(e.target.value)}
                    placeholder='Image URL'
                />
                <input
                    type='text'
                    value={spotImage2}
                    onChange={(e) => setSpotImage2(e.target.value)}
                    placeholder='Image URL'
                />
                <input
                    type='text'
                    value={spotImage3}
                    onChange={(e) => setSpotImage3(e.target.value)}
                    placeholder='Image URL'
                />
                <input
                    type='text'
                    value={spotImage4}
                    onChange={(e) => setSpotImage4(e.target.value)}
                    placeholder='Image URL'
                />
            </label>

            <button>Create Spot</button>


        </form>
    )



}


export default SpotForm
