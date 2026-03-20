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
        არქოლოგია: [
          {
            id: "archeology",
            label: "არქეოლოგიური ძეგლები",
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
    key: "economy",
    icon: GiMoneyStack,
    name: "ეკონომიკა",
    layers: [
      {
        ბოტანიკა: [
          {
            id: "botanics",
            label: "ბოტანიკურ-აგრონომიული არეები",
            type: "polygon",
          },
        ],
      },
      {
        ელექტროენერგეტიკა: [
          {
            id: "energy",
            label: "ელექტროენერგეტიკა",
            type: "points",
          },
        ],
      },
      {
        "კულტურულ მცენარეთა ზონები": [
          {
            id: "cultivate",
            label: "კულტურულ მცენარეთა ზონები",
            type: "polygon",
          },
        ],
      },

      {
        "მეურნეობის სარგებლობაში არსებული მიწის ფართობი, 2021": [
          {
            id: "ownership",
            label:
              "სასოფლო-სამეურნეო მიწების განაწილება საკუთრების ფორმების მიხედვით (%).",
            type: "polygon",
          },
          {
            id: "status",
            label: "მეურნეობების რაოდენობა იურიდიული სტატუსის მიხედვით",
            type: "polygon",
          },
          {
            id: "agroforms",
            label:
              "მეურნეობის სარგებლობაში არსებული სასოფლო-სამეურნეო მიწის ფართობი მიწათსარგებლობის ფორმების მიხედვით (ჰა)",
            type: "polygon",
          },
          {
            id: "beneficiars",
            label: "სოფლის მეურნეობის პროექტების ბენეფიციარები 2019-2024",
            type: "polygon",
          },
        ],
      },
      {
        "სოფლის მეურნეობა": [
          {
            id: "production",
            label: "სოფლის მეურნეობის საწარმოო მიმართულება",
            type: "polygon",
          },
        ],
      },
      {
        "მზის ნათება": [
          {
            id: "sunshine",
            label: "მზის ნათების წლიური ხანგრძლივობა (საათი)",
            type: "polygon",
          },
          {
            id: "sunstations",
            label: "მზის ელექტროსადგურები",
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
    layers: [
        {
        "იძულებით გადაადგილებული პირები": [
          {
            id: "ecomigrants",
            label:
              "ბუნების სტიქიური მოვლენების შედეგად იძულებით გადაადგილებული ოჯახების რაოდენობა დასახლებების მიხედვით",
            type: "points",
          },
           {
            id: "warmigrants",
            label:
              "ბუნების სტიქიური მოვლენების შედეგად იძულებით გადაადგილებული ოჯახების რაოდენობა დასახლებების მიხედვით",
            type: "points",
          },
        ],
      },
        {
        "ეროვნული შემადგენლობა და აღმსარებლობა": [
          {
            id: "religy",
            label: "აღმსარებლობა",
            type: "polygon",
          },
          {
            id: "ethnicity",
            label: "ეროვნული შემადგენლობა (%).",
            type: "polygon",
          },
        ],
      },
      {
        "მაღალმთიანი დასახლებები": [
          {
            id: "mountsettlements",
            label: "მაღალმთიანი დასახლებები, 2023",
            type: "points",
          },
        ],
      },
      {
        "საქალაქო და სასოფლო დასახლებები": [
          {
            id: "density",
            label: "მოსახლეობის სიმჭიდროვე",
            type: "polygon",
          },
          {
            id: "pplcount",
            label: "საქალაქო დასახლებები 1989-2014",
            type: "polygon",
          },
          {
            id: "villages",
            label: "სასოფლო დასახლებები, 2014",
            type: "points",
          },
        ],
      },
      {
        "მოსახლეობის რაოდენობის ცვლილება": [
          {
            id: "pplchange",
            label: "მოსახლეობის რაოდენობის ცვლილება 2003-2023",
            type: "polygon",
          },
          {
            id: "birthrate",
            label:
              "შობადობის ზოგადი კოეფიციენტის ცვლილება ყოველ 1000 მცხოვრებზე, 2012-2022",
            type: "polygon",
          },
          {
            id: "deathrate",
            label:
              "მოკვდაობის ზოგადი კოეფიციენტის ცვლილება ყოველ 1000 მცხოვრებზე, 2012-2022",
            type: "polygon",
          },
        ],
      },
      {
        "15 წლის და უფროსი ასაკის მოსახლეობის განაწილება ქორწინებითი მდგომარეობის მიხედვით":
          [
            {
              id: "meritalmen",
              label: "მამაკაცები 2002-2014",
              type: "polygon",
            },
            {
              id: "meritalwomen",
              label: "ქალები 2002-2014",
              type: "polygon",
            },
          ],
      },
    ],
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
    layers: [
      {
        "ბუნების ძეგლები": [
          {
            id: "waterfall",
            label: "ბუნების ძეგლები",
            type: "points",
          },
        ],
      },
    ],
  },
];
