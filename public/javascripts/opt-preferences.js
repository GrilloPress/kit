//Javascript to direct user to correct confirmation page based on their data sharing preferences

//Sets research opt in preferences to session
function setResearchPref() {
  var researchPref = $('input[name="research-pref"]:checked').val();

  if (researchPref == 'research-opted-out') {
    sessionStorage.researchPref = "false";
  } else {
    sessionStorage.researchPref = "true";
  }

};

//sets planning opt in preferences to session
function setPlanningPref() {
  var planningPref = $('input[name="planning-pref"]:checked').val();

  if (planningPref == 'planning-opted-out') {
    sessionStorage.planningPref = "false";
  } else {
    sessionStorage.planningPref = "true";
  }
};

//takes user to correct page based on the settings they have set
function confirm() {
  var researchPref = sessionStorage.researchPref;
  var planningPref = sessionStorage.planningPref;

  if (researchPref == "true" && planningPref == "true") {
    window.location.href = 'confirm-in-in.html';
  } else if (researchPref == "true" && planningPref == "false") {
    window.location.href = 'confirm-in-out.html';
  } else if (researchPref == "false" && planningPref == "true") {
    window.location.href = 'confirm-out-in.html';
  } else {
    window.location.href = 'confirm-out-out.html';
  }
};

function confirmAll() {
  setResearchPref();
  setPlanningPref();
  confirm();
}
