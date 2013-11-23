;(function(global){
	// UglifyJS define hack.  Used for unit testing..
	if (typeof BOUNCYBALL_NOW === 'undefined') {
	  BOUNCYBALL_NOW = function () {
	    return +new Date();
	  };
	}

	if (typeof BOUNCYBALL === 'undefined') {
	  var global = (function(){return this;})();
	}


	var makeBouncyballObject = function($){
		var bouncyball = function(options){
			var stageHeight = options.$stage.height();
			var stageWidth = options.$stage.width();
			var actorHeight = options.$actor.height();
			var actorWidth = options.$actor.width();
			var options = $.extend(
				{
					topThreshold:(stageHeight/2) - (actorHeight/2),
				    leftThreshold:(stageWidth/2) - (actorWidth/2),
				    
				    topOffset:(stageHeight/2) - actorHeight/2,
				    leftOffset:(stageWidth/2) - (actorWidth/2)

				},
				options
			)
			options.$stage.css('position','relative')
			var i = 0;
			var direction = 1;
			setInterval(function(){
			    //options.threshold--;

			    updatePosition('leftIterator','leftDirection','leftThreshold','leftOffset','leftMultiplier','left');
			    updatePosition('topIterator','topDirection','topThreshold','topOffset','topMultiplier','top');
			    //options[multiplier]
			    function updatePosition(iterator,direction,threshold,offset,multiplier,cssProp){
			        
			        options[iterator] = options[iterator]+options[direction] * options[multiplier] * (Math.abs(options[iterator])+3.1)/options[threshold];
			        if(options[iterator] >= options[threshold] || options[iterator] <= -options[threshold]){
			            options[direction] = -options[direction];
			        }
			        var cssObj = {};
			        cssObj[cssProp] = (options[iterator]+options[offset])+'px'
			        options.$actor.css(cssObj)//.html(options[iterator]);
			    }
			},options.timeout)    
        };
		return bouncyball;
	}

	if (typeof exports === 'object') {
		// nodejs
		module.exports = makeBouncyballObject($,tools);
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jQuery'],function(){
			return makeBouncyballObject.apply(null,arguments);
		});
	} else if (typeof global.bouncyball === 'undefined') {
		// Browser: Make `Tweenable` globally accessible.
		global.bouncyball = makeBouncyballObject($,tools);
	}



})(this);