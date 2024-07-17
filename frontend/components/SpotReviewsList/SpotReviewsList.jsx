import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useState } from "react"
import * as reviewActions from '../../src/store/reviews'


function SpotReviewsList({spotId}){
    const [reviewList, setReviewList] = useState([])


    const dispatch = useDispatch()

    dispatch(reviewActions.getReviewsForSpot(spotId))

    return (
        <>
        <h1>Reviews</h1>
        <h2>Spot id: {spotId}</h2>
        </>
    )



}


export default SpotReviewsList