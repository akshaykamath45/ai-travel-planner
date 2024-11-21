import React from "react";
import { Button } from "../ui/button";

function Header() {
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5 ">
      <div className="flex gap-2 items-center">
        <img src="/logo.svg" />
        <p>
          <b>Roam.AI</b>
        </p>
      </div>

      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  );
}

export default Header;
