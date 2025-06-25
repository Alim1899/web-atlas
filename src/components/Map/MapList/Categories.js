import {
  GiForest,
  GiMoneyStack,
  GiGreekTemple,
  GiSwordTie,
} from "react-icons/gi";
import { FaPeopleRoof } from "react-icons/fa6";
import { PiPersonSimpleHikeBold } from "react-icons/pi";
import { FaBookOpenReader } from "react-icons/fa6";
export const mapCategories = [
  {
    key: "nature",
    icon: GiForest,
    name: "ბუნება",
    layers: [
      {
        id: "agroclimate",
        label: "აგროკლიმატი",
        type: "polygon",
      },
      {
        id: "erosion",
        label: "ეროზია",
        type: "point",
      },
      {
        id: "foults",
        label: "ნაპრალები",
        type: "polyline",
      },
      {
        id: "geology",
        label: "გეოლოგია",
        type: "polygon",
      },
      {
        id: "hydrogeology",
        label: "ჰიდროგეოლოგია",
        type: "polygon",
      },
      {
        id: "landscape",
        label: "ლანდშაფტი",
        type: "polygon",
      },
      {
        id: "landslide",
        label: "მეწყრები",
        type: "point",
      },
      {
        id: "rockfall",
        label: "ქვათაცვენები",
        type: "point",
      },

      {
        id: "vegetation",
        label: "ვეგეტაცია",
        type: "polygon",
      },
    ],
  },
  {
    key: "population",
    icon: FaPeopleRoof,
    name: "მოსახლეობა",
    layers: [],
  },
  {
    key: "economy",
    icon: GiMoneyStack,
    name: "ეკონომიკა",
    layers: [],
  },
  {
    key: "education",
    icon: FaBookOpenReader,
    name: "განათლება",
    layers: [],
  },
  {
    key: "culture",
    icon: GiGreekTemple,
    name: "კულტურა",
    layers: [],
  },
  {
    key: "tourism",
    icon: PiPersonSimpleHikeBold,
    name: "ტურიზმი",
    layers: [],
  },
  {
    key: "history",
    icon: GiSwordTie,
    name: "ისტორია",
    layers: [],
  },
];
