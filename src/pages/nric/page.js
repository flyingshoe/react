import { Card } from "@mui/material";
import Generator from "pages/nric/generator";
import Validator from "pages/nric/validator";
import CheckSum from "pages/nric/checksum";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';

export default function Nric({ setShowNav }) {
  const location = useLocation();
  useEffect(() => {
    // Check if the user entered directly through the URL
    if (location.state === undefined) {
      // Hide navbar
      setShowNav(false)
      // console.log('User entered directly through the URL');
    }

    // Check if the user entered through a push (e.g., clicking a link)
    // if (location.state === null) {
    //   console.log('User entered through push (e.g., clicking a link)');
    // }
  }, [location]);
  return (
    <div className="tw-flex tw-justify-center tw-items-center tw-h-full tw-bg-gray-700" >
      <Card title="NRIC" className="tw-p-8 tw-max-w-[375px]" >
        <div className="tw-flex tw-flex-col tw-gap-8" >
          <Generator />
          <Validator />
          <CheckSum />
        </div>
      </Card>
    </div>
  );
}
