const divs = document.querySelectorAll('div');

const logText = function(e) {
  console.log(this.classList.value);
  // e.stopPropagation();  // stop bubbling the event up
}

divs.forEach(div => div.addEventListener('click', logText, {
  capture: false,  // run the function on the capture down
  once: true  // unbind the event for further clicks
}));