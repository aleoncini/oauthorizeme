var STORE_ORIGIN = window.location.origin;
const AUTH_URL = 'https://github.com/login/oauth/authorize';
const TOKEN_URL = 'https://github.com/login/oauth/access_token';
const API_URL = 'https://api.github.com/';

function setAlert(msg) {
    $("#formNotComplete").html(msg);
    $("#formNotComplete").fadeIn();
    window.setTimeout(function() {
        $("#formNotComplete").fadeOut();
    }, 3000);
};

const generateHash = (string) => {
  let hash = 0;
  for (const char of string) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0; // Constrain to 32bit integer
  }
  return hash;
};

function queryParamToBool(value) {
  return ((value+'').toLowerCase() === 'true')
}

function getAccessToken(client_secret, callbackFunction) {
}

function loadRepos(client_secret, callbackFunction) {
    $.ajax({
        url: TOKEN_URL,
        type: 'GET',
        dataType: 'json',
        beforeSend: function(req) {
            req.setRequestHeader('Accept', 'application/vnd.github.v3+json, application/json');
            req.setRequestHeader('User-Agent', 'https://example-app.com/');
            req.setRequestHeader('Authorization', 'Bearer ' + client_secret);


            'Accept: application/vnd.github.v3+json, application/json',
      'User-Agent: https://example-app.com/'

            req.setRequestHeader('Authorization', 'Bearer ' + keycloak.token);
        },
        complete: function(response, status){
            var userAlreadyExists = false;
            if(status=='nocontent'){
                var associate = {};
                associate.userid = id;
            } else {
                userAlreadyExists = true;
                var associate = jQuery.parseJSON(response.responseText);
            }
            callbackFunction(associate, userAlreadyExists);        
        }
    });
};









function displayAllTrips() {
    $('#current_report').hide();
    $("#tripsTableBody").empty();

    // check if an array of trips is locally saved
    var trips = JSON.parse(localStorage.getItem("mrtTrips") || "[]");

    $.each(trips, function (index, trip) {
        addTripToTable(trip, index)
    });

    $('#current_report').show(500);
};

function addTripToTable(trip, ndx) {
    var tripDate = new Date(trip.date).toLocaleDateString('it-IT', options);
    var rowContent = '<tr>';
    rowContent += '<td>' + tripDate + '</td>';
    rowContent += '<td>' + trip.odometerStart + '</td>';
    rowContent += '<td>' + trip.from + '</td>';
    rowContent += '<td>' + trip.destination + '</td>';
    rowContent += '<td><img src="img/';
    if(trip.twoWays){
        rowContent += 'check-';
    }
    rowContent += 'circle.svg" width="24" height="24"></td>';
    rowContent += '<td>' + trip.purpose + '</td>';
    rowContent += '<td>' + trip.odometerEnd + '</td>';
    rowContent += '<td>' + trip.distance + '</td>';
    //console.log("=====> " + trip.date + " ===== " + ndx);
    rowContent += '<td style="cursor: pointer;" class="delete_trip" data-id="' + ndx + '"><img src="img/trash.svg" alt="delete" width="24" height="24"></td>';
    rowContent += '</tr>';
    $('#tbl_trips  tbody').append(rowContent);
};