const slider = document.querySelector('#slider')
const before = document.querySelector('.before-img')
const dragger = document.querySelector('#dragger')

slider.addEventListener('input', (e) => {
  before.style.width = e.target.value + '%'
  dragger.style.left = `calc(${e.target.value}%)`
})
