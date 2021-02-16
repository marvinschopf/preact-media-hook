import { useState, useCallback, useEffect } from "preact/hooks";
import { h, render } from "preact";

function fallbackMatchMedia(query: string) {
	if (typeof matchMedia !== "function") {
		return null;
	}
	return matchMedia(query);
}

function omitMatchMediaResult(matchMediaResult: MediaQueryList) {
	if (!matchMediaResult) {
		return null;
	}
	return { media: matchMediaResult.media, matches: matchMediaResult.matches };
}

export function useMedia(query: string) {
	var result = useState(function () {
		return omitMatchMediaResult(fallbackMatchMedia(query));
	});
	var setResult = result[1];

	var callback = useCallback(
		function (matchMediaResult) {
			return setResult(omitMatchMediaResult(matchMediaResult));
		},
		[setResult]
	);

	useEffect(
		function () {
			var matchMediaResult = fallbackMatchMedia(query);
			callback(matchMediaResult);
			matchMediaResult.addListener(callback);
			return function () {
				return matchMediaResult.removeListener(callback);
			};
		},
		[callback, query]
	);

	return result[0];
}

export function useMediaPredicate(query: string): boolean {
	var result = useMedia(query);
	return (result && result.matches) || false;
}
