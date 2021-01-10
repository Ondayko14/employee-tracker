$(document).on("click", ".btn-danger", function() {
    console.log($(this.offsetParent));
    this.offsetParent.hidden = true;
});