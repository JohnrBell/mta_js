const token = document.getElementById('token').innerHTML
const trainInfo = {}

const mtaXML = 'https://collector-otp-prod.camsys-apps.com/realtime/serviceStatus?apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP'
$.ajax({
  url: mtaXML,
  success: data => {
    subway = []
    data.routeDetails.forEach(line => {
      if (line.mode == "subway"){
        subway.push(line)
      }
    })
    // console.log(subway)
    cleanTrainObject(subway)
  }
})

cleanTrainObject = subway => {
  subway.forEach(train => {
    delete train.mode
    delete train.agency
    delete train.routeId
    delete train.routeSortOrder
    delete train.inService
    delete train.routeType
  })
  console.log(subway)
  postToAPI(subway)
}

postToAPI = subway => {
  $.ajax({
    url: "http://localhost:3000",
    type: "POST",
    data: {token: token,
           data: subway}
  })

}