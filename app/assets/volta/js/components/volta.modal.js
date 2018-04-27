/**
 * Copyright (c) 2001-present, Vonage.
 *	
 * Modals (requires core)
 */

'use strict';

Volta.modal = function () {
	var _class = {
		auto: 'Vlt-modal--auto',
		cancel: 'Vlt-modal__cancel',
		confirm: 'Vlt-modal__confirm',
		modal: 'Vlt-modal',
		out: 'Vlt-modal--out',
		panel: 'Vlt-modal__panel',
		trigger: 'Vlt-modal-trigger',
		visible: 'Vlt-modal_visible',
		dismiss: 'Vlt-modal__dismiss',
	}

	var dismissModalHandler, 
		cancelModalHandler,
		confirmModalHandler,
		escHandler,
		clickHandler;

	function Modal() {}

	Modal.prototype = {
		attachButtons: function() {
			var _this = this;
			_this.dismissBtn = _this.modal.querySelector('.' + _class.dismiss);
		     
		    if(_this.dismissBtn) {
		    	dismissModalHandler = dismissModal.bind(_this);
		    	_this.dismissBtn.addEventListener('click', dismissModalHandler);
		    }
		    
		    _this.cancelBtn = _this.modal.querySelector('.' + _class.cancel);
		    
		    if(_this.cancelBtn) {
	    		cancelModalHandler = cancelModal.bind(_this);
		    	_this.cancelBtn.addEventListener('click', cancelModalHandler);
		    }
		    
		    _this.confirmBtn = _this.modal.querySelector('.' + _class.confirm);
		    
		    if(_this.confirmBtn) {
		    	confirmModalHandler = confirmModal.bind(_this);
		    	_this.confirmBtn.addEventListener('click', confirmModalHandler);
		    }
		},
		html: function(newHtml) {
			this.modal.innerHTML = newHtml;
			return this;
		},
		init: function(elementOrId) {
			if(elementOrId.length) {
				this.modal = document.querySelector('#' + elementOrId);
			} else {
				this.modal = elementOrId;
			}

			this._callback = Volta._getFunction(this.modal.dataset.callback);
		},
		open: function(e) {
		    if(e && e.preventDefault) {
		        e.preventDefault();
		    	e.stopPropagation();
		    }
			
		    this.modal.classList.remove(_class.out);
		    this.modal.classList.add(_class.visible);
		    this.attachButtons();	

		    if(!this.modal.dataset.disableEsc || this.modal.dataset.disableEsc === "false") {
		    	escHandler = closeModalOnEscape.bind(this);
		   		document.querySelector('body').addEventListener('keyup', escHandler);
		    }

		    if(!this.modal.dataset.disableClick || this.modal.dataset.disableClick === "false") {
		    	clickHandler = closeModalOnClick.bind(this);
		   		document.querySelector('body').addEventListener('click', clickHandler);
		    }	    		    
		},
		dismiss: function(e, confirmed) {
			var _this = this;

			if(e && e.preventDefault) {
		    	e.preventDefault();
		    	e.stopPropagation();
			}

			_this.modal.classList.remove(_class.visible);
			_this.modal.classList.add(_class.out);
			
			if(_this._callback) {
				_this._callback(confirmed);
			}
			
			removeModal(_this);
		}
	}
	
	return {
		create: create,
		init: attachModalHandlers
	}

	/**   
	 *	@public
	 *	
	 *	@description Attach a click listener to each modals trigger on the screen, which will open the modal
	 */
	function attachModalHandlers() {
		var triggers = document.querySelectorAll('.' + _class.trigger);

		if(triggers.length > 0) {
			triggers.forEach(attachTriggerHandler);
		}

		//Not the recommended way to use modals
		var modals = document.querySelectorAll('.' + _class.modal);

		if(modals.length > 0) {
			modals.forEach(attachModalHandler);
		}
		
		function attachModalHandler(modal) {
			if(Volta._hasClass(modal, _class.auto)) {
				var trigger = document.querySelector('#' + modal.dataset.trigger);
				trigger.addEventListener('click', function() {
					create(modal).open();
				});
			}
		}

		function attachTriggerHandler(trigger) {
			if(trigger.dataset.modal) {
				var modal = document.querySelector('#' + trigger.dataset.modal);

				if(!modal) {
					console.warn('Volta: modal ' + trigger.dataset.modal + ' cannot be found');
				}

				trigger.addEventListener('click', function() {
					create(modal).open();
				});
			} 
		}
	}
    
    /**   
	 *	@private
	 *	
	 *	@description Close the modal, triggered by cancel button, passes false to callback function
	 *  @param {event} e 
	 */
    function cancelModal(e) {
		return this.dismiss(e, false);
	}
	
	/**   
	 *	@private
	 *	
	 *	@description Close the modal, triggered by confirm button, passes true to callback function
	 *  @param {event} e 
	 */
    function confirmModal(e) {
		return this.dismiss(e, true);
	}
    
    /**   
	 *	@private
	 *	
	 *	@description Close the modal, triggered by 'x' button, passes false to callback function
	 *  @param {event} e 
	 */
    function dismissModal(e) {
		return this.dismiss(e, false); 	
    }

    /**	@private
	 *	
	 *	@description Close the modal, triggered by 'esc' key, passes false to callback function
	 *  @param {event} e 
	 */
    function closeModalOnEscape(e){
    	if(e && e.keyCode === 27) {
    		this.dismiss(e, false);
    	}
    }


    /**	@private
	 *	
	 *	@description Close the modal, triggered by 'body click, passes false to callback function
	 *  @param {event} e 
	 */
    function closeModalOnClick(e){
    	if(!Volta._hasClass(e.target, _class.trigger) && !Volta._closest(e.target, '.' + _class.panel, '.' + _class.panel)) {
    		this.dismiss(e, false);
    	} 
    }
    
    /**   
	 *	@public
	 *	
	 *	@description Create the modal object
	 *  @param {HTMLElement|string} elementOrId Reference to the modal element or the id
	 *. @return {Object} A modal object
	 */
    function create(elementOrId) {
		var modal = Object.create(Modal.prototype, {})
		modal.init(elementOrId);
		return modal;
    }
  	
  	/**   
	 *	@private
	 *	
	 *	@description Remove the modal after dismiss, makes sure to delete the modal properties so it can be garbage collected, and removes event listeners
	 *  @param {HTMLElement|string} elementOrId Reference to the modal element or the id
	 */
	function removeModal(modal) {
		delete modal.modal;
		
		if(modal.dismissBtn) {
			modal.dismissBtn.removeEventListener('click', dismissModalHandler);
		}
		
		if(modal.cancelBtn) {
			modal.cancelBtn.removeEventListener('click', cancelModalHandler);
		}
		
		if(modal.confirmBtn) {
			modal.confirmBtn.removeEventListener('click', confirmModalHandler);
		}

		if(clickHandler) {
   			document.querySelector('body').removeEventListener('click', clickHandler);
    	}

    	if(escHandler) {
    		document.querySelector('body').removeEventListener('keyup', escHandler);
    	}		
	}
}();