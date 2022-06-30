import React from "react";
import ColorPicker from "./ColorPicker";

export default function TitleBar() {
  // Hide title bar on scroll
  let prevScrollPos = window.scrollY;
  window.onscroll = function () {
    let currentScrollPos = window.scrollY;

    // If you're scrolling up, show the title bar
    if (prevScrollPos > currentScrollPos) {
      document.getElementsByClassName("title-bar")[0].style.marginTop =
        "-21.5rem";

      // if (window.innerWidth > "60rem")
      //   document.getElementsByClassName("title-bar")[0].style.marginTop =
      //     "-20rem";
      // else if (window.innerWidth > "50rem")
      //   document.getElementsByClassName("title-bar")[0].style.marginTop =
      //     "18.5rem";
      // else if (window.innerWidth > "40rem")
      //   document.getElementsByClassName("title-bar")[0].style.marginTop =
      //     "16rem";
      // else
      //   document.getElementsByClassName("title-bar")[0].style.marginTop =
      //     "14.25rem";
    }

    // If you're scrolling down, hide the title bar
    else {
      document.getElementsByClassName("title-bar")[0].style.marginTop =
        "-50rem";
    }
    prevScrollPos = currentScrollPos;
  };

  return (
    <div className="title-bar">
      <ColorPicker />
      <h1>art by color</h1>
    </div>
  );
}
