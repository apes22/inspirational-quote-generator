/* Twitter widgets.js script*/
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
  return t;
}(document, "script", "twitter-wjs"));

/*Parameters for the Share Dialog in Facebook SDk*/
var fbShareDialogParams = {
  method: 'share',
  display: 'popup',
  mobile_iframe: true,
  href: 'https://maribelduran.github.io/inspirational-quote-generator/',
  picture: 'https://res.cloudinary.com/maribelduran/image' +
    '/upload/v1472088347/Random%20Quote%20Generator/up-in-the-clouds-1500x997_wg6jaw.jpg',
  description: 'Read inspirational quotes and share with friends on Facebook and Twitter.',
  caption: 'BY MARIBEL DURAN',
  quote: '',
};

$(document).ready(function() {
  newQuoteGenerator();
  $("#getNewQuote").click(newQuoteGenerator);
  $("#button-share-facebook").click(function() {
    FB.ui(fbShareDialogParams, function(response) {});
  });
});

var background_images = [
  'https://cdn.magdeleine.co/wp-content/uploads/2014/11/wdXqHcTwSTmLuKOGz92L_Landscape-1400x957.jpg',
  'https://cdn.magdeleine.co/wp-content/uploads/2014/09/6H-1400x933.jpg',
  'https://ununsplash.imgix.net/uploads/1413387158190559d80f7/6108b580?q=75&fm=jpg&s=d1c3df390a81d3371d05730a396ca390',
  'https://images.unsplash.com/photo-1427464407917-c817c9a0a6f6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=812662922febc6b1006719224d6c3772',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=61282cfeed75871385c84c2a44a8e594',
  'https://images.unsplash.com/photo-1460500063983-994d4c27756c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=27c2758e7f3aa5b8b3a4a1d1f1812310',
  'https://isorepublic.com/wp-content/uploads/2015/10/up-in-the-clouds-1500x997.jpg',
  'https://images.unsplash.com/photo-1452711932549-e7ea7f129399?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=58b1e18ecae2804d6f2df344530bdaf6',
  'https://images.unsplash.com/photo-1433360405326-e50f909805b3?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=9ab739b6338ab856496c9cec7578f58f',
  'https://images.unsplash.com/photo-1433190152045-5a94184895da?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=4578a679069b9fb7be2d39d5d2d1e2bf',
  'https://images.unsplash.com/photo-1445127040028-b1bdb9acd16e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=5f10c1c850239222d20e96ae1b8b5862',
  'https://images.unsplash.com/photo-1437651025703-2858c944e3eb?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=42cead70c6b9ecf7212d794c2f5541dc'
];

function newQuoteGenerator() {
  var url = "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?"

  $.getJSON(url,
    function(jsonp) {
      var new_quoteText = jsonp.quoteText;
      var new_quoteAuthor = jsonp.quoteAuthor;
      if (new_quoteAuthor == "") {
        new_quoteAuthor = "Unknown Author";
      }
      updateIntentTweetURL(new_quoteText, new_quoteAuthor);
      updateFBShareQuote(new_quoteText, new_quoteAuthor);

      //update quote text
      $("blockquote").animate({
          opacity: 0
        }, 1000,
        function() {
          $(this).animate({
            opacity: 1
          }, 1000);
          $("#quote").html(new_quoteText);
        });

      //update quote author
      $("#quote_author").animate({
          opacity: 0
        }, 1000,
        function() {
          $(this).animate({
            opacity: 1
          }, 1000);
          $(this).html(new_quoteAuthor);
        });
    })
};

function updateIntentTweetURL(new_quote, new_author) {
  var hashtag = "&hashtags=inspirationalquotes";
  var url = "https://twitter.com/intent/tweet?text=" + '"' + new_quote + '"' + ' -' + new_author + hashtag;
  var encoded_url = encodeURI(url);
  $("#button-share-tweet").attr("href", encoded_url);
};

function updateFBShareQuote(new_quote, new_author) {
  fbShareDialogParams.quote = '"' + new_quote + '"' + ' -' + new_author;
}

function getRandomBackgroundImage(min, max) {
  var index = Math.floor(Math.random() * (max - min)) + min;
  var url = 'url(' + background_images[index] + ')';
  return url;
}

var background_image_url = getRandomBackgroundImage(0, background_images.length);
$("body").css('background-image', background_image_url);