import { useLoaderData } from "react-router-dom"
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from 'react';
// import * as spotsActions from '../../src/store/spots'

function SpotDetails(){

// let spot = useSelector((state)=> state.spots[id]);

let spot = useLoaderData()
// console.log(">>>> spot data", spot);


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
</>
       
    )


}

export default SpotDetails