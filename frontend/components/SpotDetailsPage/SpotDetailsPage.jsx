import { useLoaderData } from "react-router-dom"
import { useSelector } from "react-redux";
import SpotReviewsList from "../SpotReviewsList";

function SpotDetailsPage(){

const user = useSelector(state => state.session.user)

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
    <div> <SpotReviewsList spotId={spotId} spot={spot} user={user} /> </div>
    {/* If there are reviews for this spot, render them below from newest to oldest.
  
  scenario #1 - user is NOT logged in, there are reviews - show the reviews, no create review button

  scenario #2 - user IS logged in, there are reviews, IS owner - show the reviews, no create review button

  scenario #3 - user IS logged in, there are reviews, is NOT owner - show the reviews AND create review button

  scenario #4 - user IS logged in, there are NO reviews, is NOT owner - REPLACE reviews with "Create first Post," AND create review button

  scenario #5 - user IS logged in, there are NO reviews, IS owner - REPLACE reviews with "No Reviews yet"

    scenario #6 - user is NOT logged in, there are NO reviews - REPLACE reviews with "No Reviews yet"
    
    */}
</>
       
    )


}

export default SpotDetailsPage