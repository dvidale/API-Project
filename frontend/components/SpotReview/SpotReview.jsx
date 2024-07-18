import OpenModalButton from '../OpenModalButton'
import DeleteReviewModal from '../DeleteReviewModal'

function SpotReview({review, user}){
    const reviewDate = new Date(review.createdAt)
    const options = {month: "long"};
    const month = new Intl.DateTimeFormat("en-US", options).format(reviewDate)


return (
    <>
    <div id ="spot-review">
    <div>{review.User.firstName}</div>
    <div>{month} {new Date(review.createdAt).getFullYear() }</div>
    <div>{review.review}</div>
    </div>
    {review.userId === user.id && <div><OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteReviewModal reviewId={review.id}/>}
              />
              </div>}
    </>
)

}


export default SpotReview;