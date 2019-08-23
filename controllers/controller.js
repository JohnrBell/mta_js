var helper = require('../helper.js')
var globalTrains = {}

//runs when main URL is hit.
exports.get_trains = (req,res) => {
  //checks if global train object is empty, if so serve html and fetch new trains
  if (Object.keys(globalTrains).length == 0){
    //generate a token, serve index, fetch new train data from MTA
    token = helper.genToken()
    res.render('index', {token:token})
  }else{
    //generate cache time
    let now = Date.parse(new Date)
    //check age of data
    if (((now - globalTrains.cacheTime)/1000) < 1){ //300 is 5 min
      res.send(globalTrains)
    }else{
      res.render('index', {token:token})
    }
  }
}


//client POST train data to this route
exports.post_trains = (req,res) => {
  if (req.body.token == token){
    //process the response
    globalTrains = helper.processRes(req.body.data)
  }else{
    res.status(401)
  }
}