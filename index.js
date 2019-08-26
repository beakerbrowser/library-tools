const SIMPLE_TYPES = {
  modules: 'unwalled.garden/module',
  people: 'unwalled.garden/person',
  templates: 'unwalled.garden/template',
  themes: 'unwalled.garden/theme',
  websites: undefined,
}

const SIMPLE_TYPES_P_TO_S = {
  modules: 'module',
  people: 'person',
  templates: 'template',
  themes: 'theme',
  websites: 'website'
}

const SIMPLE_TYPES_S_TO_P = Object.assign({}, ...Object.entries(SIMPLE_TYPES_P_TO_S).map(([a,b]) => ({ [b]: a })))

function getSimple (st, usePlural) {
  if (usePlural) return SIMPLE_TYPES_P_TO_S[st]
  return st
}

const typesToSimpleType =
exports.typesToSimpleType = function (types, usePlural = false) {
  types = Array.isArray(types) ? types : [types]
  if (types.includes('unwalled.garden/module')) return getSimple('modules', usePlural)
  if (types.includes('unwalled.garden/person')) return getSimple('people', usePlural)
  if (types.includes('unwalled.garden/template')) return getSimple('templates', usePlural)
  if (types.includes('unwalled.garden/theme')) return getSimple('themes', usePlural)
  return getSimple('websites', usePlural)
}

exports.getSimpleTypesArray = function (usePlural = false) {
  return Object.keys(SIMPLE_TYPES).map(st => getSimple(st, usePlural))
}

exports.getSimpleTypesMap = function (usePlural = false) {
  var map = {}
  for (let st in SIMPLE_TYPES) {
    map[getSimple(st)] = SIMPLE_TYPES[st]
  }
  return map
}

exports.simpleTypeToPlural = function (simpleType) {
  if (SIMPLE_TYPES_S_TO_P[simpleType]) return SIMPLE_TYPES_S_TO_P[simpleType]
  if (simpleType in SIMPLE_TYPES_P_TO_S) return simpleType
  return 'websites'
}

const simpleTypeToSingular =
exports.simpleTypeToSingular = function (simpleType) {
  if (SIMPLE_TYPES_P_TO_S[simpleType]) return SIMPLE_TYPES_P_TO_S[simpleType]
  if (simpleType in SIMPLE_TYPES_S_TO_P) return simpleType
  return 'website'
}

exports.getFAIcon = function (simpleType) {
  simpleType = simpleTypeToSingular(simpleType)
  if (simpleType === 'module') return 'fas fa-cube'
  if (simpleType === 'person') return 'far fa-user'
  if (simpleType === 'template') return 'fas fa-pencil-ruler'
  if (simpleType === 'theme') return 'fas fa-drafting-compass'
  return 'fas fa-sitemap'
}