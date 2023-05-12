import { useDispatch } from "react-redux";
import { useEffect } from 'react'
import { useModal } from '../../context/Modal'
import { deleteReviewThunk, getReviewsBySpotThunk } from '../../store/reviews'
import { getSpotDetailsThunk } from "../../store/spots";



function DeleteReviewModal({reviewId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    

    const handleDelete = (e) => {
        dispatch(deleteReviewThunk(reviewId))
        closeModal()
 
    }


    return (
        <>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={handleDelete}>{`Yes (Delete Review)`}</button>
            <button onClick={closeModal}>{`No (Keep Review)`}</button>

        </>
    )

}


export default DeleteReviewModal
