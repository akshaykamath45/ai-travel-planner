import { Button } from "@/components/ui/button";
import React from "react";
import { GrMapLocation } from "react-icons/gr";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    place && getPlacePhoto();
    setImageError(false);
  }, [place]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
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
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={!imageError && photoUrl ? photoUrl : "/placeholder3.jpg"}
          alt="placeholder"
          className="w-[130px] h-[130px] rounded-xl object-cover"
          onError={() => setImageError(true)}
        />
        <div>
          <h2 className="font-bold text-lg">{place?.placeName}</h2>
          <p className="text-sm text-gray-500">{place?.placeDetails}</p>
          {/* add time to travel here */}
          {/* <Button size="sm" className="mt-2">
          <GrMapLocation />
        </Button> */}
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
