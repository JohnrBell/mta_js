var train_data = require('../parse.js')

exports.get_trains = (req,res) => {
  json = train_data.get_json()
  now = Date.parse(new Date)
  console.log('cache is '+((now-json.cacheTime)/1000)+' seconds old')

  if (now - json.cacheTime < 2000){
    // send cached 
    res.json(train_data.get_json())
  }else{
    //serve html and fetch new train data from MTA
    token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    res.render('index', {token:token})
  }
  
}


exports.post_trains = (req,res) => {
  //runs when we serve html and fetch new train data from MTA
  if (req.body.token == token){
    console.log('token match :)')
    res.status(200)
  }else{
    console.log('token mismatch :(')
    res.status(401)
  }
}