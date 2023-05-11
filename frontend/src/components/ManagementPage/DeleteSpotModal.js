import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { useSelector } from 'react-redux'

const spot = useSelector(state => state.spots.singleSpot)

function DeleteModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        return dispatch(deleteSpotThunk({
            spotId: spot.id
        })).then(closeModal)
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
