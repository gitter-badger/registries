(function(angular) {
	'use strict';

	angular.module('xpsui:directives')
	.directive('xpsuiDefaultSrc', ['xpsui:logging', function (log) {
		return {
			restrict: 'A',
			link: function(scope, elm, attrs) {
				if (attrs.ngSrc) {
					// ngSrc is set so lets watch its expression and set default src if ngSrc value is empty
					// TODO handle attribute change by $observe
					scope.$watch(function() {
						return attrs.ngSrc;
					}, function(newVal) {
						console.log(newVal + attrs.ngSrc);
						if (newVal === null || newVal.length < 1) {
							// src is not set, lets use default src
							elm.attr('src', attrs.xpsuiDefaultSrc);
						}
					});
				} else {
					elm.attr('src', attrs.xpsuiDefaultSrc);
				}

				// handle 404 and other error states by default inmage
				elm.bind('error', function() {
					elm.attr('src', attrs.xpsuiDefaultSrc);
				});
			}
		};
	}]);

}(window.angular));