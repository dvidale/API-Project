import { useLoaderData } from "react-router-dom"
import SpotReviewsList from "../SpotReviewsList";

function SpotDetailsPage(){



let spot = useLoaderData()

let spotId = spot.id

function comingSoon(e){
    e.preventDefault();

    alert('Feature coming soon')
}

    return(
<>
<h1>{spot.name}</h1>
<h3>Location: {spot.city}, {spot.address}</h3>
<div id="big-spot-img"><img alt="big spot img" src={spot.SpotImages.length > 0 ? spot.SpotImages[0].url : ""} /></div>
<div id="sm-spot-img"><img alt="small img 1"/></div>
<div id="sm-spot-img"><img alt="small img 2"/></div>
<div id="sm-spot-img"><img alt="small img 3"/></div>
<div id="sm-spot-img"><img alt="small img 4"/></div>
<p>Hosted by: {spot.owner.firstName} {spot.owner.lastName}</p>
<p>Paragraph: {spot.description}</p>
<div id="spot-reserve-box">
    <div id="spot-price"> ${spot.price} night</div>
    <div id="star-rating">{spot.avgStarRating && (spot.avgStarRating).toFixed(1)} avg stars (change to icons)</div>
    {spot.numReviews > 0 &&
     <div id="num-reviews">{`• `}{spot.numReviews} {spot.numReviews === 1 ? "Review" : "Reviews"}</div>
    }
   
    <button id="reserve-button" type="button"  onClick={comingSoon}>Reserve</button>
    </div>
    <div id="reviews-list">

    </div>
    <div> <SpotReviewsList spotId={spotId}/> </div>
    {/* If there are reviews for this spot, render them below from newest to oldest.
    
- WE NEED TO CREATE A STATE SLICE FOR REVIEWS!

    - use the current spot id to drive a dispatch to '/api/spots/:spotId/reviews'
    - return the results to a local state variable

    - I can use the useSelector to listen to the state slice loaded by the dispatch, and set the local state variable to the info from the slice

    - use the state variable to populate the review list on the page

    - this way, if a review is added to the list, the selector will be triggered to update the state variable, dynamically updating the list
    
    
    */}
</>
       
    )


}

export default SpotDetailsPage