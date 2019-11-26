$(document).ready(function () {
  
  search();

});

// FUNCTIONS
// funzione al click sul bottone search
function search () {
  $('#search').click(function () {
    // pulisco la pagina
    $('main').html('');
    // recupero l'input dell'utente e svuoto la casella
    var input = $('#input-search').val();
    $('#input-search').val('');
    // se l'input non è vuoto faccio la ricerca
    if (input !== '') {
      ajaxCall(input);
    }
  });
  // quando premo enter nell'input clicco su search
  $('#input-search').keypress(function (event) {
    if (event.keyCode == 13) {
      $('#search').click();
    }
  });
}

// funzione per chiamata ajax per film e serie tv
function ajaxCall (input) {
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie',
    data: {
      language: 'it-IT',
      api_key: 'dcf0b40295aecc1f88fc8cb48b159280',
      // come query l'input dell'utente
      query: input
    },
    method: 'GET',
    success: function (data) {
      // mi salvo tutti i risultati in una var
      var movies = data.results;
      printMovies (movies);
    },
    error: function (error) {
      alert('Errore:', error);
    }
  });
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/tv',
    data: {
      language: 'it-IT',
      api_key: 'dcf0b40295aecc1f88fc8cb48b159280',
      // come query l'input dell'utente
      query: input
    },
    method: 'GET',
    success: function (data) {
      // mi salvo tutti i risultati in una var
      var series = data.results;
      printSeries (series);
    },
    error: function (error) {
      alert('Errore:', error);
    }
  });
}

// funzione per stampa dei film
function printMovies (elements) {
  // compilo handlebars
  var source = $('#movie-template').html();
  var template = Handlebars.compile(source);
  // ciclo per ogni risultato
  elements.forEach(function(element) {
    // recupero la valutazione e trasformo in 0/5
    var rating = element.vote_average / 2;
    var stars = '';
    // inserisco il numero di stelle della valutazione
    for (var i = 0; i < rating; i++) {
      stars += '<i class="fas fa-star"></i>';
    }
    // inserisco le stelle vuote per arrivare al massimo della valuazione
    while (i < 5) {
      stars += '<i class="far fa-star"></i>';
      i++;
    }
    // inserisco nel template e appendo in pagina
    var item = {
      title: element.title,
      original_title: element.original_title,
      original_language: element.original_language,
      vote_average: stars
    }
    var html = template(item);
    $('main').append(html);
  });
}

// funzione per stampa delle serie
function printSeries (elements) {
  // compilo handlebars
  var source = $('#movie-template').html();
  var template = Handlebars.compile(source);
  // ciclo per ogni risultato
  elements.forEach(function(element) {
    // recupero la valutazione e trasformo in 0/5
    var rating = element.vote_average / 2;
    var stars = '';
    // inserisco il numero di stelle della valutazione
    for (var i = 0; i < rating; i++) {
      stars += '<i class="fas fa-star"></i>';
    }
    // inserisco le stelle vuote per arrivare al massimo della valuazione
    while (i < 5) {
      stars += '<i class="far fa-star"></i>';
      i++;
    }
    // inserisco nel template e appendo in pagina
    var item = {
      title: element.name,
      original_title: element.original_name,
      original_language: element.original_language,
      vote_average: stars
    }
    var html = template(item);
    $('main').append(html);
  });
}