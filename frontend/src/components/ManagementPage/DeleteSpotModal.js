import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { useSelector } from 'react-redux'
import { deleteSpotThunk } from "../../store/spots";


function DeleteModal({spot}) {
    // const spot = useSelector(state => state.spots.singleSpot)
    const dispatch = useDispatch();
    const { closeModal } = useModal();
const statenow = useSelector(state => state)
console.log('state =====>', statenow)
console.log('spot ========>', spot) //undefined

    const handleDelete = (e) => {
        e.preventDefault();
        return dispatch(deleteSpotThunk( {spotId: spot.id } ))
            .then(closeModal)
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
