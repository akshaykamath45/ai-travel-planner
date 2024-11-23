import React, { useEffect } from "react";
import { useNavigation } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/service/firbaseConfig";
import { useState } from "react";
import UserTripCard from "./components/UserTripCard";

function MyTrips() {
  useEffect(() => {
    getUserTrips();
  }, []);
  const navigate = useNavigation();
  const [userTrips, setUserTrips] = useState([]);

  // retrieving user trips from firestore
  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      setUserTrips((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {userTrips.length > 0
          ? userTrips.map((trip, index) => (
              <div>
                <UserTripCard trip={trip} />
              </div>
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default MyTrips;
