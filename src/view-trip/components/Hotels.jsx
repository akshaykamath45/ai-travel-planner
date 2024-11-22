import React from "react";
import { Link } from "react-router-dom";
function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-2">
        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
          <Link
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              hotel?.hotelName +
              "," +
              hotel?.address
            }
            target="_blank"
          >
            <div className="rounded-lg hover:scale-105 transition-all hover:shadow-md cursor-pointer" key={index}>
              <img
                src="/hotel_placeholder.jpg"
                alt="hotel_placeholder"
                className="rounded-lg"
              />
              <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium">{hotel?.hotelName}</h2>
                <h2 className="text-xs text-gray-500">📍{hotel?.address}</h2>
                <h2 className="text-sm font-light">💵{hotel?.price}</h2>
                <h2 className="text-sm">⭐{hotel?.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
