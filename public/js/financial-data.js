
let start = "2020-01-01"
let end = "2022-12-31"
let currency = "USD"
let apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`

axios
  .get(apiUrl)
  .then(responseFromAPI => {
    printChart(responseFromAPI.data); // <== call the function here where you used to console.log() the response
  })
  .catch(err => console.log('Error while getting the data: ', err));

function printChart(bpiData){
  const dailyData = bpiData["bpi"] // Gets the bpi data from the filtered api response data
  const bpiDates = Object.keys(dailyData) // Gets the dates from keys, returns an array of dates
  const bpiPrices = bpiDates.map((date) => dailyData[date]) // Gets the prices from the dailyData and returns an array of prices

  const ctx = document.getElementById('my-chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: bpiDates,
      datasets: [
        {
          label: 'Stock Chart',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: bpiPrices
        }
      ]
    }
  });
}

function printData(url){
  axios
    .get(url)
    .then((bpiData) => {
      printChart(bpiData)
    })
    .catch((error) => console.log('Error while fetching data'))
}

document
  .querySelector("#get-date-to-date")
  .addEventListener("click", (event) => {
    event.preventDefault()
    start = document.getElementById('start-date').value
    end = document.getElementById('end-date').value
    const startDate = new Date(start)
    const endDate = new Date(end)

    if ((start !== '' || end !== '') && (startDate < endDate)) {
      apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`
      printData(apiURL)
    }
  })

document.querySelector('#currency').addEventListener('change', (event) => {
  const curren = document.getElementById("currency").value
  start = document.getElementById("start-date").value
  end = document.getElementById("end-date").value
  const startDate = new Date(start)
  const endDate = new Date(end)

  if ((start !== "" || end !== "") && startDate < endDate) {
    apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`
    printData(apiURL)
  } else {
    start = "2013-09-01"
    end = "2013-09-30"
    console.log(start, end, currency)
    apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`
    console.log(apiURL)

    printData(apiURL)
  }
})

printData(apiUrl);
