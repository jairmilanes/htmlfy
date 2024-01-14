/**
 * Enforce entity characters for textarea content.
 * By default, this also does basic minification before setting entities.
 * For full minification, pass `minify_content` as `true`.
 *
 * @param {string} html
 * @param {boolean} [minify] Fully minifies the content of textarea elements.
 * Defaults to `false`. We recommend a value of `true` if you're running `entify()`
 * as a standalone function.
 * @returns {string}
 * @example <textarea>3 > 2</textarea> => <textarea>3 &gt; 2</textarea>
 */
export declare const entify: (html: string, minify?: boolean) => string;
