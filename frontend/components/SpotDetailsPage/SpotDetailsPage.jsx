import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SpotReviewsList from "../SpotReviewsList";
import { MdOutlineStar } from "react-icons/md";
import * as spotDetailsActions from "../../src/store/spotDetails";
import "./spotdetails.css";
import "../../src/index.css";

function SpotDetailsPage() {
  const user = useSelector((state) => state.session.user);

  console.log(">>> user:", user);

  const { id } = useParams();

  console.log(">>>> id:", id);

  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spotDetails[id]);

  console.log(">>>>> spot:", spot);

  const reviews = useSelector((state) => state.reviews);
 

  useEffect(() => {
    dispatch(spotDetailsActions.getSpotDetails(id));
  }, [dispatch, id, reviews]);

  function comingSoon(e) {
    e.preventDefault();

    alert("Feature coming soon");
  }

  return (
    <>
      {spot ? (

<>
<div id="spot-details-page-container">
  <h1>{spot.name}</h1>
  <h3>
    Location: {spot.city}, {spot.address}
  </h3>
  <div id="img-container">
    
    {spot.SpotImages.length > 0 ? (
      <>
      <img
        id="big-spot-img"
        alt="big spot img" 
        src={spot.SpotImages[0].url}
      />
      </>
    ):(
      <>
      <span>No Image Available</span>
      </>
    )
    }
      {/* <img
        id="big-spot-img"
        alt="big spot img" 
        src={spot.SpotImages.length > 0 ? spot.SpotImages[0].url : "No Image"}
      /> */}
      
      {/* <div id='big-spot-img' className="fill" style={{backgroundImg: `url(https://images.pexels.com/photos/1130256/pexels-photo-1130256.jpeg)`}}></div> */}
   

   
      <img
        id="sm-spot-img-1"
        className="sm-spot-img"
        alt={spot.name}
        src={spot.SpotImages.length > 0 ? spot.SpotImages[0].url : ""}
      />
      <img
        id="sm-spot-img-2"
        className="sm-spot-img"
        alt={spot.name}
        src={spot.SpotImages.length > 0 ? spot.SpotImages[0].url : ""}
      />
      <img
        id="sm-spot-img-3"
        className="sm-spot-img"
        alt={spot.name}
        src={spot.SpotImages.length > 0 ? spot.SpotImages[0].url : ""}
      />
      <img
        id="sm-spot-img-4"
        className="sm-spot-img"
        alt={spot.name}
        src={spot.SpotImages.length > 0 ? spot.SpotImages[0].url : ""}
      />

  </div>

  <div id="desc-reserve-box-container">
    <div id="host-and-desc-container">
      <h2>
        Hosted by {spot.owner.firstName} {spot.owner.lastName}
      </h2>
      <p>Description: {spot.description}</p>
    </div>

    <div id="spot-reserve-box">
      <div id="price-rating-reviews-container">
        <div ><span id="spot-price"> ${spot.price}</span> night</div>

        <div id="rating-review-container">
          <div id="star-rating">
            <span className="rating-star">
              <MdOutlineStar />{" "}
            </span>
            {spot.avgStarRating !== null
              ? (+spot.avgStarRating).toFixed(1)
              : "New"}
          </div>
          {spot.numReviews > 0 && (
            <div id="num-reviews">
              {`•   `}
              {spot.numReviews}{" "}
              {+spot.numReviews === 1 ? "review" : "reviews"}
            </div>
          )}
        </div>
      </div>

      <button id="reserve-button" type="button" onClick={comingSoon}>
        Reserve
      </button>
    </div>
  </div>

  <hr />

  <div id="review-list-rating-review-container">
    <div id="star-rating">
      <span className="rating-star">
        <MdOutlineStar />{" "}
      </span>
      {spot.avgStarRating !== null
        ? (+spot.avgStarRating).toFixed(1)
        : "New"}
    </div>
    {spot.numReviews > 0 && (
      <div id="num-reviews">
        {`•   `}
        {spot.numReviews}{" "}
        {+spot.numReviews === 1 ? "review" : "reviews"}
      </div>
    )}
  </div>

  <div id="reviews-list">
    <SpotReviewsList spotId={spot.id} spot={spot} user={user} />
  </div>
</div>
</>

        
      ) : ( <> </>)}
    </>
  );
}

export default SpotDetailsPage;
