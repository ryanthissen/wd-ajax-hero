(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  let form = document.getElementsByTagName('form')[0];
  let search = document.getElementById('search');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    let title = search.value;
    let url = `http://www.omdbapi.com/?s=${title}&type=movie&y=&plot=short&r=json`
    fetch(url)
      .then(function(pObj) {
        return pObj.json();
      })
      .then(function(jsonObj) {
        return jsonObj.Search;
      })
      .then(function(search) {
        for(let i = 0; i < search.length; i++) {
          let newObj = {};
            newObj.id = search[i].imdbID,
            newObj.poster = search[i].Poster,
            newObj.title = search[i].Title,
            newObj.year = search[i].Year,
            movies.push(newObj);
            renderMovies();
        }
        movies.splice(0, movies.length);
        form.reset();
      });
  })
})();
