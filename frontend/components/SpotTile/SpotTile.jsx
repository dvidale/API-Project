import { NavLink } from 'react-router-dom'


function SpotTile({spot}){

//create the tile design for each spot


return (
    <NavLink to={`spots/${spot.id}`} >
    <div id="spot-tile" className="tooltip" >
        <span className="tooltiptext">{spot.name}</span>
    <img id="spot-img" alt={spot.name} src={spot.previewImage}/>
      <p>{spot.city}, {spot.state}</p>
      <p>{spot.avgRating ? spot.avgRating : "New"}</p>
      <p>${spot.price} night</p>
    </div>
    </NavLink>
)

}


export default SpotTile