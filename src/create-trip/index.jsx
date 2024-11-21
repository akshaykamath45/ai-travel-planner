import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelersList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import React, { useEffect } from "react";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onGenerateTrip = async () => {
    if (
      !formData?.budget ||
      !formData?.location ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.travelers
    ) {
      toast("Please fill all the fields");
      return;
    }
    if (formData?.noOfDays > 15 || formData?.noOfDays <= 0) {
      toast("Please enter correct number of days between 1 to 15");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{travelers}", formData?.travelers)
      .replace("{budget}", formData?.budget)
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{travelers}", formData?.travelers)
      .replace("{budget}", formData?.budget);
    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🛫</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itenary based on your preferences
      </p>
      <div className="mt-10 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip
          </h2>
          <Input
            placeholder={"Ex.5"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget </h2>
          <div className="grid grid-cols-3 gap-5 mt`">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.budget === item.title && "shadow-lg border-black"
                }`}
                onClick={() => handleInputChange("budget", item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan to travel with in your next adventure{" "}
          </h2>
          <div className="grid grid-cols-3 gap-5 mt`">
            {SelectTravelersList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.travelers === item.people &&
                  "shadow-lg border-black"
                }`}
                onClick={() => handleInputChange("travelers", item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button onClick={onGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  );
}

export default CreateTrip;