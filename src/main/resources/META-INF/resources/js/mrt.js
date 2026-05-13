var STORE_ORIGIN = window.location.origin;
const AUTH_URL = 'https://github.com/login/oauth/authorize';
const TOKEN_URL = 'https://github.com/login/oauth/access_token';
const API_URL = 'https://api.github.com/';
const BASE_URL = 'https://aleoncini.github.io/oauthorizeme/index.html';
const APP_URL = "http://localhost:8080";

async function apiRequest(url, post = false, accessToken = null) {

    const headers = {
        'Accept': 'application/vnd.github.v3+json, application/json',
        'User-Agent': 'https://example-app.com/'
    };

    // Aggiunge il token se presente
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // Configurazione fetch
    const options = {
        method: post ? 'POST' : 'GET',
        headers: headers
    };

    // Parametri POST
    if (post) {
        options.body = new URLSearchParams(post);
    }

    // Chiamata API
    const response = await fetch(url, options);

    // Controllo errori HTTP
    if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
    }

    // Converte la risposta JSON
    return await response.json();
}

async function getToken() {
    var the_url = APP_URL + '/oauth/github?';
    the_url += 'id=' + localStorage.getItem('clientId');
    the_url += '&secret=' + localStorage.getItem('clientSecret');
    the_url += '&code=' + localStorage.getItem('code');
    console.log('getting token: ' + the_url);
    const res = await fetch(the_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log('=============> ' + JSON.stringify(await res));
    return await res;
}

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

async function test() {

    const response = await fetch('http://localhost:8080/oauth/github', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: 'test'
        })
    });

    const data = await response.json();

    console.log(data);
}

function queryParamToBool(value) {
  return ((value+'').toLowerCase() === 'true')
};

function displayAccessToken(code) {
    $('#loginForm').hide();
    $('#accessCodeText').html(code);
    $('#accessCode').show(500);
}

function getAccessToken(callbackFunction) {
    var the_url = APP_URL + '/oauth/github?';
    the_url += 'id=' + localStorage.getItem('clientId');
    the_url += '&secret=' + localStorage.getItem('clientSecret');
    the_url += '&code=' + localStorage.getItem('code');
    console.log('getting token: ' + the_url);
    $.ajax({
        url: the_url,
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        complete: function(response, status){
            console.log("Answer from GITHUB: " + response.responseText);
            const obj = JSON.parse(response.responseText);
            callbackFunction(obj.Access_token);        
        }
    });
}

function loadRepos(callbackFunction) {
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