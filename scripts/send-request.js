(function() {
var getUrlParameter = function getUrlParameter(sParam) {
    // Source: https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

//Define a Fallback pid, if pid does not exist
let fallbackPid = "gw8svisp9e";
var pid = getUrlParameter('pid') ? getUrlParameter('pid') : fallbackPid;

//var database = firebase.database();
return firebase.database().ref('projects/'+pid).once('value').then(function(snapshot) {
  data = (snapshot.val() || 'Anonymous')
  if (data !== 'Anonymous') writeToApp(data)
  else {
    return firebase.database().ref('projects/'+fallbackPid).once('value').then(function(snapshot) {
        data = (snapshot.val() || 'Anonymous')
        writeToApp(data)
    })
  }
});

function writeToApp(data) {
  if(data=="Anonymous") return
  // Kurzbeschreibung
  $("#p-head-pi").html(data.textShort)
  // Langbeschreibung
  $("#description-pi").html("<p>"+data.textLong+"</p>")
  // Bild
  $( "#pip-placeholder" ).css( 'background-image', 'url("'+ data.teaser +'")')
  // Project Logo
  $( "#project-logo" ).attr("src", data.projectLogo)
  // Company Logo
  $( "#company-logo" ).attr("src", data.companyLogo)
}

// Helper function
function log(msg) {
    console.log(msg)
}
})();



