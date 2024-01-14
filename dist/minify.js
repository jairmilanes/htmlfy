"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minify = void 0;
const entify_js_1 = require("./entify.js");
/**
 * Creates a single-line HTML string
 * by removing line returns, tabs, and relevant spaces.
 *
 * @param {string} html
 * @returns A minified HTML string.
 */
const minify = (html) => {
    /**
     * Ensure textarea content is specially minified and protected
     * before general minification.
     */
    html = (0, entify_js_1.entify)(html);
    /* All other minification. */
    return html
        .replace(/\n|\t/g, '')
        .replace(/[a-z]+="\s*"/ig, '')
        .replace(/>\s+</g, '><')
        .replace(/\s+/g, ' ')
        .replace(/\s>/g, '>')
        .replace(/<\s\//g, '</')
        .replace(/>\s/g, '>')
        .replace(/\s</g, '<')
        .replace(/class=["']\s/g, (match) => match.replace(/\s/g, ''))
        .replace(/(class=.*)\s(["'])/g, '$1' + '$2');
};
exports.minify = minify;
