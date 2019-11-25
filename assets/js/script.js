$(document).ready(function () {
  
  searchMovies();

});

// FUNCTIONS
// funzione al click sul bottone search
function searchMovies () {
  $('#search').click(function () {
    // pulisco la pagina
    $('main').html('');
    // recupero l'input dell'utente
    var input = $('#input-search').val();
    // se l'input non è vuoto faccio la ricerca
    if (input !== '') {
      ajaxMovies(input);
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
      // ciclio per ogni risultato
      movies.forEach(function(item) {
        // inserisco nel template e appendo in pagina
        var source = $('#movie-template').html();
        var template = Handlebars.compile(source);
        var html = template(item);
        $('main').append(html);
      });
    }
  });
}







// API
// url: 'https://api.themoviedb.org/3/search/movie'
// data {
//   language: it-IT,
//   api_key: dcf0b40295aecc1f88fc8cb48b159280,
//   query:
// }