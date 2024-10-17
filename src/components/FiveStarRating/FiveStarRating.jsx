import { StarFill, Star as StarEmpty, StarHalf } from "react-bootstrap-icons"
export function FiveStarRating({rating}){
    const starList = []
    const starFill = Math.floor(rating)
    const hasStarHalf = rating - starFill >= 0.5
    const starEmpty = 5 - starFill - (hasStarHalf ? 1 : 0)
    for(let i=1; i <= starFill; i++){
        starList.push(< StarFill key={"star-fill"+i} />)
    }
    if(hasStarHalf) {
        starList.push(< StarHalf key={"star-half"}/>)
    }    
    for(let i=1; i <= starEmpty; i++){
        starList.push(< StarEmpty key={"star-empty"+i} />)
    }
    return (<div>{starList}</div>)
}