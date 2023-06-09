import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createSpotThunk, updateSpotThunk } from '../../store/spots'
import './FormPage.css'

const SpotForm = ({ spot, formType }) => {
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
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

    let spotImagesArray = []
    if (previewImage) spotImagesArray.push({ url: previewImage, preview: true })

    if (spotImage1) spotImagesArray.push({ url: spotImage1, preview: false })

    if (spotImage2) spotImagesArray.push({ url: spotImage2, preview: false })

    if (spotImage3) spotImagesArray.push({ url: spotImage3, preview: false })

    if (spotImage4) spotImagesArray.push({ url: spotImage4, preview: false })


    const checkIfDecimal = (number => {
       return number % 1 !== 0
    })
    
    const checkValidDecimalPlaces = (priceInput => {
        if (priceInput % 1 === 0) return true
        if (checkIfDecimal(priceInput) === true) {
            const stringedPrice = priceInput.toString()
            let parts = stringedPrice.split('.')
            if (parts[1].length <= 2) return true
        }
        return false;
    })
       

    let submitButtonText;
    if (formType === 'Update your Spot') submitButtonText = 'Update your Spot'
    if (formType === 'Create a new Spot') submitButtonText = 'Create Spot'


    useEffect(() => {
        setCountry(spot.country)
        setAddress(spot.address)
        setCity(spot.city)
        setState(spot.state)
        setDescription(spot.description)
        setName(spot.name)
        setPrice(spot.price)


    }, [spot])




    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({})
        spot = { ...spot }

        const newErrors = {}

        if (!country) newErrors.country = 'Country is required'
        if (!address) newErrors.address = 'Address is required'
        if (!city) newErrors.city = 'City is required'
        if (!state) newErrors.state = 'State is required'
        if (!description || description.length < 30) newErrors.description = 'Description needs a minimum of 30 characters'
        if (description && description.length > 255) newErrors.description = 'Please limit description to 255 characters'
        if (!name) newErrors.name = "Name is required"
        if (name && name.length >= 50) newErrors.name = "Name must be less than 50 characters"
        if (!price) newErrors.price = 'Price is required'
        if (price && isNaN(+price)) newErrors.price = "Please enter a number"
        if (price && +price && checkValidDecimalPlaces(price) === false) newErrors.price = 'Please provide values of up to two decimal places'
        if (!previewImage) newErrors.previewImage = 'Preview image is required.'
        if (previewImage && (!(previewImage.endsWith('.png') || previewImage.endsWith('.jpg') || previewImage.endsWith('.jpeg')))) newErrors.previewImage = 'Image URL must end in .png, .jpg, or .jpeg'
        if (spotImage1 && (!(spotImage1.endsWith('.png') || spotImage1.endsWith('.jpg') || spotImage1.endsWith('.jpeg')))) newErrors.spotImage1 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (spotImage2 && (!(spotImage2.endsWith('.png') || spotImage2.endsWith('.jpg') || spotImage2.endsWith('.jpeg')))) newErrors.spotImage2 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (spotImage3 && (!(spotImage3.endsWith('.png') || spotImage3.endsWith('.jpg') || spotImage3.endsWith('.jpeg')))) newErrors.spotImage3 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (spotImage4 && (!(spotImage4.endsWith('.png') || spotImage4.endsWith('.jpg') || spotImage4.endsWith('.jpeg')))) newErrors.spotImage4 = 'Image URL must end in .png, .jpg, or .jpeg'


        if (formType === 'Create a new Spot') {
            spot.country = country
            spot.address = address
            spot.city = city
            spot.state = state
            spot.lat = 47.620422
            spot.lng = -122.349358
            spot.description = description
            spot.name = name
            spot.price = price

            if (Object.values(newErrors).length > 0) {
                setErrors(newErrors)
                return null
            } else {
                const newSpot = await dispatch(createSpotThunk(spot, spotImagesArray))
                spot = newSpot
                history.push(`/spots/${spot.id}`)
            }

        } else if (formType === 'Update your Spot') {
            spot.country = country
            spot.address = address
            spot.city = city
            spot.state = state
            spot.lat = 47.620422
            spot.lng = -122.349358
            spot.description = description
            spot.name = name
            spot.price = price

            delete newErrors.previewImage

            if (Object.values(newErrors).length > 0) {
                setErrors(newErrors)
                return null
            } else {

                const updated = await dispatch(updateSpotThunk(spot, spotImagesArray))
                spot = updated
                history.push(`/spots/${spot.id}`)
            }


        }
    }


    return (
        <div className='form-wrapper'>
            <form id='spot-form' onSubmit={handleSubmit}>
                <h2>{formType}</h2>
                <h3 className='no-margin-bottom'>Where's your place located?</h3>
                <p className='no-margin-top'>Guests will only get your exact address once they booked a reservation.</p>
                <label >Country
                    {errors.country && <span className='error'>{errors.country}</span>}
                    <input id='country-input'
                        type='text'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder='Country'
                    />
                </label>
                <label>Street Address
                    {errors.address && <span className='error'>{errors.address}</span>}

                    <input id='street-address-input'
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Address'
                    />
                </label>
                <div className='city-state-div'>
                    <label id='city-label'>City
                        {errors.city && <span className='error'>{errors.city}</span>}
                        <input
                            type='text'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder='City'
                        />
                    </label>
                    <p>,</p>
                    <label id='state-label'>State
                        {errors.state && <span className='error'>{errors.state}</span>}

                        <input
                            type='text'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder='STATE'
                        />

                    </label>
                </div>
                <label>
                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amentities like
                        fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea
                        id='description-text-area'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Please write at least 30 characters'
                        rows="10"
                        cols="40"
                    >
                    </textarea>
                    {errors.description && <p className='error'>{errors.description}</p>}
                </label>
                <label id='title-label'>
                    <h3>Create a title for your spot</h3>
                    <p>Catch guests' attention with a spot title that highlights what makes
                        your place special.</p>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name of your spot'
                    />
                    {errors.name && <p className='error'>{errors.name}</p>}
                </label>
                <label>
                    <h3>Set a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher
                        in search results.</p>
                    <div className='price-container'>
                        <p>$</p>
                        <input
                            type='text'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder='Price per night (USD)'
                        />
                    </div>
                        {errors.price && <span className='error'>{errors.price}</span>}
                </label>

                {formType === 'Create a new Spot' &&
                    <label id='url-inputs'>
                        <h3>Liven up your spot with photos</h3>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                        <input
                            type='text'
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.target.value.trim())}
                            placeholder='Preview Image URL'
                        />

                        {errors.previewImage && <span className='error'>{errors.previewImage}</span>}

                        <input
                            type='text'
                            value={spotImage1}
                            onChange={(e) => setSpotImage1(e.target.value.trim())}
                            placeholder='Image URL'
                        />
                        {errors.spotImage1 && <span className='error'>{errors.spotImage1}</span>}
                        <input
                            type='text'
                            value={spotImage2}
                            onChange={(e) => setSpotImage2(e.target.value.trim())}
                            placeholder='Image URL'
                        />
                        {errors.spotImage2 && <span className='error'>{errors.spotImage2}</span>}
                        <input
                            type='text'
                            value={spotImage3}
                            onChange={(e) => setSpotImage3(e.target.value.trim())}
                            placeholder='Image URL'
                        />
                        {errors.spotImage3 && <span className='error'>{errors.spotImage3}</span>}
                        <input
                            type='text'
                            value={spotImage4}
                            onChange={(e) => setSpotImage4(e.target.value.trim())}
                            placeholder='Image URL'
                        />
                        {errors.spotImage4 && <span className='error'>{errors.spotImage4}</span>}
                    </label>
                }

                <button id='submitting-btn'>{submitButtonText}</button>


            </form>
        </div>
    )



}


export default SpotForm
