// მნიშვნელობების რიგი = ფერების რიგი = ლეგენდის რიგი (PolygonLegend)
export const farmingConfig = {
  status: {
    getValues: (e) => [e.household_farm, e.legal_farm],
    getColors: (e) => [e.color_one, e.color_two],
  },
  ownership: {
    getValues: (e) => [e.private_owner, e.state_owner],
    getColors: (e) => [e.color_one, e.color_two],
  },
  agroforms: {
    getValues: (e) => [e.natural, e.arable, e.parennial, e.greenhouse],
    getColors: (e) => [e.color_one, e.color_two, e.color_three, e.color_four],
  },
  beneficiars: {
    getValues: (e) => [e.plant_future, e.agro_insurance, e.agro_credit],
    getColors: (e) => [e.color_one, e.color_two, e.color_three],
  },
  ethnicity: {
    getValues: (e) => [e.georgian, e.azerbaijan, e.armenian, e.others],
    getColors: (e) => [e.color_one, e.color_two, e.color_three, e.color_four],
  },
  religy: {
    getValues: (e) => [e.Orthodox, e.Muslim, e.armenian, e.other],
    getColors: (e) => [e.color_one, e.color_two, e.color_three, e.color_four],
  },
};