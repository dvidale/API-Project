import { NavLink } from 'react-router-dom'
import { MdOutlineStar } from "react-icons/md";

import '../../src/index.css'

function SpotTile({spot}){

//create the tile design for each spot
console.log(">>>>>> spot data on SpotTile", spot);

return (
    <NavLink to={`spots/${spot.id}`} >
    <div id="spot-tile" className="tooltip" >
        <span className="tooltiptext">{spot.name}</span>
    <img id="spot-img" alt={spot.name} src={spot.previewImage}/>
      <p>{spot.city}, {spot.state}</p>
      <span className='rating-star'><MdOutlineStar /> 
       {spot.avgRating > 0 ? (spot.avgRating).toFixed(1) : "New"}</span>
      <p>${spot.price} night</p>
    </div>
    </NavLink>
)

}


export default SpotTile