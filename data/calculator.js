
export function calculateCarbonFootprint(data) {
    const {
        electricBill,
        gasBill,
        oilBill,
        carMileage,
        shortFlights,
        longFlights,
        recycleNewspaper,
        recycleMetal
    } = data;

    const carbonFootprint =
        electricBill * 105 +
        gasBill * 105 +
        oilBill * 113 +
        carMileage * 0.79 +
        shortFlights * 1100 +
        longFlights * 4400 +
        (recycleNewspaper ? 0 : 184) +
        (recycleMetal ? 0 : 166);

    return carbonFootprint;
};


