console.log("yues");

$('.down-btn').on("click", (e) => {

  console.log("down button pushed");
  

  if ($(e.target).hasClass('active')) {
    // remove class 'active' from button and invisibox
    console.log("remove active");
  } else {
    // add class 'active' to button and invisibox
    console.log("add active");
  }

})