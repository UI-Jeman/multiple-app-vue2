export const getType = val => Object.prototype.toString.call(val).slice(8, -1).toLowerCase()

export const isString = val => getType(val) === 'string'

export const isBoolean = val => getType(val) === 'boolean'

export const isNumber = val => getType(val) === 'number'

export const isNull = val => getType(val) === 'null'

export const isUndefined = val => getType(val) === 'undefined'

export const isFunction = val => getType(val) === 'function'

export const isObject = val => getType(val) === 'object'
