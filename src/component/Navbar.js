import React from "react";
import { MdNetworkCell } from "react-icons/md";
import { BiWifi2 } from "react-icons/bi";
import { FaBatteryFull } from "react-icons/fa6";
import moment from "moment";

const Navbar = ({ currentTimeAndDate }) => {
  return (
    <div className="w-full flex justify-between items-center p-3 px-4">
      <div className="text-base font-semibold">
        {moment(currentTimeAndDate).format("HH:mm")}
      </div>
      <div className="flex gap-1 text-base">
        <MdNetworkCell />
        <BiWifi2 />
        <FaBatteryFull />
      </div>
    </div>
  );
};

export default Navbar;
