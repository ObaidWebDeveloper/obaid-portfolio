const docWidth = window.innerWidth;
const docHeight = window.innerHeight;
const popup = document.querySelector(".menu-popup");
const popupStyle = window.getComputedStyle(popup);
const popupW =  parseInt(popupStyle.width);
const popupH = parseInt(popupStyle.height);

document.oncontextmenu = (e) => {
  e.preventDefault();
  popup.hidden = false;
  
  let left = e.pageX;
  let top = e.pageY;
  
  if(left+(popupW/2) >= docWidth){
    left = left-(left-docWidth)-((popupW/2)+20);
  }else if(left <= (popupW/2)){
    left = (popupW/2)+20;
  }
  
  if(top+(popupH/2) >= docHeight){
    top = top-(top-docHeight)-((popupH/2)+20);
  }else if(top <= (popupH/2)){
    top = (popupH/2)+20;
  }
    popup.style.left = `${left}px`;
  popup.style.top = `${top}px`;
}

document.onclick = () => {
  popup.hidden = true;
}