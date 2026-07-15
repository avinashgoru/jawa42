export const competitors = [
  {
    id: "hunter-350",
    name: "Hunter 350",
    brand: "Royal Enfield",
    image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/124013/hunter-350-right-front-three-quarter-3.jpeg?isig=0&q=80",
    specs: {
      displacement: { value: 349.34, display: "349.34 cc" },
      power: { value: 20.2, display: "20.2 bhp" },
      torque: { value: 27, display: "27.0 Nm" },
      gears: { value: 5, display: "5 Speed" },
      cooling: { value: 1, display: "Air-Oil Cooled" } // 1 for Air, 2 for Liquid
    }
  },
  {
    id: "cb350",
    name: "H'ness CB350",
    brand: "Honda",
    image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/162817/cb350-right-side-view.jpeg?isig=0&q=80",
    specs: {
      displacement: { value: 348.36, display: "348.36 cc" },
      power: { value: 20.8, display: "20.8 bhp" },
      torque: { value: 30, display: "30.0 Nm" },
      gears: { value: 5, display: "5 Speed" },
      cooling: { value: 0, display: "Air Cooled" }
    }
  },
  {
    id: "classic-350",
    name: "Classic 350",
    brand: "Royal Enfield",
    image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/101487/classic-350-right-front-three-quarter-4.jpeg?isig=0&q=80",
    specs: {
      displacement: { value: 349.34, display: "349.34 cc" },
      power: { value: 20.2, display: "20.2 bhp" },
      torque: { value: 27, display: "27.0 Nm" },
      gears: { value: 5, display: "5 Speed" },
      cooling: { value: 1, display: "Air-Oil Cooled" }
    }
  },
  {
    id: "meteor-350",
    name: "Meteor 350",
    brand: "Royal Enfield",
    image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/51443/meteor-350-right-front-three-quarter-3.jpeg?isig=0&q=80",
    specs: {
      displacement: { value: 349.34, display: "349.34 cc" },
      power: { value: 20.2, display: "20.2 bhp" },
      torque: { value: 27, display: "27.0 Nm" },
      gears: { value: 5, display: "5 Speed" },
      cooling: { value: 1, display: "Air-Oil Cooled" }
    }
  }
];

export const formatCompetitorData = (modelId) => {
  return competitors.find(c => c.id === modelId) || competitors[0];
};
