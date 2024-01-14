"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettify = void 0;
const closify_js_1 = require("./closify.js");
const minify_js_1 = require("./minify.js");
const utils_js_1 = require("./utils.js");
const constants_js_1 = require("./constants.js");
let strict;
const convert = {
    line: []
};
/**
 * Isolate tags, content, and comments.
 */
const enqueue = (html) => {
    convert.line = [];
    let i = -1;
    html = html.replace(/<[^>]*>/g, (match) => {
        convert.line.push(match);
        i++;
        return `\n[#-# : ${i} : ${match} : #-#]\n`;
    });
    return html;
};
/**
 * Preprocess the HTML.
 */
const preprocess = (html) => {
    html = (0, closify_js_1.closify)(html);
    html = (0, minify_js_1.minify)(html);
    html = enqueue(html);
    return html;
};
const process = (html, step) => {
    /* Track current number of indentations needed. */
    let indents = '';
    /* Process lines and indent. */
    convert.line.forEach((source, index) => {
        html = html
            .replace(/\n+/g, '\n') /* Replace consecutive line returns with singles. */
            .replace(`[#-# : ${index} : ${source} : #-#]`, (match) => {
            let subtrahend = 0;
            const prevLine = `[#-# : ${index - 1} : ${convert.line[index - 1]} : #-#]`;
            /**
             * Arbitratry character, to keep track of the string's length.
             */
            indents += '0';
            if (index === 0)
                subtrahend++;
            /* We're processing a closing tag. */
            if (match.indexOf(`#-# : ${index} : </`) > -1)
                subtrahend++;
            /* prevLine is a doctype declaration. */
            if (prevLine.indexOf('<!doctype') > -1)
                subtrahend++;
            /* prevLine is a comment. */
            if (prevLine.indexOf('<!--') > -1)
                subtrahend++;
            /* prevLine is a self-closing tag. */
            if (prevLine.indexOf('/> : #-#') > -1)
                subtrahend++;
            /* prevLine is a closing tag. */
            if (prevLine.indexOf(`#-# : ${index - 1} : </`) > -1)
                subtrahend++;
            /* Determine offset for line indentation. */
            const offset = indents.length - subtrahend;
            /* Adjust for the next round. */
            indents = indents.substring(0, offset);
            /* Remove comment. */
            if (strict && match.indexOf('<!--') > -1)
                return '';
            /* Remove the prefix and suffix, leaving the content. */
            const result = match
                .replace(`[#-# : ${index} : `, '')
                .replace(' : #-#]', '');
            /* Pad the string with spaces and return. */
            return result.toString().padStart(result.length + (step * offset));
        });
    });
    /* Remove line returns, tabs, and consecutive spaces within html elements or their content. */
    html = html.replace(/>[^<]*?[^><\/\s][^<]*?<\/|>\s+[^><\s]|<script[^>]*>\s+<\/script>|<(\w+)>\s+<\/(\w+)|<([\w\-]+)[^>]*[^\/]>\s+<\/([\w\-]+)>/g, match => match.replace(/\n|\t|\s{2,}/g, ''));
    /* Remove self-closing nature of void elements. */
    if (strict)
        html = html.replace(/\s\/>/g, '>');
    return html.substring(1, html.length - 1);
};
/**
 * Format HTML with line returns and indentations.
 */
const prettify = (html, config) => {
    const validated_config = config ? (0, utils_js_1.validateConfig)(config) : constants_js_1.CONFIG;
    strict = validated_config.strict;
    html = preprocess(html);
    html = process(html, validated_config.tab_size);
    return html;
};
exports.prettify = prettify;
