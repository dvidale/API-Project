import { useState } from "react";

// import '../Navigation/Navigation.css'
import * as spotsActions from '../../src/store/spots'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../../src/index.css'
import "./create-a-spot.css";


function CreateASpot() {
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [imgTwo, setImgTwo] = useState("");
  const [imgThree, setImgThree] = useState("");
  const [imgFour, setImgFour] = useState("");
  const [imgFive, setImgFive] = useState("");
  const [errors, setErrors] = useState({});

const dispatch = useDispatch();
const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const err = {};

    if (!country) err.country = "Country is required";
    if (!address) err.address = "Address is required";
    if (!city) err.city = "City is required";
    if (!state) err.state = "State is required";
    if (!title) err.title = "Name is required";
    if (!price) err.price = "Price is required";
    if (!previewImg) err.previewImg = "Preview image is required";

    if (desc.length < 30) err.desc = "Description needs 30 or more characters";
   
  


if(previewImg.length > 0 && !(previewImg.endsWith("jpeg") || previewImg.endsWith("jpg") || previewImg.endsWith("png"))){
  err.previewImg = "Image URL must end in .png, .jpg, or .jpeg";
}

if(imgTwo.length > 0 && !(imgTwo.endsWith("jpeg") || imgTwo.endsWith("jpg") || imgTwo.endsWith("png"))){
  err.imgTwo = "Image URL must end in .png, .jpg, or .jpeg";
}

if(imgThree.length > 0 && !(imgThree.endsWith("jpeg") || imgThree.endsWith("jpg") || imgThree.endsWith("png"))){
  err.imgThree = "Image URL must end in .png, .jpg, or .jpeg";
}

if(imgFour.length > 0 && !(imgFour.endsWith("jpeg") || imgFour.endsWith("jpg") || imgFour.endsWith("png"))){
  err.imgFour = "Image URL must end in .png, .jpg, or .jpeg";
}

if(imgFive.length > 0 && !(imgFive.endsWith("jpeg") || imgFive.endsWith("jpg") || imgFive.endsWith("png"))){
  err.imgFive = "Image URL must end in .png, .jpg, or .jpeg";
}

    setErrors(err);


    if(!Object.keys(err).length){

const createSpotFormData = {
address,
city,
state,
country,
lat: 70,
lng: 70,
name: title,
description: desc,
price
}


  dispatch(spotsActions.createSpot(createSpotFormData))
  .then(spot => dispatch(spotsActions.addSpotImage(spot.id, previewImg)))
  .then( spotId => navigate(`/spots/${spotId}`))

  


    }
  };

  return (
    <>
<div id="create-spot-form-container">
    <form id="create-spot-form" onSubmit={submitHandler}>
      <h1>Create a New Spot</h1>
      <h2>Where&apos;s your place located?</h2>
      <p>
        Guests will only get your exact address once they booked a reservation.
      </p>
      
        <label htmlFor="Country">Country
        {errors.country && <span className="inline-errors">{errors.country}</span>}
        <div><input
        className="long-input-field"
          type="text"
          name="country"
          id="country"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
    
</div>
</label>
<div className="label-margin">
        <label htmlFor="Street Address">Street Address
        {errors.address && <span className="inline-errors">{errors.address}</span>}
       <div> <input
        className="long-input-field"
          type="text"
          name="street-address"
          id="street-address"
          placeholder="Street Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        </div>
        </label>
        </div>
        <div className="two-input-fields-container label-margin"> 
          <div className="city-and-field-container">
        <label htmlFor="City">City
        {errors.city && <span className="inline-errors">{errors.city}</span>}
       <div>
        <input
        className="medium-input-field"
          type="text"
          name="city"
          id="city"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <span>{" "},</span>
        </div>
        </label>
        </div>
        <div className="state-and-field-container">
        <label htmlFor="State">State
        {errors.state && <span className="inline-errors">{errors.state}</span>}
        <div id="state-input-field">
        <input
          className="small-input-field"
          type="text"
          name="state"
          id="state"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        </div>
        </label>
         </div>
         </div>

        <label htmlFor="Description">
          <h2>Describe your place to guests</h2>
        
        <p>
          Mention the best features of your space, any special amentities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>
        <textarea
        id="description"
         className="desc-text-area"
          placeholder="Please write at least 30 characters"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        </label>
        {errors.desc && <span className="errors">{errors.desc}</span>}

        <hr/>
        <label htmlFor="Title">
          <h2>Create a title for your spot</h2>
    
        <p>
          Catch guests&apos; attention with a spot title that highlights what
          makes your place special.
        </p>

        <input
        className="long-input-field"
          type="text"
          name="title"
          id="title"
          placeholder="Name of your spot"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
    </label>


        <label htmlFor="Price">

          {errors.title && <div className="errors label-margin">{errors.title}</div>}
<hr/>
          <h2>Set a base price for your spot</h2>
     
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </p>
        $
        <input
        className="price-input-field"
          type="number"
          id="price"
          name="price"
          placeholder="Price per night (USD)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
   </label>
        {errors.price && <div className="errors label-margin">{errors.price}</div>}
        <hr/>
          <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <label htmlFor="Preview Image URL">
        <input
        className="preview-img-input-field"
        type="text"
        id="Preview-Image-URL"
        name="Preview-Image-URL"
        placeholder="Preview Image URL"
        value={previewImg}
        onChange={(e) => setPreviewImg(e.target.value)}
        />
        </label>
        {errors.previewImg && <div className="errors">{errors.previewImg}</div>}
        <label htmlFor="Image URL 2">
        <input
        className="img-input-field"
          type="text"
          id="Image-URL-2"
          name="Image-URL-2"
          placeholder="Image URL"
          value={imgTwo}
          onChange={(e) => setImgTwo(e.target.value)}
        />
</label>
        {errors.imgTwo && <span className="errors">{errors.imgTwo}</span>}

        <label htmlFor="Image URL 3">
        <input
        className="img-input-field"
          type="text"
          id="Image-URL-3"
          name="Image-URL-3"
          placeholder="Image URL"
          value={imgThree}
          onChange={(e) => setImgThree(e.target.value)}
        />
        </label>
         {errors.imgThree && <span className="errors">{errors.imgThree}</span>}
        
         <label htmlFor="Image URL 4">
        <input
        className="img-input-field"
          type="text"
          id="Image-URL-4"
          name="Image-URL-4"
          placeholder="Image URL"
          value={imgFour}
          onChange={(e) => setImgFour(e.target.value)}
        />
        </label>
         {errors.imgFour && <span className="errors">{errors.imgFour}</span>}

         <label htmlFor="Image URL 5">
        <input
        className="img-input-field"
          type="text"
          id="Image-URL-5"
          name="Image-URL-5"
          placeholder="Image URL"
          value={imgFive}
          onChange={(e) => setImgFive(e.target.value)}
        />
        </label>
                 {errors.imgFive && <span className="errors">{errors.imgFive}</span>}

<hr/>
<div id="create-button-container">
        <button type="submit" id="submit-new-spot">
          Create Spot
        </button>
        </div>
      </form>
      </div>
    </>
  );
}

export default CreateASpot;
