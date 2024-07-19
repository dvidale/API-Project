import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SpotReviewsList from "../SpotReviewsList";
import { MdOutlineStar } from "react-icons/md";
import * as spotDetailsActions from '../../src/store/spotDetails'

import '../../src/index.css'

function SpotDetailsPage(){
    const user = useSelector(state => state.session.user)

    const {id} = useParams() 

const dispatch = useDispatch()


const spot = useSelector(state => state.spotDetails[id])

const reviews = useSelector(state => state.reviews)

useEffect(()=>{

   dispatch(spotDetailsActions.getSpotDetails(id))

},[dispatch,id,reviews])



function comingSoon(e){
    e.preventDefault();

    alert('Feature coming soon')
}

    return(
      
<>
{!spot ? (<> </>) : (<>
<h1>{spot.name}</h1>
<h3>Location: {spot.city}, {spot.address}</h3>
<div id="big-spot-img"><img alt="big spot img" src={spot.SpotImages.length > 0 ? spot.SpotImages[0].url : ""} /></div>
<img id="sm-spot-img" className="sm-spot-img" alt={spot.name} src={spot.SpotImages[1].url}/>
<img id="sm-spot-img" className="sm-spot-img" alt={spot.name} src={spot.SpotImages[2].url}/>
<img id="sm-spot-img" className="sm-spot-img" alt={spot.name} src={spot.SpotImages[3].url}/>
<img id="sm-spot-img" className="sm-spot-img" alt={spot.name} src={spot.SpotImages[4].url}/>

<p>Hosted by: {spot.owner.firstName} {spot.owner.lastName}</p>
<p>Paragraph: {spot.description}</p>
<div id="spot-reserve-box">
    <div id="spot-price"> ${spot.price} night</div>
    <div id="star-rating"><span className='rating-star'><MdOutlineStar /> </span>{spot.avgStarRating !== null ? (+spot.avgStarRating).toFixed(1) : "New"}</div>
    {spot.numReviews > 0 &&
     <div id="num-reviews">{`• `}{spot.numReviews} {+spot.numReviews === 1 ? "Review" : "Reviews"}</div>
    }
   
    <button id="reserve-button" type="button"  onClick={comingSoon}>Reserve</button>
    </div>
    <hr/>

   
   
    <div id="star-rating"><span className='rating-star'><MdOutlineStar /> </span>{spot.avgStarRating !== null ? (+spot.avgStarRating).toFixed(1) : "New"}</div>
    
    <div id="reviews-list">
    <div> <SpotReviewsList spotId={spot.id} spot={spot} user={user} /> </div>
    
    </div>
</>
)}
</>   
    

)
}

export default SpotDetailsPage