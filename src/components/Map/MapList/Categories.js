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
        "გეოლოგია": [
          {
            id: "parentrocks",
            label: "ამგები ქანები",
            type: "polygon",
          },
          {
            id: "metalore",
            label: "მეტალები",
            type: "points",
          },
            {
            id: "nonmetalore",
            label: "არამეტალები",
            type: "points",
          },
          {
            id: "faults",
            label: "რღვევები",
            type: "line",
          },
        ],
      },
       {
        "გეომორფოლოგია": [
          {
            id: "morphology",
            label: "მორფოლოგია",
            type: "polygon",
          },
          {
            id: "dynamiclandforms",
            label: "დინამიკური ფორმები",
            type: "points",
          },
          {
            id: "linearlandforms",
            label: "ხაზობრივი რელიეფი",
            type: "line",
          },
        ],
      },
      {
        "მიწისქვეშა მტკნარი წყლები": [
          {
            id: "hydrogeology",
            label: "ჰიდროგეოლოგია",
            type: "polygon",
          },
          {
            id: "groundwater",
            label: "მტკნარი წყლები",
            type: "points",
          },
        ],
      },
       {
        "მეწყერი და ქვათაცვენა": [
          {
            id: "landslide",
            label: "მეწყერი",
            type: "points",
          },
          {
            id: "rockfall",
            label: "ქვათაცვენა",
            type: "points",
          },
            {
            id: "landslidezones",
            label: "მეწყრული ზონები",
            type: "polygon",
          },
        ],
      },
    
      {
        "ლანდშაფტი": [
          {
            id: "antrolandscape",
            label: "ანთროპოგენური ლანდშაფტი",
            type: "polygon",
          },
          {
            id: "landscape",
            label: "ლანდშაფტის ტიპები",
            type: "polygon",
          },
        ],
      },


      {
        "აგროკლიმატი": [
          {
            id: "agroclimate",
            label: "აგროკლიმატური ზონები",
            type: "polygon",
          },
        ],
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
