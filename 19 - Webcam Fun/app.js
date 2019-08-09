const video = document.querySelector('.player')
const canvas = document.querySelector('.photo')
const ctx = canvas.getContext('2d')
const strip = document.querySelector('.strip')
const snap = document.querySelector('.snap')
const inputs = document.querySelectorAll('.rgb input')
const levels = {}
let i, red, blue, green

const getVideo = () => {
  navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    .then(localMediaStream => {
      video.srcObject = localMediaStream
      video.play()
    })
    .catch(err => console.error('Webcam denied, error', err))
}

const paintToCanvas = () => {
  const width = video.videoWidth
  const height = video.videoHeight
  canvas.width = width
  canvas.height = height

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height)
    let pixels = ctx.getImageData(0, 0, width, height)
    console.log(pixels)
    // ctx.globalAlpha = 0.1
    // redEffect(pixels)
    rgbSplit(pixels)
    // greenScreen(pixels)
    ctx.putImageData(pixels, 0, 0)
  }, 16)
}

const takePhoto = () => {
  snap.currentTime = 0
  snap.play()

  const data = canvas.toDataURL('image/jpeg')
  const link = document.createElement('a')
  const date = new Date()
  const name = `JS30_Day_19_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}.jpg`
  link.href = data
  link.setAttribute('download', name)
  link.innerHTML = `<img src="${data}" alt="Snapshot"/>`
  strip.insertBefore(link, strip.firstChild)
}

const redEffect = (pixels) => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100 // Red
    pixels.data[i + 1] = pixels.data[i + 1] - 50 // Green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5 // Blue
  }
}

const rgbSplit = (pixels) => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0] // Red
    pixels.data[i + 100] = pixels.data[i + 1] // Green
    pixels.data[i - 150] = pixels.data[i + 2] // Blue
  }
}

const greenScreen = (pixels) => {
  for (i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0]
    green = pixels.data[i + 1]
    blue = pixels.data[i + 2]

    if (red >= levels.rmin && red <= levels.rmax &&
      green >= levels.gmin && green <= levels.gmax &&
      blue >= levels.bmin && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0
    }
  }
}

const update = () => {
  inputs.forEach(input => (levels[input.name] = input.value))
}

getVideo()
update()
video.addEventListener('canplay', paintToCanvas)
inputs.forEach(i => i.addEventListener('change', update))