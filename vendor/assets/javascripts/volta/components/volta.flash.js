/**
 * Copyright (c) 2001-present, Vonage.
 *	
 * Tabs (requires core)
 */

'use strict';

Volta.flash = function () {	
	var _class = {
		flash: 'Vlt-flash',
		trigger: 'Vlt-flash-trigger',
		visible: 'Vlt-flash_visible'
	}

	var gap = 20,
		openBottomFlashes = [],
		openTopFlashes = [];

	return {
		init: attachFlashHandlers,
		show: show
	}

	/**   
	 *	@public
	 *	
	 *	@description Attach a click listener to each flash's trigger on the screen
	 *  @param {HTMLElement} element 
	 */
	function attachFlashHandlers() {
		var triggers = document.querySelectorAll('.' + _class.trigger);

		if(triggers.length === 0) {
			return;
		}

		triggers.forEach(attachHandler);
		
		function attachHandler(trigger) {
			trigger.addEventListener('click', function() {
				if(trigger.dataset.flash) {
					var flash = document.querySelector('#' + trigger.dataset.flash);
					show(flash);
				} else {
					console.warn("Volta: flash trigger is missing data-flash attribute");
				}				
			});
		}
	}

	/**   
	 *	@public
	 *	
	 *	@description Show the flash
	 *  @param {HTMLElement} element 
	 */
	function show(elementOrId, time) {
		if(!elementOrId || elementOrId.length == 0) {
			return;
		}
		
		time = time || 5000;

		var element = !elementOrId.classList ? document.querySelector('#' + elementOrId) : elementOrId;
		var position = Volta._hasClass(element, 'Vlt-flash--bottom') ? 'bottom' : 'top';
		var arr = position === 'bottom' ? openBottomFlashes : openTopFlashes;

		if(arr.indexOf(element) !== -1) {
			return;
		}
		
		_setFlashPosition(arr, element, position);

		arr.push(element);
				
		element.classList.add(_class.visible);
		
		setTimeout(function(){
			_hide(element);
		}, time);
	}

	/**   
	 *	@private
	 *	@description Hide the flash
	 *  @param {HTMLElement} element 
	 */
	function _hide(element) {
		var position = Volta._hasClass(element, 'Vlt-flash--bottom') ? 'bottom' : 'top';
		var arr = position === 'bottom' ? openBottomFlashes : openTopFlashes;
		var index = arr.indexOf(element);
		
		arr.splice(index, 1);

		_updateFlashPositions(arr, element, position);

		element.style[position] = '';
		element.classList.remove(_class.visible);
	}

	/**   
	 *	@private
	 *	@description Set the position of the flash
	 *  @param {HTMLElement} element 
	 */
	function _setFlashPosition(arr, element, position) {
		var positionPx = arr.reduce(function(px, flash) {
			return px + flash.clientHeight;				
		}, 0);
		if(positionPx > 0) {
			element.style[position] = (gap * arr.length) + gap + positionPx + 'px';
		}
	}

	/**   
	 *	@private
	 *	@description Update the position of all the visible flashes
	 *  @param {Array} arr
	 *  @param {HTMLElement} element 
	 *  @param {string} position 
	 */
	function _updateFlashPositions(arr, element, position){
		if(arr.length > 0) {
			var elementHeight = element.clientHeight;

			arr.forEach(function(flash) {
				var newPosition;

				if(position === 'bottom') {
					newPosition = Number(flash.style.bottom.substring(0, flash.style.bottom.length - 2));
				} else {
					newPosition = flash.getBoundingClientRect()[position];				
				}
				flash.style[position] = newPosition -elementHeight - gap + "px";		
			});
		}
	}
}();