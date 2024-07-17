import { useState } from "react";
import * as spotsActions from '../../src/store/spots'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import '../CreateASpot/create-a-spot.css'




// route: /spots/:id/edit

function UpdateSpotPage() {

const {id} = useParams();
const spot = useSelector((state) => state.spots[id])

console.log(">>> spot in update spot", spot);


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
      <h1>Update Your Spot</h1>
      <h2>Where&apos;s your place located?</h2>
      <p>
        Guests will only get your exact address once they booked a reservation.
      </p>
      <form onSubmit={submitHandler}>
        <label>Country</label>
        {errors.country && <p className="errors">{errors.country}</p>}
        <input
          type="text"
          name="country"
          id="country"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <label>Street Address</label>
        {errors.address && <p className="errors">{errors.address}</p>}
        <input
          type="text"
          name="street-address"
          id="street-address"
          placeholder="Street Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label>City</label>
        {errors.city && <p className="errors">{errors.city}</p>}
        <input
          type="text"
          name="city"
          id="city"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        ,<label>State</label>
        {errors.state && <p className="errors">{errors.state}</p>}
        <input
          type="text"
          name="state"
          id="state"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <label>
          <h2>Describe your place to guests</h2>
        </label>
        <p>
          Mention the best features of your space, any special amentities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>
        <textarea
          placeholder="Please write at least 30 characters"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        {errors.desc && <p className="errors">{errors.desc}</p>}
        <label>
          <h2>Create a title for your spot</h2>
        </label>
        <p>
          Catch guests&apos; attention with a spot title that highlights what
          makes your place special.
        </p>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Name of your spot"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>
          {errors.title && <p className="errors">{errors.title}</p>}

          <h2>Set a base price for your spot</h2>
        </label>
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </p>
        $
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price per night (USD)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.price && <p className="errors">{errors.price}</p>}
       

        <button type="submit" id="submit-new-spot">
          Update Your Spot
        </button>
      </form>
    </>
  );
}

export default UpdateSpotPage;
