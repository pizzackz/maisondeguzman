var photo = 1;
var prev = 1;

function changebackground(num) {
    document.querySelector("#main-div").setAttribute("class","div" + num);
    document.getElementById("bgimage" + num).classList.add("selected")
    if (prev != num) {
        removeselected(prev)
        prev = num;
    }
};
function removeselected(prev) { 
    document.querySelector("#bgimage" + prev).classList.remove("selected");
};

function autoplay() {
  photo = prev;
  photo++;
  if (photo == 5){
    photo = 1
  }
  for (i=1;i<5;i++) {
    document.querySelector("#bgimage" + i).classList.remove("selected");
  }
  changebackground(photo);
}
setInterval(autoplay, 5000);






