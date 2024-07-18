import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react"
import { useEffect } from "react";
import * as reviewsActions from "../../src/store/reviews";
import SpotReview from "../SpotReview";
import OpenModalButton from "../OpenModalButton";
import PostYourReviewModal from "../PostYourReviewModal/PostYourReviewModal";

function SpotReviewsList({ spotId, spot, user }) {

  console.log(">>> spotId in SpotReviewsList", spotId);
console.log(">>>>> spot in SpotReviewsList", spot);
console.log(">>>>>> user in SpotReviewsList", user);

  let spotReviews = useSelector((state) => state.reviews);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reviewsActions.getReviewsForSpot(spotId));
  }, [dispatch, spotId]);

  const reviewsList = Object.values(spotReviews).reverse();

const [userHasReviewed, setUserHasReviewed] = useState(false)

  useEffect(()=>{
if(user !== null){
    const previousReview = reviewsList.find(review =>{
        return review.userId === user.id
    })
    if(previousReview) setUserHasReviewed(true)
}else{
    setUserHasReviewed(true)
}
    
  },[reviewsList, user])

  return (
    <>


{/*User is logged in, not the owner, and there are no reviews */}
{user !== null && spot.ownerId !== user.id && reviewsList.length === 0 && <p>Be the first to post a review!</p> }

{/* User is logged in, not the owner, and has not reviewed*/}     
{user !==null && spot.ownerId !== user.id && userHasReviewed === false &&
<div> <OpenModalButton buttonText="Post Your Review" modalComponent={<PostYourReviewModal user={user} spotId={spotId}/>}/> 
    </div>}

{
reviewsList.length > 0 &&        
        reviewsList.map((review) => {
          return ( <SpotReview key={review.id} review={review} user={user} />)
        })}




      
    </>
  );
}

export default SpotReviewsList;
