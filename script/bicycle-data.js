const bicycles = {
  highway: {
    name: "Шоссе",
    alts: ["Велосипед кервело", "Велосипед канондейл", "Велосипед Трэк Домейн"],
    hrefs: [
      "https://www.sigmasports.com/item/Cervelo/Caledonia-5-Ultegra-Disc-Road-Bike-2021/RDEN ",
      "https://www.sigmasports.com/item/Cannondale/SystemSix-HiMOD-Ultegra-Di2-Disc-Road-Bike-2021/R82J",
      "https://www.sigmasports.com/item/Trek/Domane-SL-7-Force-eTap-AXS-Disc-Road-Bike-2021/RULF",
    ],
    bike: {
      "Cervelo Caledonia-5": "./images/Cervelo.png",
      "Cannondale Systemsix Himod": "./images/Cannondale.png",
      "Trek Domane SL-7": "./images/TrekDomane.png",
    },
  },
  gravel: {
    name: "Грэвел",
    alts: [
      "Велосипед Кервело 810",
      "Велосипед специалайзед с-ворк дайвердж",
      "Велосипед канондейл топстон",
    ],
    hrefs: [
      "https://www.sigmasports.com/item/Cervelo/Aspero-GRX-810-1x-Disc-Gravel-Bike-2021/RJDE",
      "https://www.sigmasports.com/item/Specialized/S-Works-Diverge-Gravel-Bike-2020/NVJ9",
      "https://www.sigmasports.com/item/Cannondale/Topstone-Carbon-Lefty-3-Disc-Gravel-Road-Bike-2021/PUC8",
    ],
    bike: {
      "Cervelo Aspero GRX 810": "./images/CerveloGRX.png",
      "Specialized S-Works Diverge": "./images/Specialized.png",
      "Cannondale Topstone Lefty 3": "./images/Cannondale2.png",
    },
  },
  tt: {
    name: "ТТ",
    alts: [
      "Велосипед специалайзед с-ворк шив",
      "Велосипед БМЦ",
      "Велосипед Кервело п-серия",
    ],
    hrefs: [
      "https://www.sigmasports.com/item/Specialized/S-Works-Shiv-Disc-Limited-Edition-Triathlon-Bike-2019/K8P9",
      "https://www.sigmasports.com/item/BMC/Timemachine-01-One-Force-Disc-TT-Triathlon-Bike-2021/S835",
      "https://www.sigmasports.com/item/Cervelo/P-Series-Ultegra-Di2-TT-Triathlon-Bike-2021/RM6Q",
    ],
    bike: {
      "Specialized S-Works Shiv": "./images/SpecializedS.png",
      "BMC Timemachine 01 ONE": "./images/BMC.png",
      "Cervelo P-Series": "./images/CerveloP.png",
    },
  },
};

export default { bicycles };
