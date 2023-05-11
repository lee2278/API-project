import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'

import { deleteSpotThunk } from "../../store/spots";


function DeleteModal({spot}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    console.log('spot =====>', spot)


    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSpotThunk(spot.id))
        closeModal()
    }


    return (
        <>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button onClick={handleDelete}>{`Yes (Delete Spot)`}</button>
            <button onClick={closeModal}>{`No (Keep Spot)`}</button>

        </>
    )

}


export default DeleteModal
