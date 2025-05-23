import React from "react";
import { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { Link } from "react-router-dom";


function UserTripCard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    trip && getPlacePhoto();
    setImageError(false);
  }, [trip]);
  const getPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      // console.log(resp.data.places[0].photos[3].name);
      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(photoUrl);
    }).catch(() => {
      setImageError(true);
    });
  };
  return (
    <Link to={"/view-trip/" + trip?.id}>
      {" "}
      <div className="hover:scale-105 transition-all ">
        <img
          src={!imageError && photoUrl ? photoUrl : "/placeholder3.jpg"}
          className="object-cover rounded-xl h-[220px] w-full"
          alt="trip-cover"
          onError={() => setImageError(true)}
        ></img>
        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCard;
