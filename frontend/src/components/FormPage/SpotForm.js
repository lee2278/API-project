import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createSpotThunk } from '../../store/spots'

const SpotForm = ({spot, formType}) => {
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [spotImages, setSpotImages] = useState([])
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        spot = {...spot}
     
        if (formType === 'Create Spot') {
            const newSpot = await dispatch(createSpotThunk(spot))
            spot = newSpot;
        }
        if (spot.errors) {
            setErrors(spot.errors)
        }
    }


return (
    <form onSubmit={handleSubmit}>
        <h2>{formType}</h2>
        <h2>test</h2>
        <label>country
            <input
            type='text'
            value={country}
            onChange={(e) => setCountry(e.target.value)}/>
        </label>
    </form>
)



}


export default SpotForm
