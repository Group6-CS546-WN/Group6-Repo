function calculateCarbonFootprint(data) {
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

    // if (typeof electricBill !== 'number' || typeof gasBill !== 'number' || typeof oilBill !== 'number' || typeof carMileage !== 'number' || typeof shortFlights !== 'number' || typeof longFlights !== 'number' || typeof recycleNewspaper !== 'boolean' || typeof recycleMetal !== 'boolean') {
    // throw new Error('Please check input values');


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
}

const carbonForm = document.getElementById('carbonForm');

if (carbonForm) {
    const electricBillElement = document.getElementById('electricBill');
    const gasBillElement = document.getElementById('gasBill');
    const oilBillElement = document.getElementById('oilBill');
    const carMileageElement = document.getElementById('carMileage');
    const shortFlightsElement = document.getElementById('shortFlights');
    const longFlightsElement = document.getElementById('longFlights');
    const recycleNewspaperElement = document.getElementById('recycleNewspaper');
    const recycleMetalElement = document.getElementById('recycleMetal');

    const errorContainer = document.getElementById('error-container');
    const errorTextElement =
      errorContainer.getElementsByClassName('text-goes-here')[0];

    const resultContainer = document.getElementById('result-container');
    const resultTextElement =
      resultContainer.getElementsByClassName('text-goes-here')[0];

      carbonForm.addEventListener('submit', (event) => {
        event.preventDefault();

        try {
            // hide containers by default
        errorContainer.classList.add('hidden');
        resultContainer.classList.add('hidden');

        const electricBillValue = electricBillElement.value;
        const gasBillValue = gasBillElement.value;
        const oilBillValue = oilBillElement.value;
        const carMileageValue = carMileageElement.value;
        const shortFlightsValue = shortFlightsElement.value;
        const longFlightsValue = longFlightsElement.value;
        const recycleNewspaperValue = recycleNewspaperElement.value;
        const recycleMetalValue = recycleMetalElement.value;

        const parsedElectricBillValue = parseInt(electricBillValue);
        const parsedGasBillValue = parseInt(gasBillValue);
        const parsedOilBillValue = parseInt(oilBillValue);
        const parsedCarMileageValue = parseInt(carMileageValue);
        const parsedShortFlightsValue = parseInt(shortFlightsValue);
        const parsedLongFlightsValue = parseInt(longFlightsValue);

        const result = carbonFootprint(
            parsedElectricBillValue,
            parsedGasBillValue,
            parsedOilBillValue,
            parsedCarMileageValue,
            parsedShortFlightsValue,
            parsedLongFlightsValue,
            recycleNewspaperValue,
            recycleMetalValue
        );

        resultTextElement.textContent = 'Your carbon footprint is ' + result;
        console.log(`${result}`);
        resultContainer.classList.remove('hidden');
      } catch (e) {
        const message = typeof e === 'string' ? e : e.message;
        errorTextElement.textContent = e;
        errorContainer.classList.remove('hidden');
      }
    });
  };

