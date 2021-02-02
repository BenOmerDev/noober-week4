async function pageLoaded() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let json = await response.json()

  // writes the returned JSON to the console
  console.dir(json)
  
  // 🔥 start here: write code to loop through the rides

  let rides = json
  console.log(rides)

  let ridesDiv = document.querySelector('.rides')
  let levelInsert = function(level) {
    ridesDiv.insertAdjacentHTML('beforeend',
    `<h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
    <i class="fas fa-car-side"></i>
    <span>${level}</span>`)
  }
  
  // loop to pull data for each ride
  for(let i=0; i < rides.length; i++) {
    let ride = rides[i]
    
    // determines level of service
    if (ride.length > 1) {levelOfService = 'Noober Pool'}
    else if (ride[0].purpleRequested == true) {levelOfService = "Noober Purple"}
    else if (ride[0].numberOfPassengers > 3) {levelOfService = "Noober XL"}
    else {levelOfService = "Noober X"}

    // references "levelInsert" function above to insert level with proper formatting
    levelInsert(levelOfService)

    //loop to pull data for each individual passenger
    for(let j=0; j < ride.length; j++) {
      let passenger = ride[j]
    
      //declaring variables for each passenger
      let first = passenger.passengerDetails.first
      let last = passenger.passengerDetails.last 
      let name = `${first} ${last}`
      let phoneNumber = passenger.passengerDetails.phoneNumber
      let numberOfPassengers = passenger.numberOfPassengers
      let pickupAddressLine1 = passenger.pickupLocation.address
      let pickupCity = passenger.pickupLocation.city
      let pickupState = passenger.pickupLocation.state
      let pickupZip = passenger.pickupLocation.zip
      let pickupAddressLine2 = `${pickupCity}, ${pickupState} ${pickupZip}`
      let dropoffAddressLine1 = passenger.dropoffLocation.address
      let dropoffCity = passenger.dropoffLocation.city
      let dropoffState = passenger.dropoffLocation.state
      let dropoffZip = passenger.dropoffLocation.zip
      let dropoffAddressLine2 = `${dropoffCity}, ${dropoffState} ${dropoffZip}`

      // defines border color and the fill for passenger number based on whether ride is "Noober Purple"
      let borderColor
        if (levelOfService == 'Noober Purple') {borderColor = 'border-purple-500'}
        else {borderColor = 'border-gray-900'}
      let passengersFill
        if (levelOfService == 'Noober Purple') {passengersFill = 'bg-purple-600'}
        else {passengersFill = 'bg-gray-600'}
      
      // inserts passenger details with proper formatting depending on ride type
      ridesDiv.insertAdjacentHTML('beforeend',`
          <div class="border-4 ${borderColor} p-4 my-4 text-left">
            <div class="flex">
              <div class="w-1/2">
                <h2 class="text-2xl py-1">${name}</h2>
                <p class="font-bold text-gray-600">${phoneNumber}</p>
              </div>
              <div class="w-1/2 text-right">
                <span class="rounded-xl ${passengersFill} text-white p-2">
                  ${numberOfPassengers} passengers
                </span>
              </div>
            </div>
            <div class="mt-4 flex">
              <div class="w-1/2">
                <div class="text-sm font-bold text-gray-600">PICKUP</div>
                <p>${pickupAddressLine1}</p>
                <p>${pickupAddressLine2}</p>
              </div>
              <div class="w-1/2">
                <div class="text-sm font-bold text-gray-600">DROPOFF</div>
                <p>${dropoffAddressLine1}</p>
                <p>${dropoffAddressLine2}</p>
              </div>
            </div>
          </div>`)
    }
  }

}

window.addEventListener('DOMContentLoaded', pageLoaded)

