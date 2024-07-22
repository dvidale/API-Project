import OpenModalButton from '../OpenModalButton'
import DeleteReviewModal from '../DeleteReviewModal'
import '../SpotDetailsPage/spotdetails.css'


function SpotReview({review, user}){
    const reviewDate = new Date(review.createdAt)
    const options = {month: "long"};
    const month = new Intl.DateTimeFormat("en-US", options).format(reviewDate)


return (
    <>
    <div className ="spot-review">
    <div className='reviewer-name'>{review.User.firstName}</div>
    <div className="review-month-year">{month} {new Date(review.createdAt).getFullYear() }</div>
    <div>{review.review}</div>
    </div>
    {user !== null && review.userId === user.id && <div id="review-delete-button"><OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteReviewModal reviewId={review.id}/>}
              />
              </div>}
    </>
)

}


export default SpotReview;