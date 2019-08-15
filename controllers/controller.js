var train_data = require('../parse.js')

exports.get_trains = (req,res) => {
  json = train_data.get_json()
  now = Date.parse(new Date)
  console.log('cache is '+((now-json.cacheTime)/1000)+' seconds old')

  if (now - json.cacheTime < 2000){
    // send cached 
    res.json(train_data.get_json())
  }else{
    token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    // res.send(token)
    res.render('index', {token:token})
  }
  
}

exports.post_trains = () => {
	console.log('getting')
}