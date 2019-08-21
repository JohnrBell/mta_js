var trainObj = require('../helper.js')
var globalTrains = {}

//runs when main URL is hit.
exports.get_trains = (req,res) => {
  //checks if global train object is empty, if so serve html and fetch new trains
  if (Object.keys(globalTrains).length == 0){
    //generate a token, serve index, fetch new train data from MTA
    token = trainObj.genToken()
    res.render('index', {token:token})
  }else{
    //generate cache time
    let now = Date.parse(new Date)
    //check age of data
    if (((now - globalTrains.cacheTime)/1000) < 300){
      console.log('cache is less than 5 minutes old')
      res.send(globalTrains)
    }else{
      console.log('cache is older than 5 minutes')
      res.render('index', {token:token})
    }
    // console.log('cache is '+((now-json.cacheTime)/1000)+' seconds old')
  }
}


//runs when we serve html and fetch new train data from MTA
//client POST train data to this route
exports.post_trains = (req,res) => {
  if (req.body.token == token){
    //add cache time to object
    globalTrains = trainObj.addCacheInfo(req.body.data)
    console.log('globalTrains: '+JSON.stringify(globalTrains))
  }else{
    res.status(401)
  }
}