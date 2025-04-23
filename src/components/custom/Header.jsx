import React, { useEffect } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [openDialog, setOpenDialog] = useState(false);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      getUserProfile(codeResponse);
    },
    onError: (error) => console.log(error),
  });

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
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5 ">
      <a href="/">
        <div className="flex gap-2 items-center">
          <img src="/logo.svg" />
          <p>
            <b>Roam.AI</b>
          </p>
        </div>
      </a>

      <div>
        {user ? (
          <div className="flex items-center gap-3">
             <a href="/create-trip">
              <Button variant="outline" className="rounded-full">
                + Create Trip
              </Button>
            </a> 
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">
                My trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                {" "}
                <img
                  src={user?.picture}
                  alt="profile_picture"
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  onClick={() => {
                    googleLogout();
                    localStorage.removeItem("user");
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="cursor-pointer"
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
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

export default Header;
