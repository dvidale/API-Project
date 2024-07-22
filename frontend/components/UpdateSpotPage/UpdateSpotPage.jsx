import { useState } from "react";
import * as spotsActions from '../../src/store/spots'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import '../CreateASpot/create-a-spot.css'
import '../../src/index.css'



// route: /spots/:id/edit

function UpdateSpotPage() {

const {id} = useParams();
const spot = useSelector((state) => state.spots[id])




  const [country, setCountry] = useState(spot.country);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [desc, setDesc] = useState(spot.description);
  const [title, setTitle] = useState(spot.name);
  const [price, setPrice] = useState(spot.price);

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
    

    if (desc.length < 30) err.desc = "Description needs 30 or more characters";
   
    setErrors(err);


    if(!Object.keys(err).length){
const updateSpotFormData = {
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


  dispatch(spotsActions.updateASpot(updateSpotFormData, id)).then( spot => navigate(`/spots/${spot.id}`))

  


    }
  };

  return (
    <>
    <div id="create-spot-form-container">
    <form id="create-spot-form" onSubmit={submitHandler}>
      <h1>Update Your Spot</h1>
      <h2>Where&apos;s your place located?</h2>
      <p>
        Guests will only get your exact address once they booked a reservation.
      </p>
      
        <label htmlFor='Country'>Country
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
        <label htmlFor=''>Street Address
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
        ,
        </div>
        </label>
        </div>
        <div className="state-and-field-container">
        <label htmlFor="State">State
        {errors.state && <span className="inline-errors">{errors.state}</span>}
        <div>
        <input
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

        
          <h2>Describe your place to guests</h2>
      
        <p>
          Mention the best features of your space, any special amentities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>
        <label htmlFor="Description">
        <textarea
        id="desc-text-area"
         className="desc-text-area"
          placeholder="Please write at least 30 characters"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
          </label>
        {errors.desc && <span className="errors">{errors.desc}</span>}

        <hr/>
        
          <h2>Create a title for your spot</h2>
        
        <p>
          Catch guests&apos; attention with a spot title that highlights what
          makes your place special.
        </p>

        <label htmlFor="Title">
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




          {errors.title && <div className="errors label-margin">{errors.title}</div>}
<hr/>
          <h2>Set a base price for your spot</h2>
       
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </p>
        $

        <label htmlFor="Price">
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
        <div id="create-button-container">
        <button type="submit" id="submit-new-spot">
          Update Your Spot
        </button>
        </div>
      </form>
      </div>
    </>
  );
}

export default UpdateSpotPage;
