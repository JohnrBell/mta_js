const mtaXML = 'http://web.mta.info/status/serviceStatus.txt'
const request = require('request');
const parseString = require('xml2js').parseString


request(mtaXML, { json: false }, (err, res, body) => {
  parseString(body, (err,result) => {
		subwayLines = result.service.subway[0].line
		parseLines(subwayLines)
	})
});

parseLines = subwayLines => {
	allLines = []
	subwayLines.forEach(line => {
		let name = line.name[0]
		let status = line.status[0]
		let detail = line.text[0]

		lineObj = {}
		lineObj['name'] = name
		lineObj['status'] = status
		lineObj['detail'] = detail

		allLines.push(lineObj)
	})
	filterHTML(allLines)
}

filterHTML = allLines => {
	allLines.forEach(line =>{
		line.detail.replace(/\n+ */, "")
		line.detail.replace(/&nbsp;|<br \/>/, " ")
	})
	replaceStatus(allLines)
}

replaceStatus = allLines => {
	allLines.forEach(line =>{
		switch(line.status){
			case 'GOOD SERVICE':
				line.status = 'all good.'
				break;
			case 'PLANNED WORK':
				line.status = 'planned work.'
				break;
			case 'DELAYS':
				line.status = 'delayed af.'
				break;
			case 'SERVICE CHANGE':
				line.status = 'service change.'
				break;				
			default:
				line.status = 'probably screwed.'								
		}
	})
	addCacheTime(allLines)	
}

addCacheTime = allLines => {
	trainInfo = {}
	trainInfo['trainData'] = allLines
	trainInfo['cacheTime'] = Date.parse(new Date)
}


exports.get_json = () => {
	console.log('sending json')
	return trainInfo
}