"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = exports.mergeConfig = void 0;
const constants_js_1 = require("./constants.js");
/**
 * Generic utility which merges two objects.
 */
const mergeObjects = (current, updates) => {
    if (!current || !updates)
        throw new Error("Both 'current' and 'updates' must be passed-in to merge()");
    if (typeof current !== 'object' || typeof updates !== 'object' || Array.isArray(current) || Array.isArray(updates))
        throw new Error("Both 'current' and 'updates' must be passed-in as objects to merge()");
    let merged = Object.assign({}, current);
    for (let key of Object.keys(updates)) {
        if (typeof updates[key] !== 'object') {
            merged[key] = updates[key];
        }
        else {
            /* key is an object, run mergeObjects again. */
            merged[key] = mergeObjects(merged[key] || {}, updates[key]);
        }
    }
    return merged;
};
/**
 * Merge a user config with the default config.
 */
const mergeConfig = (dconfig, config) => {
    /**
     * We need to make a deep copy of `dconfig`,
     * otherwise we end up altering the original `CONFIG` because `dconfig` is a reference to it.
     */
    return mergeObjects(structuredClone(dconfig), config);
};
exports.mergeConfig = mergeConfig;
/**
 * Validate any passed-in config options and merge with CONFIG.
 */
const validateConfig = (config) => {
    if (typeof config !== 'object')
        throw 'Config must be an object.';
    const config_empty = !(config['tab_size'] || config['strict']);
    if (config_empty)
        return constants_js_1.CONFIG;
    let tab_size = config.tab_size;
    if (tab_size) {
        if (typeof tab_size !== 'number')
            throw 'Tab size must be a number.';
        const safe = Number.isSafeInteger(tab_size);
        if (!safe)
            throw `Tab size ${tab_size} is not safe. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger for more info.`;
        /**
         * Round down, just in case a safe floating point,
         * like 4.0, was passed.
         */
        tab_size = Math.floor(tab_size);
        if (tab_size < 1 || tab_size > 16)
            throw 'Tab size out of range. Expecting 1 to 16.';
        config.tab_size = tab_size;
    }
    if (config['strict'] && typeof config.strict !== 'boolean')
        throw 'Strict config must be a boolean.';
    return (0, exports.mergeConfig)(constants_js_1.CONFIG, config);
};
exports.validateConfig = validateConfig;
