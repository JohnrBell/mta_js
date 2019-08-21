var trainData = require('../parse.js')


const dataSet = trainData.retrieveData()

exports.get_trains = (req,res) => {
  //generate cache time
  now = Date.parse(new Date)

  // console.log('cache is '+((now-json.cacheTime)/1000)+' seconds old')

  //generate a token, serve index, fetch new train data from MTA
  token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  res.render('index', {token:token})
}


exports.post_trains = (req,res) => {
  //runs when we serve html and fetch new train data from MTA
  //client POST train data to this route
  if (req.body.token == token){
    console.log('token match :)')
    //add cache time to object
    trainData.addCacheInfo(req.body.data)
  }else{
    res.status(401)
  }
}