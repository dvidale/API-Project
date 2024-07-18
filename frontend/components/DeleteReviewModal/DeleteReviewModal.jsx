import { useModal } from '../../src/context/Modal';
import { useDispatch } from 'react-redux';
import * as reviewsActions from '../../src/store/reviews'
import '../../src/index.css'

function DeleteReviewModal({reviewId}){

const dispatch = useDispatch()
const {closeModal} = useModal();

function deleteAReview(e){

    e.preventDefault()

    return dispatch(reviewsActions.deleteReview(reviewId)).then(closeModal)
}



    return(
        <>
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this review?</p>
    <button id="delete-review-btn" className="modal-delete-button" onClick={deleteAReview}>Yes (Delete Review)</button>
    <button id="cancel-delete-review-btn" className="modal-cancel-delete-button" onClick={closeModal}>No (Keep Review)</button>
        </>
    )
}

export default DeleteReviewModal;