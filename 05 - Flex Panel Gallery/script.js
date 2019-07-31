const panels = document.querySelectorAll('.panel');

const toggleOpen = function()  {
  if (!this.classList.contains('open')) {
    panels.forEach(panel => {
      panel.classList.remove('open')
      panel.classList.remove('open-active')
    })
    this.classList.toggle('open')
  } else {
    panels.forEach(panel => {
      panel.classList.remove('open')
      panel.classList.remove('open-active')
    })
  }
}

const toggleActive = function(e) {
  if (e.propertyName.includes('flex')) {
    if (this.classList.contains('open')) {
      this.classList.toggle('open-active');
    }
  }
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));

panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));