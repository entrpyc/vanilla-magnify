function Magnify(options) {
  let selector = options.selector ? options.selector : false
  let zoom = options.zoom ? options.zoom : 50
  let smoothness = options.smoothness ? options.smoothness : 3
  let byClick = options.byClick ? options.byClick : false
  let byHover = options.byHover ? options.byHover : false
  let cursor = options.cursor ? options.cursor : 'crosshair'

  const containers = document.querySelectorAll(selector)
  
  containers.forEach(function(container) {
    const zoomed = 1 + (zoom / 100)
    const halved = zoom / 2
  
    container.style.position = 'relative'
    container.style.overflow = 'hidden'
  
    var clone = container.querySelector('img').cloneNode(true);
  
    clone.style.position = 'absolute';
    clone.style.left = '0';
    clone.style.top = '0';
    clone.style.width = '100%';
    clone.style.transition = '0.2s opacity ease-in-out';
  
    container.prepend(clone);
  
    let canvasWidth = container.offsetWidth
    let canvasHeight = container.offsetHeight
  
    let clicked = 0
  
    const isHover = e => e.parentElement.querySelector(':hover') === e;

    document.addEventListener('mousemove', checkHover)
  
    function checkHover() {
      const hovered = isHover(container)
      if (hovered !== checkHover.hovered) {
        if(byClick && !hovered) {
          remove()
          clicked = 0
        }
  
        if(byHover) {
          hovered ? add() : remove()
          checkHover.hovered = hovered
          clicked = 1
        }
      }
    }
  
    if(byClick) {
      container.addEventListener('click', () => {
        clicked++ % 2 == 0 ? add() : remove()
      })
    }
  
    function add() {
      container.addEventListener('mousemove', (e) => calculate(e))
  
      setTimeout(() => {
        clone.style.opacity = '1';
      }, 0);
  
      container.style.cursor = cursor
    }
  
    function remove() {
      clone.style.opacity = '0';
      container.removeEventListener('mousemove', (e) => calculate(e))
  
      container.style.cursor = 'auto'
    }
  
    function calculate(e) {
      let percentX = halved - (halved * (((e.offsetX / canvasWidth) * 100) * 2 / 100))
      let percentY = halved - (halved * (((e.offsetY / canvasHeight) * 100) * 2 / 100))
  
      clone.style.transform = `translate(${percentX.toFixed(smoothness)}%, ${percentY.toFixed(smoothness)}%) scale(${zoomed})`;
    }
  })

}

export default Magnify;