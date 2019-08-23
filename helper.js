exports.genToken = () => {
  // generate random token for post
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

exports.processRes = trains => {
  //adds time to compare for caching
  addCacheInfo = trains => {
    trainObj = {}
    trainObj.trains = trains
    trainObj.cacheTime = new Date
    return trainObj
  }

  //sort trains to logical/preferred order
  sortTrainOrder = trains => {
    sortOrder = {'1':0,'2':1,'3':2,'4':3,'5':4,'6':5,'7':6,'A':7,'C':8,'E':9,'B':10,'D':11,
                'F':12,'M':13,'G':14,'J':15,'Z':16,'L':17,'N':18,'Q':19,'R':20,'W':21,'S':22}
    sortedTrains = []
    trains.forEach(train => {
      trainIndex = sortOrder[train.route]
      if (trainIndex != null){
        sortedTrains[trainIndex] = train
      }
    })
    return addCacheInfo(sortedTrains)
  }

  //remove unneeded data & simplify objects 
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
          case "Planned Work": train.statusDetails.statusSummary = "planned work."
          break
          case "Service Change": train.statusDetails.statusSummary = "service change."
          break
          case "Delays": train.statusDetails.statusSummary = "delayed af."
          break
          case "Slow Speeds": train.statusDetails.statusSummary = "slow af."
          break
          default:   train.statusDetails.statusSummary = "probably screwed."
        }
      }
    }) 
    return sortTrainOrder(trains)
  }

  return formatTrainData(trains)
}

