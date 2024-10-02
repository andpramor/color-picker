const colorSvg = document.getElementById('colorSvg')
const showSelectedColor = document.querySelector('.colorShow .selectedColor')
const copyHexArea = document.querySelector('.colorShow path')
let selectionWasMade = false
let selectedHex

function rgbToHex(rgb) {
  const rgbArray = rgb.match(/\d+/g) // Extrac numeric values from the rgb string
  const hex = rgbArray
    .map((value) => {
      const hexValue = parseInt(value).toString(16) // Converts to base16
      return hexValue.length === 1 ? '0' + hexValue : hexValue
    })
    .join('')

  return `#${hex}`
}

const copySelectedColor = () => {
  navigator.clipboard.writeText(selectedHex)
  showSelectedColor.textContent = '¡Copiado!'
  setTimeout(() => (showSelectedColor.textContent = selectedHex), 2500)
}

const getLuminance = (color) => {
  const rgbValues = color
    .replace(/[^\d,]/g, '')
    .split(',')
    .map(Number)

    // Normalize color values and adjust them to human perception
  const a = [rgbValues[0], rgbValues[1], rgbValues[2]].map(function (v) {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

const handleColorSelection = (e) => {
  const selectedColor = getComputedStyle(e.target).backgroundColor
  const selectedLuminance = getLuminance(selectedColor)
  if (selectedLuminance < 0.5) {
    showSelectedColor.style.color = 'white';
  } else {
    showSelectedColor.style.color = 'black';
  }

  selectedHex = rgbToHex(selectedColor).toUpperCase()
  if (!selectionWasMade) {
    colorSvg.style.animation = 'none'
    copyHexArea.style.cursor = 'pointer'
    copyHexArea.addEventListener('click', copySelectedColor)
    selectionWasMade = true
  }
  colorSvg.style.fill = selectedColor
  showSelectedColor.textContent = selectedHex
}

const selectors = document.querySelectorAll('.color')
selectors.forEach((elem) =>
  elem.addEventListener('click', handleColorSelection)
)
