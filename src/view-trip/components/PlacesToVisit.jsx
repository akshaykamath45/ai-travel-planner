import React, { useState } from "react";
import PlaceCardItem from "./PlaceCardItem";
import { useEffect } from "react";
function PlacesToVisit({ trip }) {
  const [tripData, setTripData] = useState(trip?.tripData);

  useEffect(() => {
    if (trip?.tripData) {
      setTripData(trip.tripData);
    }
  }, [trip]);

  const handlePlaceChange = (newPlace, dayIndex, placeIndex) => {
    const updatedTripData = { ...tripData };
    updatedTripData.itinerary[dayIndex].dayPlan[placeIndex] = {
      ...updatedTripData.itinerary[dayIndex].dayPlan[placeIndex],
      ...newPlace
    };
    setTripData(updatedTripData);
  };

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Places to Visit</h2>
      <div>
        {tripData?.itinerary.map((item, dayIndex) => (
          <div key={dayIndex} className="mt-5">
            <h2 className="font-medium text-lg">Day {item.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item.dayPlan.map((place, placeIndex) => (
                <div key={placeIndex}>
                  <h2 className="font-medium text-sm text-[rgb(48,128,104)]">
                    {place?.timeTravel}
                  </h2>
                  <PlaceCardItem 
                    place={place} 
                    onPlaceChange={(newPlace) => handlePlaceChange(newPlace, dayIndex, placeIndex)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;