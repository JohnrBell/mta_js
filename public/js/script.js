const token = document.getElementById('token').innerHTML
const mtaXML = 'https://collector-otp-prod.camsys-apps.com/realtime/serviceStatus?apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP'

appendToDOM = trains => {
  container = document.getElementById('train_container')
  trains.forEach(train =>{
  // debugger
    element = `<div id='`+train.route+`' class='train'>`+train.route+`</div>`
    container.innerHTML += element
  })
  // debugger
}

postToAPI = trains => {
  $.ajax({
    url: 'http://localhost:3000',
    type: 'POST',
    data: {token: token,
          data: trains},
          // success: appendToDOM(trains)
  })
}

$.ajax({
  url: mtaXML,
  success: data => {
    trains = []
    data.routeDetails.forEach(line => {
      if (line.mode == 'subway'){
        trains.push(line)
      }
    })
  // removeTrains(trains)
  postToAPI(trains)
  }
})

