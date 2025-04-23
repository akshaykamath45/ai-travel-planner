import React from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    hotel && getPlacePhoto();
    setImageError(false);
  }, [hotel]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
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
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.hotelName +
        "," +
        hotel?.address
      }
      target="_blank"
    >
      <div className="rounded-lg hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={!imageError && photoUrl ? photoUrl : "/hotel_placeholder.jpg"}
          alt="hotel_placeholder"
          className="rounded-lg h-[200px] w-full object-cover"
          onError={() => setImageError(true)}
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍{hotel?.address}</h2>
          <h2 className="text-sm font-light">💵{hotel?.price}</h2>
          <h2 className="text-sm">⭐{hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
