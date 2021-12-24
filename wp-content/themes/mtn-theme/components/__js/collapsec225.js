/*
 * Find the ancestor with the specified attribute name and property
 * If the element has it, return the element otherwise return the ancestor with it
 * If the element and ancestors don't have it, return null
 */
function elementOrAncestorWithAttribute(element, attrName, attrProp) {
  if (!element || element.length === 0) {
    return false;
  }
  var parent = element;
  do {
    if (parent === document) {
      break;
    }
    if (parent.getAttribute(attrName) === attrProp) {
      return parent;
    }
  } while ((parent = parent.parentNode));
  return null;
}

// Collapse the target
var collapseIt = function(selector, cmd) {
  var targets = Array.from(document.querySelectorAll(selector));
  targets.forEach(function(target) {
    target.classList[fnmap[cmd]]('show');
  });
};

// Handler that uses various data-* attributes to trigger specific actions, mimicing bootstraps attributes
var triggers = Array.from(document.querySelectorAll('[data-toggle="mtn-collapse"]'));

// Add an event listener to each trigger
for (var i = 0; i < triggers.length; i++) {
  triggers[i].addEventListener(
    'click',
    function(ev) {
      var elm = ev.target;
      var parentElm = elementOrAncestorWithAttribute(elm, 'data-toggle', 'mtn-collapse');
      if (parentElm) {
        var selector = parentElm.getAttribute('data-target');
        collapseIt(selector, 'toggle');
      }
    },
    false
  );
}

var fnmap = {
  toggle: 'toggle',
  show: 'add',
  hide: 'remove'
};

// accordian collapse
('use strict');
/**
 * @author Simon Davies
 * @version 0.1.0
 * @description Simple Vanilla JavaScript Accordion
 * https://github.com/simondavies/simple-js-accordion
 * @class
 * AccordionJS
 */

/**
 * Example usage
 *
 * <!-- Accordion wrapper -->
 * <div id="the-accordion" class="mtn-accordion">
 *
 *   <!-- accordion panel -->
 *   <div class="mtn-accordion__panel">
 *      <div class="mtn-accordion__title"><a href="#"><!-- Your Panel title/link copy here --></a></div>
 *      <div class="mtn-accordion__content">
 *        <!-- your panel content to go here-->
 *      </div>
 *    </div>
 *    <!-- eo:accordion panel -->
 *
 *    <!-- add as many accordion panels as required -->
 *
 * </div>
 * <!-- eo:Accordion wrapper -->
 *
 *  to call/init
 *      <script type="text/javascript">
 *      (function(){
 *          new AccordionJS();
 *          new AccordionJS('the-accordion-two');
 *      })();
 *     </script>
 *
 * The second option enables you to assign a different id value, so you can run two or more on one page
 */

(function(window) {
  var accordion = null,
    activePanelClass = 'is-active',
    accordionPanels = null,
    currentPanel = null;

  /**
   *  Contructor
   *
   * @param {containerID} to enable more than one accordion on a page
   */
  function AccordionJS(containerID) {
    var accordionContainer = containerID ? containerID : 'the-accordion';

    accordion = document.querySelector('#' + accordionContainer);

    if (accordion !== null) {
      accordionPanels = accordion.querySelectorAll('.mtn-accordion__panel');
      if (accordionPanels.length > 0) {
        _init();
      }
    }
  }

  /**
   * _init method
   */
  function _init() {
    currentPanel = _checkForActivePanelOnLoad();
    accordionPanels.forEach(function(panel) {
      panel.querySelector('.mtn-accordion--toggle').addEventListener('click', _activateSelectedPanel);
    });
  }

  /**
   * begin the activation process on selecting a panel
   * @param  {Event} evt
   * @return {Void}
   */
  function _activateSelectedPanel(evt) {
    evt.preventDefault();

    var selectedPanel = evt.currentTarget.parentElement.parentElement;

    if (currentPanel === selectedPanel) {
      _removeCurrentPanel();
      return;
    }

    _removeCurrentPanel();

    _displaySelectedPanel(selectedPanel);
  }

  /**
   * dispaly the new selected panel
   *
   * @param  {Object} selectedPanel the selected panel
   * @return {Void}
   */
  function _displaySelectedPanel(selectedPanel) {
    selectedPanel.classList.add(activePanelClass);
    currentPanel = selectedPanel;
  }

  /**
   * Remove the currently selected panel
   *
   * @return {self} to enable chaining
   */
  function _removeCurrentPanel() {
    if (typeof currentPanel === 'undefined') return this;
    currentPanel.classList.remove(activePanelClass);
    currentPanel = undefined;
  }
  /**
   * check to see if the user has enabled a panel on inital page load
   * @return {Object} set to the active panel if set
   */
  function _checkForActivePanelOnLoad() {
    for (var i = 0; i < accordionPanels.length; i++) {
      if (accordionPanels[i].classList.contains(activePanelClass)) {
        return accordionPanels[i];
      }
    }
  }

  //-- return the window object
  window.AccordionJS = AccordionJS;
})(window);
