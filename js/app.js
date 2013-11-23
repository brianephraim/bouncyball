;(function(global){
	// UglifyJS define hack.  Used for unit testing.
	if (typeof APP_NOW === 'undefined') {
	  APP_NOW = function () {
	    return +new Date();
	  };
	}

	if (typeof APPS === 'undefined') {
	  var global = (function(){return this;})();
	}

	//!!!!!!!!!!!!!!!!!!!!!!!!!!!
	//EXPECTS <whatev class="catSlides"></whatev> in the DOM
	var app = function($,bouncyball){
		$(function(){
    		var myBouncyball = new bouncyball(
    			{
				    topMultiplier:4,
				    leftMultiplier:2,
				    topIterator:0,
				    leftIterator:0,
				    topDirection:1,
				    leftDirection:1,
				    timeout:5,
				    $actor:$('.actor'),
				    $stage:$('.bouncyballWidgetFrame')
				}
    		);
		});
		return 'Hi i am return app';
	};


	if (typeof exports === 'object') {
		// nodejs
		module.exports = app($,bouncyball);
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jQuery','js/bouncyball'],function(){ 
			return app.apply(null,arguments);
		});
	} else if (typeof global.app === 'undefined') {
		// Browser: Make `Tweenable` globally accessible.
		global.app = app($,bouncyball);
	}



})(this);


