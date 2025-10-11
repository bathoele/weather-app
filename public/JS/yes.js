

$('.down-btn').on("click", (e) => {
  const id = e.target.value;
  if ($(e.target).hasClass('active')) {
    $(e.target).removeClass('active');
    $('#' + id).removeClass('visible');
  } else {
    $(e.target).addClass('active');
    $('#' + id).addClass('visible');
  }
})