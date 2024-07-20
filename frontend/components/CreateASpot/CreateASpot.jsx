import { useState } from "react";
import "./create-a-spot.css";
import '../../src/index.css'
import * as spotsActions from '../../src/store/spots'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
      
        <label>Country</label>
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
<div className="label-margin">
        <label >Street Address</label>
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
        </div>
        <div className="two-input-fields-container label-margin"> 
          <div className="city-and-field-container">
        <label>City</label>
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
        ,
        </div>
        </div>
        <div className="state-and-field-container">
        <label>State</label>
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
         </div>
         </div>

        <label>
          <h2>Describe your place to guests</h2>
        </label>
        <p>
          Mention the best features of your space, any special amentities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>
        <textarea
         className="desc-text-area"
          placeholder="Please write at least 30 characters"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        {errors.desc && <span className="errors">{errors.desc}</span>}

        <hr/>
        <label>
          <h2>Create a title for your spot</h2>
        </label>
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
        <label>

          {errors.title && <div className="errors label-margin">{errors.title}</div>}
<hr/>
          <h2>Set a base price for your spot</h2>
        </label>
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
        {errors.price && <div className="errors label-margin">{errors.price}</div>}
        <hr/>
        <label>
          <h2>Liven up your spot with photos</h2>
        </label>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <input
        className="preview-img-input-field"
          type="text"
          id="Image-URL"
          name="Preview-Image-URL"
          placeholder="Preview Image URL"
          value={previewImg}
          onChange={(e) => setPreviewImg(e.target.value)}
        />
        {errors.previewImg && <div className="errors">{errors.previewImg}</div>}
        <input
        className="img-input-field"
          type="text"
          id="Image-URL"
          name="Image-URL-2"
          placeholder="Image URL"
          value={imgTwo}
          onChange={(e) => setImgTwo(e.target.value)}
        />
        {errors.imgTwo && <span className="errors">{errors.imgTwo}</span>}
        <input
        className="img-input-field"
          type="text"
          id="Image-URL"
          name="Image-URL-3"
          placeholder="Image URL"
          value={imgThree}
          onChange={(e) => setImgThree(e.target.value)}
        />
         {errors.imgThree && <span className="errors">{errors.imgThree}</span>}
        
        
        <input
        className="img-input-field"
          type="text"
          id="Image-URL"
          name="Image-URL-4"
          placeholder="Image URL"
          value={imgFour}
          onChange={(e) => setImgFour(e.target.value)}
        />
         {errors.imgFour && <span className="errors">{errors.imgFour}</span>}


        <input
        className="img-input-field"
          type="text"
          id="Image-URL"
          name="Image-URL-5"
          placeholder="Image URL"
          value={imgFive}
          onChange={(e) => setImgFive(e.target.value)}
        />
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
