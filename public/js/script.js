const token = document.getElementById('token').innerHTML
const trainInfo = {}

const mtaXML = 'https://collector-otp-prod.camsys-apps.com/realtime/serviceStatus?apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP'

appendToDOM = subway => {
  container = document.getElementById('train_container')
  subway.forEach(train =>{
  // debugger
    element = `<div id='`+train.route+`' class='train'>`+train.route+`</div>`
    container.innerHTML += element
  })
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
    //sort
    sortOrder = {'1':0,
                '2':1,
                '3':2,
                '4':3,
                '5':4,
                '6':5,
                '7':6,
                'A':7,
                'C':8,
                'E':9,
                'B':10,
                'D':11,
                'F':12,
                'M':13,
                'G':14,
                'J':15,
                'Z':16,
                'L':17,
                'N':18,
                'Q':19,
                'R':20,
                'W':21,
                'S':22}

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

