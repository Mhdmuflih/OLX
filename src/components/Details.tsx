import { useLocation } from "react-router-dom";

const Details = () => {

    const location = useLocation();

    return (
        <div className="flex p-4">
            <img src={location.state.item.image} alt="" />
            <div>
                <h1 className="font-bold text-3xl"> $ {location.state.item.price} </h1>
                <h1 className="mt-5"> <span className="font-semibold">Category</span> : {location.state.item.category} </h1>
                <h1 className="mt-5"> <span className="font-semibold">Title</span> : {location.state.item.title} </h1>
                <h1 className="mt-5"> <span className="font-semibold">Description</span> : {location.state.item.description} </h1>
            </div>
        </div>
    )
}

export default Details;