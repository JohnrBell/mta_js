exports.addCacheInfo = trains => {
	// console.log(trains)
	trainObj = {}
	trainObj.trains = trains
	trainObj.cacheTime = new Date
	return trainObj
}

exports.genToken = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}