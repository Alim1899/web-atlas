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
        "ჰაერის ტემპერატურა": [
          {
            id: "airavg",
            label: "ჰაერის საშუალო მრავალწლიური ტემპერატურა, 1990-2022",
            type: "polygon",
          },
          {
            id: "airmax",
            label: "ჰაერის მაქსიმალური მრავალწლიური ტემპერატურა, 1990-2022",
            type: "polygon",
          },
          {
            id: "precipitation",
            label: "ატმოსფერული ნალექების მრავალწლიური ჯამი, 1990-2022",
            type: "polygon",
          },
        ],
      },
         
      {
        ტყეები: [
          {
            id: "forest",
            label: "ძირითადი მერქნიანი სახეობები",
            type: "polygon",
          },
           {
            id: "vegetation",
            label: "მცენარეული საფარი",
            type: "polygon",
          },
     
        ],
      },
      {
        "ღვარცოფი და ნაპირგარეცხვა": [
          {
            id: "erosion",
            label: "ნაპირგარეცხვა",
            type: "polygon",
          },
          {
            id: "madflow",
            label: "ღვარცოფი",
            type: "points",
          },
          {
            id: "madflowzoning",
            label: "ღვარცოფის საფრთხის კატეგორია",
            type: "polygon",
          },
        ],
      },
      {
        ნიადაგები: [
          {
            id: "soiltypes",
            label: "ნიადაგის ტიპები",
            type: "polygon",
          },
          {
            id: "soilproducer",
            label: "ნიადაგწარმომქმნელი ქანები",
            type: "polygon",
          },
          {
            id: "soilph",
            label: "ნიადაგის მჟავიანობა",
            type: "polygon",
          },
        ],
      },
      {
        მიწისძვრები: [
          {
            id: "earthquakenew",
            label: "ინსტრუმენტული პერიოდის",
            type: "points",
          },
          {
            id: "earthquakeold",
            label: "ისტორიული პერიოდის (1900 წლამდე)",
            type: "points",
          },
          {
            id: "seismostations",
            label: "სეისმო სადგურები",
            type: "points",
          },
        ],
      },
      {
        გეოლოგია: [
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
          //  ||||||||||||||||     TESTED     ||||||||||||||||||||\\\
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
        ლანდშაფტი: [
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
        გეომორფოლოგია: [
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
        აგროკლიმატი: [
          {
            id: "agroclimate",
            label: "აგროკლიმატური ზონები",
            type: "polygon",
          },
           {
            id: "activetemperature",
            label: "ჰაერის 10°C-ზე მეტი აქტიურ ტემპერატურათა ჯამი",
            type: "polygon",
          },
           {
            id: "humidity",
            label: "ჰაერის დატენიანების ინდექსი",
            type: "polygon",
          },
        ],
      },
       {
        "ცხელი დღეები": [
          {
            id: "hotdays",
            label: "ცხელი დღეების საშუალო რაოდენობა, 1990-2022",
            type: "polygon",
          },
          {
            id: "tropicalnights",
            label: "ტროპიკული ღამეების საშუალო რაოდენობა, 1990-2022",
            type: "polygon",
          },
          {
            id: "frozendays",
            label: "ყინვიანი დღეების საშუალო რაოდენობა, 1990-2022",
            type: "polygon",
          },
        ],
      },
       {
        "სითბური ტალღები": [
          {
            id: "hotwaves",
            label: "სითბური ტალღის ინდექსი",
            type: "polygon",
          },
          {
            id: "draught",
            label: "გვალვის ინდექსი, 1990-2022",
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
