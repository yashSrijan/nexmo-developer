/**
 * Copyright (c) 2001-present, Vonage.
 *	
 * Menu (requires core)
 */

'use strict';

Volta.menu = function () {	
	var _class = {
		mobile: 'Vlt-sidenav__mobile',
		mobileOpen: 'Vlt-body--mobile-menu-open',
		mobileTrigger: 'Vlt-sidenav__mobile-trigger',
		link: 'Vlt-sidemenu__link',
		linkActive: 'Vlt-sidemenu__link_active',
		sideMenu: 'Vlt-sidemenu',
		sideTabs: 'Vlt-sidetabs',
		sideTabsLink: 'Vlt-sidetabs__link',
		sideTabsTrigger: 'Vlt-sidetabs__trigger',
		trigger: 'Vlt-sidemenu__trigger',
		triggerActive: 'Vlt-sidemenu__trigger_active',
		triggerCurrent: 'Vlt-sidemenu__trigger_current',
		triggerEnabled: '.Vlt-tabs__link:not(.Vlt-tabs__link_disabled)',
		visible: 'Vlt-sidenav_visible'
	}

	var _id = {
		menu: '#Vlt-sidenav',
		mobileTrigger: '#Vlt-sidenav-mobile-trigger'
	}

	var menu;

	var expandedMenus = [],
		mobileMenuTriggeredTwice;

	return {
		_class: _class,
		_element: undefined,

		closeAll: removeAllMenuItemsFromSelectedArr,
		init: initialise,
		expand: expandActiveMenu,
		showCollapsed: expandMenu,
		_triggerHandler: attachTriggerHandlers
	}

	/**   
	 *	@private
	 *	
	 *	@description Adds the parents of the active menu to the exoanded menus array
	 *	@param {HTMLElement} element The active menu 
	 */
	function addExpandedParentMenuToArr(element){
		var nestedMenuUl = Volta._closest(element, 'ul', '.' + _class.sideMenu);
		var nestedMenuTrigger = nestedMenuUl.previousElementSibling;

		if(nestedMenuTrigger) {
			if(!Volta._hasClass(nestedMenuTrigger, _class.triggerActive)) {
				nestedMenuTrigger.classList.add(_class.triggerActive);
			}

			expandedMenus.push(nestedMenuTrigger);
			addExpandedParentMenuToArr(nestedMenuTrigger);
		}
	}

	/**   
	 *	@private
	 *	
	 *	@description Attach the listener for the mobile menu trigger
	 */
	function attachMobileTriggerHandler() {
		var mobileMenuTrigger = document.querySelector(_id.mobileTrigger);

		if(mobileMenuTrigger) {
			mobileMenuTrigger.addEventListener('click', function(e){
				if(mobileMenuTriggeredTwice) {
					mobileMenuTriggeredTwice = false;
					e.stopPropagation();
					return;
				}
				if(!Volta._hasClass(menu, _class.visible)) {
					menu.classList.add(_class.visible);
					document.body.classList.add(_class.mobileOpen);

					//stop propagation otherwise will immediately call handler
					e.stopPropagation();
					addMobileMenuCollapseListeners();
				}
			});
		}
	}

	/**   
	 *	@private
	 *	
	 *	@description Attach the listeners for closing the expanded mobile menu
	 */
	function addMobileMenuCollapseListeners() {
		document.querySelector('body').addEventListener('click', closeMenu, { once: true });
		document.querySelector('body').addEventListener('touchstart', closeMenu, { once: true });
	}

	/**   
	 *	@public
	 *	
	 *	@description Attach the listeners to the trigger elements of the menu
	 */
	function attachTriggerHandlers() {
		attachMobileTriggerHandler();
		menu.querySelectorAll('.' + _class.trigger).forEach(attachHandler);
		
		function attachHandler(triggerElem) {
			triggerElem.addEventListener('click', expandMenu);
		}
	}

	/**   
	 *	@private
	 *	
	 *	@description Attach the listeners to the trigger elements of the menu
	 * 	@param {HTMLElement} menuItem 
	 *	@return {boolean} If the menu item is nested returns true, otherwise false
	 */
	function checkMenuItemIsNested(menuItem) {
		var isNested = false;
		var grandSibling = menuItem.parentElement.parentElement.previousElementSibling;

		if(!grandSibling) {
			isNested = false;
		} else {
			isNested = Volta._hasClass(grandSibling, _class.trigger);
		}

		return isNested;
	}

	/**   
	 *	@private
	 *	
	 *	@description Attach the listeners to the trigger elements of the menu
	 * 	@param {HTMLElement} menuItem 
	 *	@return {boolean} If the menu item is nested returns true, otherwise false
	 */
	function closeMenu(e) {
		var isSideMenuChild = Volta._closest(e.target, '.' + _class.sideMenu);
		if(!Volta._hasClass(e.target, _class.sideMenu) && !isSideMenuChild) {
			menu.classList.remove(_class.visible);

			document.body.classList.remove(_class.mobileOpen);

			var isMobileMenu = Volta._closest(e.target, '.' + _class.mobile);
			if(Volta._hasClass(e.target, _class.mobileTrigger) || isMobileMenu) {
				mobileMenuTriggeredTwice = true;
			}
		} else {		
			addMobileMenuCollapseListeners();	
		}
	}

	/**   
	 *	@private
	 *	
	 *	@description Expand the nested menu
	 * 	@param {event} e 
	 */
	function expandMenu(e) {
		e.preventDefault();
		e.stopPropagation();
		
		var _this = this;

		var isNestedMenu = checkMenuItemIsNested(_this);
		
		if (expandedMenus.indexOf(_this) >= 0 && isNestedMenu) {
			removeMenuFromSelectedArr(_this);
		} else if(expandedMenus.indexOf(_this) >= 0) {
			removeAllMenuItemsFromSelectedArr();
		} else {
			if(!isNestedMenu) {
				removeAllMenuItemsFromSelectedArr();
			}
			expandedMenus.push(_this);
			_this.classList.add(_class.triggerActive);
		}

		if(Volta.menuCollapse) {
			Volta.menuCollapse.attachCloseHandler(expandedMenus);
		}	
	}

	/**   
	 *	@public
	 *	
	 *	@description Expand the active menu - typically used on page load
	 * 	@param {boolean} isUserForced Whether the action has been trigger by the user
	 */
	function expandActiveMenu(isUserForced) {			
		var activeMenuItem = menu.querySelector('.' + _class.linkActive);
	
		if(activeMenuItem) {
			var activeTriggerUl = Volta._closest(activeMenuItem, 'ul', '.' + _class.sideMenu);
			var activeTrigger = activeTriggerUl.previousElementSibling;
			
			if(activeTrigger) {
				if(!Volta._hasClass(activeTrigger, _class.triggerActive)) {
					activeTrigger.classList.add(_class.triggerActive, _class.triggerCurrent);
				}
				
				var isNestedMenu = checkMenuItemIsNested(activeTrigger);
				if(isNestedMenu) {
					addExpandedParentMenuToArr(activeTrigger);
				}

				expandedMenus.push(activeTrigger);
			}
		}
	}

	/**   
	 *	@public
	 *	
	 *	@description Initialise the menu
	 * 	@param {boolean} menuCollapse Whether the collapse module has been included
	 */
	function initialise(menuCollapse) {
		expandedMenus = [];
		menu = document.querySelector(_id.menu);
		Volta.menu._element = menu;

		if(menu) {
			if(!Volta.menuCollapse) {
				expandActiveMenu();
			} else if(menuCollapse) {
				Volta.menuCollapse.init();
			}

			attachTriggerHandlers();
		}
	}

	/**   
	 *	@public
	 *	
	 *	@description Clear the selected menus array, and close all of the nested menus
	 */
	function removeAllMenuItemsFromSelectedArr(){
		expandedMenus.forEach(function(menuItem){
			menuItem.classList.remove(_class.triggerActive);
		});
		expandedMenus = [];
	}

	/**   
	 *	@private
	 *	
	 *	@description Remove a specific menu item from the selected array and close
	 */
	function removeMenuFromSelectedArr(menuItem) {
		var menuIndex = expandedMenus.indexOf(menuItem);
		menuItem.classList.remove(_class.triggerActive);
		expandedMenus.splice(menuIndex, 1);
	}
}();