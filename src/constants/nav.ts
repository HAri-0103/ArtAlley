import { GrHomeRounded } from "react-icons/gr";
import { FaEarthAsia } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";



export const sidebarLinks = [
    {
      icon: GrHomeRounded,
      route: "/",
      label: "Home",
    },
    {
      icon : FaEarthAsia,
      route: "/Explore",
      label: "Explore",
    },
    {
      icon :GoPeople,
      route: "/People",
      label: "People",
    },
    {
      icon: CiBookmark,
      route: "/Saved",
      label: "Saved",
    },
    {
      icon : MdOutlineAddPhotoAlternate,
      route: "/Create-Post",
      label: "Create Post",
    },
  ];
  
  export const bottombarLinks = [
    {
      icon: GrHomeRounded,
      route: "/",
      label: "Home",
    },
    {
      icon : FaEarthAsia,
      route: "/Explore",
      label: "Explore",
    },
    {
      icon: CiBookmark,
      route: "/Saved",
      label: "Saved",
    },
    {
      icon : MdOutlineAddPhotoAlternate,
      route: "/Create-Post",
      label: "Create",
    },
  ];