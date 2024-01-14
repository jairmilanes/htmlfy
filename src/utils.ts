import { CONFIG } from './constants.js'
import {Config} from "./types";

/**
 * Generic utility which merges two objects.
 */
const mergeObjects = (current: any, updates: any) => {
  if (!current || !updates)
    throw new Error("Both 'current' and 'updates' must be passed-in to merge()")
  if (typeof current !== 'object' || typeof updates !== 'object' || Array.isArray(current) || Array.isArray(updates))
    throw new Error("Both 'current' and 'updates' must be passed-in as objects to merge()")

  let merged = { ...current }

  for (let key of Object.keys(updates)) {
    if (typeof updates[key] !== 'object') {
      merged[key] = updates[key]
    } else {
      /* key is an object, run mergeObjects again. */
      merged[key] = mergeObjects(merged[key] || {}, updates[key])
    }
  }

  return merged
}

/**
 * Merge a user config with the default config.
 */
export const mergeConfig = (dconfig: Config, config: Config) => {
  /**
   * We need to make a deep copy of `dconfig`,
   * otherwise we end up altering the original `CONFIG` because `dconfig` is a reference to it.
   */
  return mergeObjects(structuredClone(dconfig), config)
}

/**
 * Validate any passed-in config options and merge with CONFIG.
 */
export const validateConfig = (config: Config) => {
  if (typeof config !== 'object') throw 'Config must be an object.'

  const config_empty = !(config['tab_size'] || config['strict'])
  if (config_empty) return CONFIG

  let tab_size = config.tab_size

  if (tab_size) {
    if (typeof tab_size !== 'number') throw 'Tab size must be a number.'
    const safe = Number.isSafeInteger(tab_size)
    if (!safe) throw `Tab size ${tab_size} is not safe. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger for more info.`

    /** 
     * Round down, just in case a safe floating point,
     * like 4.0, was passed.
     */
    tab_size = Math.floor(tab_size)
    if (tab_size < 1 || tab_size > 16) throw 'Tab size out of range. Expecting 1 to 16.'
  
    config.tab_size = tab_size
  }

  if (config['strict'] && typeof config.strict !== 'boolean') throw 'Strict config must be a boolean.'

  return mergeConfig(CONFIG, config)

}
