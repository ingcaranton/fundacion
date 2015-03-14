(function( $ ) {
  var flip = function(dom, flipedRotate) {
    dom.data("fliped", true);
    dom.css({
      transform: flipedRotate
    });
  };

  var unflip = function(dom) {
    dom.data("fliped", false);
    dom.css({
      transform: "rotatex(0deg)"
    });
  };

  $.fn.flip = function(options) {
    this.each(function(){
        var $dom = $(this);

        var settings = $.extend({
          reverse: false,
          speed: 500,
          velMax:5000,
          velMin:2500,
          rangoMax:5,
          rangoMin:1
        }, options );

        var direction = settings.reverse? "-180deg" : "180deg";
      
        $dom.data("flipedRotate", "rotatey(" + direction + ")");
        var flipedRotate = $dom.data("flipedRotate");

        var speedInSec = settings.speed/1000 || 0.5;
        $dom.css({
          "transform-style": "preserve-3d",
          transition: "all " + speedInSec + "s ease-out" 
        });

        $dom.find(".front, .back").css({
          position: "absolute",
          "backface-visibility": "hidden"
        });

        $dom.find(".back").css({
          transform: flipedRotate
        });
        $(document).ready(function(){
              $dom.data("hover", false);
              var nextContent = $('#'+$dom.attr('id')+' .store li:nth-child('+(Math.floor(Math.random() * (settings.rangoMax-settings.rangoMin+settings.rangoMin)) + settings.rangoMin)+')').html(); 
              $('#'+$dom.attr('id')+' .front').html(nextContent);

        var random= Math.floor(Math.random() * (settings.velMax-settings.velMin+settings.velMin)) + settings.velMin; 

          setInterval(function() { 
            random2= Math.floor(Math.random() * (settings.rangoMax-settings.rangoMin+settings.rangoMin)) + settings.rangoMin;
            var nextContent = $('#'+$dom.attr('id')+' .store li:nth-child(' + random2 + ')').html(); 

            
            if(!$dom.data("hover")){
             
           if ($dom.data("fliped")) {
              $('#'+$dom.attr('id')+' .front').html(nextContent);
              unflip($dom);

            } 
           else {
              $('#'+$dom.attr('id')+' .back').html(nextContent);
              flip($dom, flipedRotate);

            }}
          }, random);
            $('#'+$dom.attr('id')).hover(function(){ $dom.data("hover", true);},function(){ $dom.data("hover", false);});
        });
      
    });
    return this;
  };
}( jQuery ));