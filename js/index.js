setTimeout(function () {
  $(".dabba").html("<div class='line'>I am Prateek...</div>")
},3500);

  setTimeout(function () {
  $(".up").html('<a href="#nav"><img id="up" src="https://image.flaticon.com/icons/svg/25/25223.svg" alt="up icon!" height="30px" width="30px"></a>')
},6500);

function Flicker() { $("#up").delay(1500).fadeTo(300,0).delay(1500).fadeTo(300,1, Flicker);
}
setTimeout(Flicker,6555);