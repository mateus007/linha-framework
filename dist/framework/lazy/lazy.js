document.addEventListener("DOMContentLoaded",function(){var active=!1,elements=Array.from(document.querySelectorAll("[loading]"));function updateElement(element){element.dataset.src&&(element.src=element.dataset.src),element.dataset.srcset&&(element.srcset=element.dataset.srcset),element.dataset.sizes&&(element.sizes=element.dataset.sizes),element.classList.remove("lazy")}function loadElement(child){updateElement(child);child=child.parentElement.querySelectorAll("source");(child=[].slice.call(child)).length&&child.forEach(function(childElement){updateElement(childElement)})}function processElements(){0!==elements.length&&elements.forEach(function(element){!function(element){return element.getBoundingClientRect().top<=window.innerHeight&&0<=element.getBoundingClientRect().bottom&&"none"!==getComputedStyle(element).display}(element)||(loadElement(element),elements=elements.filter(function(theElement){return element!==theElement}))})}function lazyLoad(){active||(active=!0,window.setTimeout(function(){processElements(),0===elements.length&&(document.removeEventListener("scroll",lazyLoad),window.removeEventListener("resize",lazyLoad),window.removeEventListener("orientationchange",lazyLoad)),active=!1},200))}"loading"in HTMLImageElement.prototype?elements.forEach(loadElement):(document.addEventListener("scroll",lazyLoad),window.addEventListener("resize",lazyLoad),window.addEventListener("orientationchange",lazyLoad),lazyLoad())});
//# sourceMappingURL=lazy.js.map