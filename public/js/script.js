const token = document.getElementById('token').innerHTML
const mtaXML = 'https://collector-otp-prod.camsys-apps.com/realtime/serviceStatus?apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP'

appendToDOM = trains => {
  container = document.getElementById('train_container')
  trains.forEach(train =>{
  // debugger
    element = `<div id='`+train.route+`' class='train'>`+train.route+`</div>`
    container.innerHTML += element
  })
  debugger
}

postToAPI = trains => {
  $.ajax({
    url: 'http://localhost:3000',
    type: 'POST',
    data: {token: token,
          data: trains},
          success: appendToDOM(trains)
  })
}

sortTrains = trains => {
  sortOrder = {'1':0,'2':1,'3':2,'4':3,'5':4,'6':5,'7':6,'A':7,'C':8,'E':9,'B':10,'D':11,
              'F':12,'M':13,'G':14,'J':15,'Z':16,'L':17,'N':18,'Q':19,'R':20,'W':21,'S':22}
  sortedTrains = []
  trains.forEach(train => {
    trainIndex = sortOrder[train.route]
    if (trainIndex != null){
      sortedTrains[trainIndex] = train
    }
  })
  postToAPI(sortedTrains)
}

formatTrainData = trains => {
  trains.forEach((train,index) => {
    delete train.mode
    delete train.agency
    delete train.routeId
    delete train.routeSortOrder
    delete train.inService
    delete train.routeType
    if (train.statusDetails){
      train.statusDetails = train.statusDetails[0]
      delete train.statusDetails.creationDate
      delete train.statusDetails.direction
      delete train.statusDetails.endDate
      delete train.statusDetails.priority
      delete train.statusDetails.startDate
    }
    if (train.statusDetails == null){
      train.statusDetails = {statusSummary:"all good."}
    }else{
      switch (train.statusDetails.statusSummary){
        case "Planned Work":
          train.statusDetails.statusSummary = "planned work."
        break
        case "Service Change":
          train.statusDetails.statusSummary = "service change."
        break
        case "Delays":
          train.statusDetails.statusSummary = "delayed af."
        break
        case "Slow Speeds":
          train.statusDetails.statusSummary = "slow af."
        break
        default: 
          train.statusDetails.statusSummary = "probably screwed."
      }
    }
  })
  sortTrains(trains)
}

removeTrains = trains => {
  trains.forEach((train,index) => {
    if (train.route == "6X" || train.route == "7X" || train.route == "SIR"|| train.route == "S"){
      trains.splice(index,1)
    }
  })
  formatTrainData(trains)

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
  removeTrains(trains)
  }
})

