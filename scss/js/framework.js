/*!
 * Extra Selectors - Script fork do jQuery Browser Selector
 * Não depende do jQuery e é mais rápido!
 */
(function(){

	var userAgent = navigator.userAgent.toLowerCase(),
		html = document.getElementsByTagName('html')[0],
		os = /(mac|win|linux|freebsd|mobile|iphone|ipod|ipad|android|blackberry|j2me|webtv)/.exec(userAgent),
		ua = /(ie|firefox|chrome|safari|opera)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(userAgent);

	var addClass = function(name){
		html.className += ' ' + name;
	};

	addClass(os[1]);

	if( ua ){

		addClass(ua[1]);

		// Fix for Safari
		if(ua[1] == 'safari')
			addClass(ua[1] + '-' + ua[2].substring(0, 1));
		else
			addClass(ua[1] + '-' + parseInt(ua[2]));

		// IE conditional
		if(ua[1] == 'ie'){

			for(var ver = 3; ver < 10; ver++) {
				if(parseInt(ua[2]) < ver)
					addClass('lt-ie-' + ver);
			}

		}
	}

})();

/*!
 * jQuery Validate 1.2
 */
(function($){

	$.validate = [];

	/**
	 * Opções Padrões
	 * @type {Object}
	 */
	$.validate.defaults = {

		classError: 'error',
		selectDefaultValue: 0,

		redirect: true,

		inline: false,
		inlineEvent: 'focusout',

		onItemValidate: null,
		onItemError: null,

		onValidate: null,
		onError: null
	};

	/**
	 * Valida o formulário por completo
	 * @param {Object} $form
	 * @param {Object} options
	 * @return {boolean}
	 */
	$.validate.form = function($form, options){

		var result = true;

		if(!options)
			options = $form.data('validate');

		$form.find('[required]').each(function(){

			var itemResult = $.validate.item( $(this), options );
			result = result && itemResult;

		});

		return result;
	};

	/**
	 * Valida um item do formulário
	 * @param {Object} $item
	 * @param {Object} options
	 * @return {boolean}
	 */
	$.validate.item = function($item, options){

		var result = true;

		$item.removeClass(options.classError);

		/**
		 * Caso o item esteja desabilitado
		 * A validação retorn true, ou melhor dizendo, não valida
		 */
		if($item.is(':disabled'))
			return true;

		/**
		 * Callback Valida
		 */
		if( $.isFunction( options.onItemValidate ) ) {
			options.onItemValidate.apply( $item, new Array($item, options) );
		}

		/**
		 * Select
		 */
		if( $item.is('select') ){
			result = ( $item.val() && $item.val() != options.selectDefaultValue ) ? true : false;

		/**
		 * CheckBox/Radio
		 */
		}else if( $item.is(':checkbox') || $item.is(':radio') ){

			var inputName = $item.attr('name'),
				checked = $('input[name="' + inputName + '"]:checked').length;

			result = (checked == 0) ? false : true;

		/**
		 * Input
		 */
		}else{

			var regex,
				type = $item.data('type') || $item.attr('type');

			if(type){

				// E-mail
				if( type == 'email' ){
					regex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/);

				// Url
				}else if( type == 'url' ){
					regex = new RegExp(/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/);

				// Números
				}else if( type == 'number' ){
					regex = new RegExp(/(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)|(^-?\d*$)/);

				// Regex Personalizado
				}else if( $item.attr('pattern') ){
					regex = new RegExp( $item.attr('pattern') );
				}

			}

			/**
			 * Valida o campo
			 */
			if(regex)
				result = regex.test( $item.val() );
			else
				result = $.trim( $item.val() ) != '';

		}

		/**
		 * Se NÃO passar
		 */
		if( result == false ){

			$item.addClass( options.classError );

			/**
			 * Callback Erro
			 */
			if($.isFunction( options.onItemError )){
				options.onItemError.apply($item, new Array($item, options));
			}

		}

		return result;
	};

	/**
	 * Valida um formulário e retorna o resultado da validação
	 * @param {Object} options
	 */
	$.fn.validate = function(options){

		if( ! $(this).is('form') )
			return false;

		var options = $.extend( {}, $.validate.defaults, options );

		/**
		 * Força novalidate e acrescenta as opções ao formulário
		 */
		$(this).attr('novalidate', 'novalidate');
		$(this).data('validate', options);

		/**
		 * Submit
		 * > callbacks
		 */
		$(this).on('submit', function(){

			/**
			 * Validou
			 */
			if( $.validate.form( $(this), options ) ){

				if($.isFunction( options.onValidate )){
					options.onValidate.apply( this, new Array(this, options) );
				}

				return (options.redirect) ? true : false;

			/**
			 * Erro!
			 */
			}else{

				if($.isFunction( options.onError )){
					options.onError.apply( this, new Array(this, options) );
				}

				return false;
			}

		});

		/**
		 * Inline
		 */
		if(options.inline){

			$(this).find('[required]')
			.on( options.inlineEvent, function(){
				$.validate.item( $(this), options );
			});

		}

	};

})(jQuery);

/*!
 * Eventos jQuery
 */
$(function(){

	// Click scroll
	$('a')
	.filter(function(){
		return (this.hostname && this.hostname === location.hostname && this.hash) || this.hash;
	})
	.on('click', function(e){

		var target = String(this.href).replace(/(.*)\#/, '');

		if( !$('#' + target).length ){
			return window.location = this.href;
		}else if( !target ){
			return false;
		}

		// Faz a animação
		$('html, body').animate({
			scrollTop: $('#' + target).offset().top
		}, 600, function(){

			window.location.hash = target;

		});

		e.preventDefault();
		return false;
	});

	// Formulários
	$('form').validate({
		classError: 'error'
	});

	// Toolbar
	$('.toolbar .close').on('click', function(e){
		$(this).parent('.toolbar').remove();
		e.preventDefault();
	});

	// Navegação
	$('.navigation-icon').on('click', function(e){

		var UL = $(this).parent().find('ul');
		if( UL.is(':visible') ){
			UL.hide();
		}else{
			UL.show();
		}

		e.preventDefault();
	});

	// Bounce
	var hidden, state, visibilityChange;
	if( typeof document.hidden !== "undefined" ){
		hidden = "hidden";
		visibilityChange = "visibilitychange";
		state = "visibilityState";
	} else if( typeof document.mozHidden !== "undefined" ){
		hidden = "mozHidden";
		visibilityChange = "mozvisibilitychange";
		state = "mozVisibilityState";
	} else if( typeof document.msHidden !== "undefined" ){
		hidden = "msHidden";
		visibilityChange = "msvisibilitychange";
		state = "msVisibilityState";
	} else if( typeof document.webkitHidden !== "undefined" ){
		hidden = "webkitHidden";
		visibilityChange = "webkitvisibilitychange";
		state = "webkitVisibilityState";
	}

	$(document).on(visibilityChange, function(){

		var _state = document[state];

		if( _state != 'hidden' ){
			return;
		}

		if( $('.bounce').length ){
			$('.bounce').show();
			$('.bounce-background').show();
		}

	});

	$('.bounce .close').on('click', function(e){
		$(this).parents('.bounce').remove();
		$('.bounce-background').remove();
		e.preventDefault();
	});

});