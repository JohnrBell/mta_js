const token = document.getElementById('token').innerHTML
const trainInfo = {}

const mtaXML = 'https://collector-otp-prod.camsys-apps.com/realtime/serviceStatus?apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP'
$.ajax({
  url: mtaXML,
  success: data => {
    subway = []
    data.routeDetails.forEach(line => {
      if (line.mode == 'subway'){
        subway.push(line)
      }
    })
    cleanTrainObject(subway)
  }
})

compare = (a, b) => {
  let comparison = 0
  if (a.route > b.route) {
    comparison = 1
  } else if (a.route < b.route) {
    comparison = -1
  }
  return comparison
}

postToAPI = subway => {
  $.ajax({
    url: 'http://localhost:3000',
    type: 'POST',
    data: {token: token,
           data: subway},
    success: appendToDOM(subway)
  })
  console.log(subway)

}

removeTrains = subway => {
  subway.forEach((train,index) => {
    if (train.route == "6X" || train.route == "7X"|| train.route == "SIR" || train.route == "S"){
      subway.splice(index,1)
    }
    subway.sort(compare)
  })
  postToAPI(subway)
}

cleanTrainObject = subway => {
  subway.forEach((train,index) => {
    delete train.mode
    delete train.agency
    delete train.routeId
    delete train.routeSortOrder
    delete train.inService
    delete train.routeType
  })
  removeTrains(subway)
}

appendToDOM = subway => {
  container = document.getElementById('train_container')
  subway.forEach(train =>{
  // debugger
    element = `<div id='`+train.route+`' class='train'>`+train.route+`</div>`
    container.innerHTML += element
  })
}
//TODO: append to DOM