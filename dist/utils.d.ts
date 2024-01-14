import { Config } from "./types";
/**
 * Merge a user config with the default config.
 */
export declare const mergeConfig: (dconfig: Config, config: Config) => any;
/**
 * Validate any passed-in config options and merge with CONFIG.
 */
export declare const validateConfig: (config: Config) => any;
