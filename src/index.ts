/**
 * preact-media-hook
 *
 * Copyright (c) 2021 Marvin Schopf
 * Copyright (c) 2020 Ilya Lesik
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @copyright 2021 Marvin Schopf
 * @license MIT
 *
 */

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
