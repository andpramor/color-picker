const heart = document.getElementById('heart')

const handleColorSelection = (e) => {
    const selectedColor = getComputedStyle(e.target).backgroundColor
    heart.style.animation = 'none'
    heart.style.fill = selectedColor
}

const selectors = document.querySelectorAll('.color')
selectors.forEach(elem => elem.addEventListener('click', handleColorSelection))