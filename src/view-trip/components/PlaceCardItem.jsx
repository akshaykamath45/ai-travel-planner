import { Button } from "@/components/ui/button";
import React from "react";
import { GrMapLocation } from "react-icons/gr";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { savePlaceFeedback, getPlaceFeedback } from "@/service/feedbackService";
import { toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
function PlaceCardItem({ place, onPlaceChange }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [imageError, setImageError] = useState(false);
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState('🤩🙁'); // Default feedback icon
  const [alternativePlaces, setAlternativePlaces] = useState([]);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    if (place) {
      getPlacePhoto();
      loadExistingFeedback();
    }
    setImageError(false);
  }, [place]);

  const loadExistingFeedback = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && place) {
      const feedback = await getPlaceFeedback(place.placeName, user.email);
      if (feedback.length > 0) {
        setFeedbackStatus(feedback[0].status === 'accepted' ? '👍' : '👎');
      }
    }
  };

  const getSimilarPlaces = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const prompt = `Suggest 5 alternative places similar to ${place.placeName} in the same region or city that visitors might enjoy. Focus on local attractions and venues within the same geographical area. Consider both similar attractions and contrasting options that align with the same interests. Format the response as a JSON array with objects containing 'placeName' and 'placeDetails' properties.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        // Extract JSON array from the response text which is wrapped in code block
        const jsonMatch = text.match(/```json\n(.+?)\n```/s);
        const jsonStr = jsonMatch ? jsonMatch[1] : text;
        const suggestions = JSON.parse(jsonStr);
        setAlternativePlaces(suggestions);
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        // Fallback default places if API fails
        setAlternativePlaces([
          {
            placeName: "Historical Museum",
            placeDetails: "Explore local history and cultural artifacts in this comprehensive museum."
          },
          {
            placeName: "Botanical Gardens",
            placeDetails: "Beautiful gardens featuring local and exotic plants with peaceful walking paths."
          },
          {
            placeName: "Local Art Gallery",
            placeDetails: "Contemporary art exhibitions showcasing local and international artists."
          },
          {
            placeName: "City Viewpoint",
            placeDetails: "Panoramic views of the city skyline and surrounding landscape."
          },
          {
            placeName: "Cultural Center",
            placeDetails: "Hub for local performances, exhibitions, and cultural events."
          }
        ]);
      }
      setShowAlternatives(true);
    } catch (error) {
      console.error('Error getting similar places:', error);
      // Use default places as fallback
      setAlternativePlaces([
        {
          placeName: "Historical Museum",
          placeDetails: "Explore local history and cultural artifacts in this comprehensive museum."
        },
        {
          placeName: "Botanical Gardens",
          placeDetails: "Beautiful gardens featuring local and exotic plants with peaceful walking paths."
        },
        {
          placeName: "Local Art Gallery",
          placeDetails: "Contemporary art exhibitions showcasing local and international artists."
        },
        {
          placeName: "City Viewpoint",
          placeDetails: "Panoramic views of the city skyline and surrounding landscape."
        },
        {
          placeName: "Cultural Center",
          placeDetails: "Hub for local performances, exhibitions, and cultural events."
        }
      ]);
      setShowAlternatives(true);
    }
  };

  const handleFeedback = async (status) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast("Please sign in to provide feedback");
      return;
    }

    const feedbackData = {
      placeName: place.placeName,
      userEmail: user.email,
      status: status,
      placeDetails: place.placeDetails
    };

    const result = await savePlaceFeedback(feedbackData);
    if (result.success) {
      setFeedbackStatus(status === 'accepted' ? '👍' : '👎');
      toast("Thank you for your feedback!");
      if (status === 'rejected') {
        await getSimilarPlaces();
      } else {
        setOpenFeedbackDialog(false);
      }
    } else {
      toast("Failed to save feedback. Please try again.");
      setOpenFeedbackDialog(false);
    }
  };

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
    <div className="relative">
      <div 
        className="absolute top-2 right-2 z-10 cursor-pointer text-2xl"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpenFeedbackDialog(true);
        }}
      >
        {feedbackStatus}
      </div>
      <Link
        to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName}
        target="_blank"
        className="block"
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
      <Dialog open={openFeedbackDialog} onOpenChange={setOpenFeedbackDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Provide Feedback for {place?.placeName}</DialogTitle>
          </DialogHeader>
          {!showAlternatives ? (
            <div className="flex justify-center gap-4 mt-4">
              <Button
                onClick={() => handleFeedback('accepted')}
                className="bg-green-500 hover:bg-green-600"
              >
                Accept 👍
              </Button>
              <Button
                onClick={() => handleFeedback('rejected')}
                className="bg-red-500 hover:bg-red-600"
              >
                Reject 👎
              </Button>
            </div>
          ) : (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-3">Here are some alternative places you might enjoy:</h3>
              <div className="space-y-4">
                {alternativePlaces.map((altPlace, index) => (
                  <div 
                    key={index} 
                    className={`p-3 border rounded-lg hover:bg-gray-50 cursor-pointer ${selectedPlace?.placeName === altPlace.placeName ? 'border-blue-500 bg-blue-50' : ''}`}
                    onClick={() => setSelectedPlace(altPlace)}
                  >
                    <h4 className="font-medium">{altPlace.placeName}</h4>
                    <p className="text-sm text-gray-600">{altPlace.placeDetails}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedPlace(null);
                    setShowAlternatives(false);
                    setOpenFeedbackDialog(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!selectedPlace}
                  onClick={async () => {
                    if (selectedPlace) {
                      toast.loading('Updating place...');
                      try {
                        // Update the place details
                        const data = {
                          textQuery: selectedPlace.placeName,
                        };
                        const result = await GetPlaceDetails(data);
                        const newPhotoUrl = PHOTO_REF_URL.replace(
                          "{NAME}",
                          result.data.places[0].photos[3].name
                        );
                        
                        // Update the place in parent component
                        onPlaceChange({
                          ...selectedPlace,
                          photoUrl: newPhotoUrl
                        });

                        // Reset feedback status and close dialog
                        setFeedbackStatus('🤩🙁');
                        setOpenFeedbackDialog(false);
                        setShowAlternatives(false);
                        setSelectedPlace(null);
                        
                        toast.dismiss();
                        toast.success('Place updated successfully!');
                      } catch (error) {
                        console.error('Error updating place:', error);
                        toast.dismiss();
                        toast.error('Failed to update place. Please try again.');
                      }
                    }
                  }}
                >
                  Confirm Selection
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PlaceCardItem;
