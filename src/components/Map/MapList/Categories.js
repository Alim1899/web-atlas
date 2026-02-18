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
        "გარემოს მონიტორინგი": [
          {
            id: "meteo",
            label: "მეტეოროლოგიური საგუშაგო",
            type: "points",
          },
          {
            id: "hydro",
            label: "ჰიდროლოგიური საგუშაგო",
            type: "points",
          },
        ],
      },
      {
        სეტყვა: [
          {
            id: "hail100",
            label: "საერთო დაზიანებული ფართობი ერთი სეტყვიანობის შემთხვევაზე",
            type: "points",
          },
          {
            id: "hailtotal",
            label: "100%-ით დაზიანებული ფართობი ერთი სეტყვიანობის შემთხვევაზე",
            type: "points",
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
      {
        "ღვარცოფი და ნაპირგარეცხვა": [
          {
            id: "erosion",
            label: "ნაპირგარეცხვა",
            type: "points",
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
    ],
  },
  {
    key: "history",
    icon: GiSwordTie,
    name: "ისტორია",
    layers: [
      {
        ბრძოლები: [
          {
            id: "battles",
            label: "ბრძოლები ქვემო ქართლის ტერიტორიაზე, XI-XVIIსს.",
            type: "points",
          },
        ],
      },
          {
         ნაგებობები: [
          {
            id: "castles",
            label: "თავდაცვითი ნაგებობები",
            type: "points",
          },
        ],
      },
        {
         "მართლმადიდებელი ეკლესიის ეპარქიები": [
          {
            id: "eparchy",
            label: "ეპარქიების საზღვრები",
            type: "polygon",
          },
            {
            id: "churches",
            label: "აქტიური მონასტრები",
            type: "points",
          },
        ],
      },
       {
         "გერმანული დასახლებები ქვემო ქართლში": [
          {
            id: "germans",
            label: "გერმანული დასახლებები",
            type: "points",
          },
            {
            id: "germanspoly",
            label: "1941 წ. გადასახლებული გერმანული ოჯახების რაოდენობა",
            type: "polygon",
          },
        ],
      },
        {
         მეგალითები: [
          {
            id: "megaliths",
            label: "მეგალითები",
            type: "points",
          },
          ],
      },
       {
         პეტროგლიფები: [
          {
            id: "petroglyphs",
            label: "პეტროგლიფები",
            type: "points",
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
];
