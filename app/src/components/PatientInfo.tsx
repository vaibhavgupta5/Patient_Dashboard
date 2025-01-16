import {
  User,
  Stethoscope,
  ArrowUp,
  DoorClosed,
  VenetianMask,
} from "lucide-react";

interface PatientInfoProps {
  name: string;
  gender: string;
  age: number;
  RoomNumber: string;
  doctor: string;
  imageUrl: string;
}

const PatientInfo: React.FC<PatientInfoProps> = ({
  name,
  gender,
  age,
  RoomNumber,
  doctor,
  imageUrl,
}) => {
  return (
    <div className="flex justify-evenly w-[90%] h-[23vh] items-center space-x-8 bg-white p-6 rounded-lg ">
      <div className="flex space-x-3 flex-row items-center">
        <User className="w-[6rem] h-[6rem] rounded-full bg-blue-500 text-white p-6" />

        <div className="flex text-black flex-col">
          <p className="text-[22px] font-semibold">{name}</p>
          <span className="text-xs text-gray-500">Patient Name</span>
        </div>
      </div>

      <div className="flex space-x-3 flex-row items-center">
        <Stethoscope className="w-[6rem] h-[6rem] rounded-full bg-blue-500 text-white p-6 " />
        <div className="flex text-black flex-col">
          <p className="text-[22px] font-semibold">{doctor}</p>
          <span className="text-xs text-gray-500">Doctor Name</span>
        </div>
      </div>

      <div className="flex space-x-3 flex-row items-center">
        <VenetianMask className="w-[6rem] h-[6rem] rounded-full bg-blue-500 text-white p-6 " />
        <div className="flex text-black flex-col">
          <p className="text-[22px] font-semibold">{gender}</p>
          <span className="text-xs text-gray-500">Gender</span>
        </div>
      </div>

      <div className="flex space-x-3 flex-row items-center">
        <ArrowUp className="w-[6rem] h-[6rem] rounded-full bg-blue-500 text-white p-6 " />
        <div className="flex text-black flex-col">
          <p className="text-[22px] font-semibold">{age}</p>
          <span className="text-xs text-gray-500">Age</span>
        </div>
      </div>

      <div className="flex space-x-3 flex-row items-center">
        <DoorClosed className="w-[6rem] h-[6rem] rounded-full bg-blue-500 text-white p-6" />
        <div className="flex text-black flex-col">
          <p className="text-[22px] font-semibold">{RoomNumber}</p>
          <span className="text-xs text-gray-500">Room Number</span>
        </div>
      </div>

      <div className="rounded-full overflow-hidden border border-gray-200 w-32 h-32">
        <img
          src={imageUrl}
          alt={`${name}'s photo`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default PatientInfo;
