var trainData = require('../parse.js')

var globalTrains = {}
// var token = ""

exports.get_trains = (req,res) => {
  if (Object.keys(globalTrains).length == 0){
    //generate a token, serve index, fetch new train data from MTA
    token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    res.render('index', {token:token})
  }else{
    //generate cache time
    let now = Date.parse(new Date)
    //check age of data
    console.log(globalTrains.cacheTime)
    // console.log('cache is '+((now-json.cacheTime)/1000)+' seconds old')
    res.send(globalTrains)
  }
}


exports.post_trains = (req,res) => {
  //runs when we serve html and fetch new train data from MTA
  //client POST train data to this route
  if (req.body.token == token){
    console.log('token match :)')
    //add cache time to object
    globalTrains = trainData.addCacheInfo(req.body.data)
    console.log('globalTrains: '+JSON.stringify(globalTrains))
  }else{
    res.status(401)
  }
}