import { useModal } from '../../src/context/Modal';
import { useDispatch } from 'react-redux';
import * as reviewsActions from '../../src/store/reviews'
import '../../src/index.css'
import '../DeleteSpotModal/delete-spot-modal.css'

function DeleteReviewModal({reviewId}){

const dispatch = useDispatch()
const {closeModal} = useModal();

function deleteAReview(e){

    e.preventDefault()

    return dispatch(reviewsActions.deleteReview(reviewId)).then(closeModal)
}



    return(
        <>
        <div id='delete-modal-container'> 
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this review?</p>
    <button id="delete-review-btn" className="red-button" onClick={deleteAReview}>Yes (Delete Review)</button>
    <button id="cancel-delete-review-btn" className="gray-button" onClick={closeModal}>No (Keep Review)</button>
    </div>
        </>
    )
}

export default DeleteReviewModal;