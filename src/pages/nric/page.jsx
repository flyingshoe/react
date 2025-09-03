import { Card } from "@mui/material";
import Generator from "src/pages/nric/generator";
import Validator from "src/pages/nric/validator";
import CheckSum from "src/pages/nric/checksum";

export default function Nric() {
  return (
    <div className="flex justify-center items-center h-full bg-gray-700">
      <Card title="NRIC" className="p-8 max-w-[400px]">
        <div className="flex flex-col gap-8">
          <Generator />
          <Validator />
          <CheckSum />
        </div>
      </Card>
    </div>
  );
}
