const heart = document.getElementById('heart')
const showSelectedColor = document.querySelector('.colorShow .selectedColor')
const copyHexArea = document.querySelector('.colorShow path')
let selectionWasMade = false
let selectedHex

function rgbToHex(rgb) {
    const rgbArray = rgb.match(/\d+/g) // Extrac numeric values from the rgb string
    const hex = rgbArray.map(value => {
        const hexValue = parseInt(value).toString(16) // Converts to base16
        return hexValue.length === 1 ? "0" + hexValue : hexValue
    }).join('')

    return `#${hex}`
}

const copySelectedColor = () => {
    navigator.clipboard.writeText(selectedHex)
    showSelectedColor.textContent = '¡Copiado!'
    setTimeout(() => showSelectedColor.textContent = selectedHex, 2500)
}

const handleColorSelection = (e) => {
    const selectedColor = getComputedStyle(e.target).backgroundColor
    selectedHex = rgbToHex(selectedColor).toUpperCase()
    if (!selectionWasMade) {
        heart.style.animation = 'none'
        copyHexArea.style.cursor = 'pointer'
        copyHexArea.addEventListener('click', copySelectedColor)
        selectionWasMade = true
    }
    heart.style.fill = selectedColor
    showSelectedColor.textContent = selectedHex
}

const selectors = document.querySelectorAll('.color')
selectors.forEach(elem => elem.addEventListener('click', handleColorSelection))