//Please enter your personal details page ---------------------------------------------------------------------------------
//JQuery ------------------------------------------------------------------------------------------------------------------

//waits for the page to load
$(window).load(function() {
  $("#choose-option").click(confirmAll);
});

//JS ----------------------------------------------

//Sets research opt in preferences to session
function setVerOpt() {
  var verificationOption = $('input[name="channel-choice"]:checked').val();

  if (verificationOption == 'unrecognised') {
    localStorage.verificationOption = "unrecognised";
  } else if (verificationOption == 'email'){
    localStorage.verificationOption = "email";
  } else {
    localStorage.verificationOption = "mobile"
  }

};

//takes user to correct page based on the settings they have set
function confirm() {
  var verificationOption = localStorage.verificationOption;

  if ((verificationOption == "email" || verificationOption == "mobile")) {
    window.location.href = 'enter-your-code.html';
  } else {
    window.location.href = 'contact-us.html';
  }
};

function confirmAll() {
  setVerOpt();
  confirm();
}
