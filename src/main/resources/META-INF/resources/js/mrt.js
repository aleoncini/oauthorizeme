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

function displayAccessToken(token) {
    $('#loginForm').hide();
    $('#accessTokenText').html(token);
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
            localStorage.setItem('token', obj.Access_token);
            callbackFunction(obj.Access_token);        
        }
    });
}

function loadRepos(callbackFunction) {
    var the_url = API_URL + 'user/repos';
    $.ajax({
        url: the_url,
        type: 'GET',
        dataType: 'json',
        beforeSend: function(req) {
            req.setRequestHeader('Accept', 'application/vnd.github+json, application/json');
            req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            req.setRequestHeader('X-GitHub-Api-Version', '2026-03-10');
        },
        complete: function(response, status){
            const repos = JSON.parse(response.responseText);
            callbackFunction(repos);        
        }
    });
};

function displayRepos(repos) {
    // id, full_name, description, html_url
    $('#loginForm').hide();
    $('#accessCode').hide();
    $("#reposTableBody").empty();

    $.each(repos, function (index, repo) {
        addRepoToTable(repo);
    });

    $('#repos').show(500);
}

function addRepoToTable(repo) {
    var rowContent = '<tr>';
    rowContent += '<td>' + repo.id + '</td>';
    rowContent += '<td>' + repo.full_name + '</td>';
    rowContent += '<td>' + repo.description + '</td>';
    rowContent += '<td><a href="' + repo.html_url + '" class="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">' + repo.html_url + '</a></td>';
    rowContent += '</tr>';
    $('#tbl_repos  tbody').append(rowContent);
};