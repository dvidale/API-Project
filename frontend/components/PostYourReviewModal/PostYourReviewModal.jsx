import { useModal } from "../../src/context/Modal";
import { useState, useEffect } from "react";
import StarRatingControls from "../StarRatingControls";
import { useDispatch } from "react-redux";
import * as reviewsActions from '../../src/store/reviews'
import './post-your-review.css'
import '../../src/index.css'

function PostYourReviewModal({user, spotId}){

const [ review, setReview ] = useState('')
const [stars, setStars] = useState(0)
const [errors, setErrors] = useState({})
const [serverError, setServerError] = useState('')

const dispatch = useDispatch();
   
    const { closeModal } = useModal();

    //useEffect to validate data to enable submit
    useEffect(()=>{
        const err = {}

        if(review.length < 10) err.review = "Review must be longer than 10 characters"

        if(stars === 0) err.stars = "Star rating must be greater than zero"

        setErrors(err)


    },[review,stars])

    //form submission happens here, so we need the spotId to associate the review




 function submitHandler(e){
e.preventDefault();
//dispatch reviewData, spotId to POST route thunk


const reviewData = {
    review, stars
}

return dispatch(reviewsActions.createReview(reviewData, spotId, user)).then(closeModal).catch(
    async (res) => {
      const data = await res.json();
    
      if (data && data.errors) setServerError(data.errors);
      
    });

//close the Modal

    }

    const onChange = (number) => {
        // const number = e.target.value;
        setStars(parseInt(number));
      };



return (
    <>
    <h1>How was your stay?</h1>
{serverError.review && <p className="errors" >{serverError.review}</p>}
{serverError.stars && <p className="errors" >{serverError.stars}</p>}
    <form onSubmit={submitHandler}>
        <textarea value={review} onChange={e => setReview(e.target.value) } placeholder="Leave your review here..."/>
        <StarRatingControls onChange={onChange} stars={stars}/> <label>Stars</label>
        <button disabled={Object.keys(errors).length > 0}>Submit Your Review</button>
    </form>
    </>
)

}

export default PostYourReviewModal;