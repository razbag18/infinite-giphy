var searchForm = $('.search-form');
var searchBar = $('.search-bar');
var resultsDiv = $('.results');
var offset = 10;

function handleSubmit(event) {
  event.preventDefault();
  
  const options = {
    url: `http://api.giphy.com/v1/gifs/search?q=${ (searchBar).val() }&api_key=DeXaS0d74hjF73LTWtIlIslzOGhZGE94&limit=10`,
    method: 'get',
    dataType: 'json'
  }
  
  const showSearchResults = function(res){
    resultsDiv.textContent = ""; //not clearing
    const giphy = res.data; 
    
    $(giphy).each(function(index, gif){
      var image = new Image
      var giphyImg = gif.images.downsized.url;
      image.src = giphyImg;
      $(image).append(giphyImg);
      $(resultsDiv).append(image);
    })

  }
  $.ajax(options).done(showSearchResults);
}

searchForm.on('submit', handleSubmit);

$(window).scroll(function() {
  if($(window).scrollTop() == $(document).height() - $(window).height()) {
    const options = {
      url: `http://api.giphy.com/v1/gifs/search?q=${ (searchBar).val() }&api_key=DeXaS0d74hjF73LTWtIlIslzOGhZGE94&limit=10&offset=${offset}`,
      method: 'get',
      dataType: 'json'
    }
    
    const showSearchResults = function(res){
      const giphy = res.data;
  
      $(giphy).each(function(index, gif){
        var image = new Image(300, 200)
        var giphyImg = gif.images.downsized.url;
        image.src = giphyImg;
        $(image).append(giphyImg);
        $(resultsDiv).append(image);
        offset ++;
      })
  
    }
  
    $.ajax(options).done(showSearchResults);
    }
  }
);

