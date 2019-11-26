$(document).ready(function () {
  
  searchMovies();

});

// FUNCTIONS
// funzione al click sul bottone search
function searchMovies () {
  $('#search').click(function () {
    // pulisco la pagina
    $('main').html('');
    // recupero l'input dell'utente e svuoto la casella
    var input = $('#input-search').val();
    $('#input-search').val('');
    // se l'input non è vuoto faccio la ricerca
    if (input !== '') {
      ajaxMovies(input);
    }
  });
  // quando premo enter nell'input clicco su search
  $('#input-search').keypress(function (event) {
    if (event.keyCode == 13) {
      $('#search').click();
    }
  });
}

// funzione per chiamata ajax e stampa risultati
function ajaxMovies (input) {
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
      print (movies);
    },
    error: function (error) {
      alert('Errore:', error);
    }
  });
}

function print (movies) {
  // compilo handlebars
  var source = $('#movie-template').html();
  var template = Handlebars.compile(source);
  // ciclo per ogni risultato
  movies.forEach(function(item) {
    // recupero la valutazione e trasformo in 0/5
    var rating = item.vote_average / 2;
    console.log(rating);
    
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
    var movie = {
      title: item.title,
      original_title: item.original_title,
      original_language: item.original_language,
      vote_average: stars
    }
    var html = template(movie);
    $('main').append(html);
  });
}







// API
// url: 'https://api.themoviedb.org/3/search/movie'
// data {
//   language: it-IT,
//   api_key: dcf0b40295aecc1f88fc8cb48b159280,
//   query:
// }