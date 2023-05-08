import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function GetReviews() {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews ? state.reviews : null)

    console.log('reviews =====>', reviews)
    
    return (
        <>
        </>
    )
}
