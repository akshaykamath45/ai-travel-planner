import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelersList,
  TravelTags
} from "@/constants/options";
import { Slider } from "@/components/ui/slider";
import { chatSession } from "@/service/AIModal";
import React, { useEffect } from "react";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/service/firbaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [perPersonBudget, setPerPersonBudget] = useState(100); // Initialize with default value
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {}, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      getUserProfile(codeResponse);
    },
    onError: (error) => console.log(error),
  });
  // const onGenerateTrip = async () => {
  //   const user = localStorage.getItem("user");
  //   if (!user) {
  //     setOpenDialog(true);
  //     return;
  //   }
  //   if (
  //     !formData?.budget ||
  //     !formData?.location ||
  //     !formData?.noOfDays ||
  //     !formData?.budget ||
  //     !formData?.travelers
  //   ) {
  //     toast("Please fill all the fields");
  //     return;
  //   }
  //   if (formData?.noOfDays > 15 || formData?.noOfDays <= 0) {
  //     toast("Please enter correct number of days between 1 to 15");
  //     return;
  //   }
  //   setIsLoading(true);
  //   const FINAL_PROMPT = AI_PROMPT.replace(
  //     "{location}",
  //     formData?.location?.label
  //   )
  //     .replace("{noOfDays}", formData?.noOfDays)
  //     .replace("{travelers}", formData?.travelers)
  //     .replace("{budget}", formData?.budget)
  //     .replace("{travelers}", formData?.travelers)
  //     .replace("{budget}", formData?.budget);
  //   // console.log(FINAL_PROMPT);
  //   const result = await chatSession.sendMessage(FINAL_PROMPT);
  //   // console.log(result?.response?.text());
  //   setIsLoading(false);
  //   saveAiTrip(result?.response?.text());
  // };
  const saveAiTrip = async (tripData) => {
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user?.email,
      id: docId,
    });
    setIsLoading(false);
    navigate("/view-trip/" + docId);
  };
  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log("Response:", res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        onGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  const handleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      toast("You can select up to 3 tags only");
    }
    handleInputChange("travelTags", selectedTags);
  };

  // Modify onGenerateTrip to include new parameters
  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
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
    if (selectedTags.length === 0) {
      toast("Please select at least one travel preference tag");
      return;
    }

    setIsLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location?.label)
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{travelers}", formData?.travelers)
      .replace("{budget}", formData?.budget)
      .replace("{perPersonBudget}", formData?.perPersonBudget)
      .replace("{travelTags}", selectedTags.join(", "))
      .replace("{travelTags}", selectedTags.join(", "))
      .replace("{budget}", formData?.budget)
      .replace("{travelers}", formData?.travelers)
      .replace("{budget}", formData?.budget)
      .replace("{perPersonBudget}", formData?.perPersonBudget)
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{noOfDays}", formData?.noOfDays);

    console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setIsLoading(false);
    saveAiTrip(result?.response?.text());
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
          <h2 className="text-xl my-3 font-medium">What is your Budget</h2>
          <div className="grid grid-cols-3 gap-5 mb-8">
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
          
          <div className="mt-5">
            <h2 className="text-lg mb-2">Budget per person (USD) for the entire trip</h2>
            <div className="flex items-center gap-4">
              <Slider
                value={[perPersonBudget]}
                onValueChange={(value) => {
                  setPerPersonBudget(value[0]);
                  handleInputChange("perPersonBudget", value[0]); // Add this line to update formData
                }}
                min={100}
                max={2000}
                step={50}
                className="w-full"
              />
              <span className="min-w-[60px] text-right">${perPersonBudget}</span>
            </div>
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
        <div>
          <h2 className="text-xl my-3 font-medium">
            Select your travel preferences (up to 3)
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {TravelTags.map((tag) => (
              <div
                key={tag.id}
                className={`p-3 border rounded-lg hover:shadow-lg cursor-pointer ${
                  selectedTags.includes(tag.title) ? "shadow-lg border-black" : ""
                }`}
                onClick={() => handleTagSelection(tag.title)}
              >
                <h2 className="text-2xl">{tag.icon}</h2>
                <h2 className="font-medium">{tag.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-14 justify-end flex">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to app with Google authentication security</p>
              <Button
                className="w-full mt-5 flex gap-4 items-center"
                onClick={login}
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
