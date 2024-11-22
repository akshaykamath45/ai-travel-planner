import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Places to Visit</h2>
      <div>
        {trip.tripData?.itinerary.map((item, index) => (
          <div key={index} className="mt-5">
            <h2 className="font-medium text-lg">Day {item.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item.dayPlan.map((place, index) => (
                <div key={index}>
                  <h2 className="font-medium text-sm text-[rgb(48,128,104)]">
                    {place?.timeTravel}
                  </h2>
                  <PlaceCardItem place={place} />
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
