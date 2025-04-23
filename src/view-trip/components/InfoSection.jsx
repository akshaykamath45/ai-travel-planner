import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React from "react";
import { IoIosSend } from "react-icons/io";
import { useEffect, useState } from "react";
import { getTravelerIcon, getBudgetIcon, getTravelTagIcon } from "@/utils/iconMapping";

function InfoSection({ trip }) {
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
    <div>
      <img
        src={!imageError && photoUrl ? photoUrl : "/placeholder3.jpg"}
        alt="placeholder"
        className="h-[340px] w-full object-cover rounded-xl"
        onError={() => setImageError(true)}
      />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          {" "}
          <div className="my-5 flex flex-col gap-2">
            <h2 className="font-bold text-2xl">
              {trip?.userSelection?.location?.label}
            </h2>
            <div className="flex flex-wrap gap-3">
              <h2 className="p1 px-3 bg-gray-200 rounded-full text-gray-500">
                📅 {trip?.userSelection?.noOfDays} Days
              </h2>
              <h2 className="p1 px-3 bg-gray-200 rounded-full text-gray-500">
                {getBudgetIcon(trip?.userSelection?.budget)} {trip?.userSelection?.budget} Budget
              </h2>
              {trip?.userSelection?.perPersonBudget &&  <h2 className="p1 px-3 bg-gray-200 rounded-full text-gray-500">
              💰 {trip?.userSelection?.perPersonBudget} $ Per Person
              </h2>}
             
              <h2 className="p1 px-3 bg-gray-200 rounded-full text-gray-500">
                {getTravelerIcon(trip?.userSelection?.travelers)} {trip?.userSelection?.travelers} 
              </h2>
              {trip?.userSelection?.travelTags?.map((pref, index) => (
                <h2 key={index} className="p1 px-3 bg-gray-200 rounded-full text-gray-500">
                  {getTravelTagIcon(pref)} {pref}
                </h2>
              ))}
            </div>
          </div>
          <Button>
            <IoIosSend />
          </Button>
        </div>
        {trip?.tripData?.tripSummary && (
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold text-lg mb-2">Trip Summary</h3>
            <p className="text-gray-600 whitespace-pre-line">{trip?.tripData?.tripSummary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoSection;
