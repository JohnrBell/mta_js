const token = document.getElementById('token').innerHTML
const trainInfo = {}

// const mtaXML = 'https://collector-otp-prod.camsys-apps.com/realtime/serviceStatus?apikey=qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP'
// $.ajax({
//   url: mtaXML,
//   success: data => {
//     // debugger
//     subway = []
//     data.routeDetails.forEach(line => {
//       if (line.mode == "subway"){
//         subway.push(line)
//       }
//     })
//     console.log(subway)
//   }
// })

scripturl = "https://new.mta.info/themes/custom/bootstrap_mta/js/apps/service-status.js?pvkekr"

const xhr = new XMLHttpRequest()
window.addEventListener('load', () => {
  xhr.open('GET',scripturl)
  xhr.send()
})



