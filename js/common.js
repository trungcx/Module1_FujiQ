function showSnackBar(message) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    x.innerText = message;
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
  }