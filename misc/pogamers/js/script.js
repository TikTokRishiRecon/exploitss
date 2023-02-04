function GotoLink() {
  var sel = $(".basic_plan").val();
  var sel2 = $(".basic_plan2").val();
  window.location.href = "/misc/pogamers/play/" + sel + "/" + sel2 + "";
  document.getElementById("abc").href =
    "/misc/pogamers/play/" + sel + "/" + sel2 + "";
}
