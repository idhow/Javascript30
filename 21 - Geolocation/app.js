Learn more or give us feedback
const arrow = document.querySelector('.arrow')
const speed = document.querySelector('.speed-value')

navigator.geolocation.watchPosition((data) => {
  console.log(data.coords.speed)
  speed.textContent = Math.round(data.coords.speed * 100) / 100
  arrow.style.transform = `rotate(${data.coords.heading}deg)`
}, (err) => {
  console.error(err)
  alert('Location permission is needed for speedometer')
})