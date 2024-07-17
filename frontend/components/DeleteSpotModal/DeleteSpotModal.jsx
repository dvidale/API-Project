import * as spotsActions from '../../src/store/spots'
import { useDispatch } from 'react-redux';
import './delete-spot-modal.css'
import { useModal } from '../../src/context/Modal';

const DeleteSpotModal = ({spotId}) =>{

    const dispatch = useDispatch()
   
const { closeModal } = useModal();

function deleteASpot(e){
e.preventDefault()

return dispatch(spotsActions.deleteASpot(spotId)).then(closeModal)

}


return (
    <>
    <h1>Confirm Delete</h1>
    <p>Are you sure you want to remove this spot?</p>
    <button id="delete-spot-btn" className="red-button" onClick={deleteASpot}>Yes (Delete Spot)</button>
    <button id="cancel-delete-spot-btn" className="gray-button">No (Keep Spot)</button>

    </>
)


}

export default DeleteSpotModal;