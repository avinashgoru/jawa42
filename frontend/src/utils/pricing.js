export const calculateOnRoadPrice = (exShowroomPrice, city) => {
  // Base approximations
  let rtoPercentage = 0.10; // 10% average RTO
  let insurancePercentage = 0.06; // 6% average insurance
  let otherCharges = 2500; // Flat handling/other charges

  // Adjust percentages slightly based on some major cities for realism
  if (city) {
    const lowerCity = city.toLowerCase();
    if (['bangalore', 'mysore', 'hubli', 'mangalore'].includes(lowerCity)) {
      rtoPercentage = 0.12; // Karnataka has slightly higher road tax
    } else if (['chennai', 'coimbatore', 'madurai'].includes(lowerCity)) {
      rtoPercentage = 0.08; // Tamil Nadu slightly lower
    } else if (['mumbai', 'pune', 'nagpur'].includes(lowerCity)) {
      rtoPercentage = 0.11; // Maharashtra
    } else if (['delhi', 'new delhi'].includes(lowerCity)) {
      rtoPercentage = 0.09; // Delhi
    }
  }

  const rtoTax = Math.round(exShowroomPrice * rtoPercentage);
  const insurance = Math.round(exShowroomPrice * insurancePercentage);
  const totalOnRoad = exShowroomPrice + rtoTax + insurance + otherCharges;

  return {
    exShowroom: exShowroomPrice,
    rto: rtoTax,
    insurance: insurance,
    other: otherCharges,
    total: totalOnRoad
  };
};
