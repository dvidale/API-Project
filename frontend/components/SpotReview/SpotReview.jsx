


function SpotReview({review}){
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
    </>
)

}


export default SpotReview;