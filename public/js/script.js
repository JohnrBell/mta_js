const mtaURL = 'https://collector-otp-prod.camsys-apps.com/realtime/serviceStatus?apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP'
const token = document.getElementById('token').innerHTML

appendToDOM = trains => {
  container = document.getElementById('train_container')
  trains.forEach(train =>{
    element = `<div id='`+train.route+`' class='train'>`+train.route+`</div>`
    container.innerHTML += element
  })
}

//post data to back end to format it.
postToAPI = trains => {
  $.ajax({
    url: 'http://localhost:3000',
    type: 'POST',
    data: {token: token,
          data: trains},
    success: function(res){
      appendToDOM(res.trains)
    }
  })
}

//get data from MTA
$.ajax({
  url: mtaURL,
  success: data => {
    trains = []
    data.routeDetails.forEach(line => {
      if (line.mode == 'subway'){
        trains.push(line)
      }
    })
  postToAPI(trains)
  }
})

