const CATEGORIES = {
  modules: 'unwalled.garden/module',
  people: 'unwalled.garden/person',
  templates: 'unwalled.garden/template',
  themes: 'unwalled.garden/theme',
  websites: undefined,
}

const CATEGORIES__P_TO_S = {
  modules: 'module',
  people: 'person',
  templates: 'template',
  themes: 'theme',
  websites: 'website'
}

const CATEGORIES__S_TO_P = Object.assign({}, ...Object.entries(CATEGORIES__P_TO_S).map(([a,b]) => ({ [b]: a })))

function getCat (st, usePlural) {
  if (usePlural) return CATEGORIES__S_TO_P[st] || st
  return CATEGORIES__P_TO_S[st] || st
}

exports.typeToCategory = function (type, usePlural = false) {
  type = Array.isArray(type) ? type[0] : type
  if (type === 'unwalled.garden/module') return getCat('modules', usePlural)
  if (type === 'unwalled.garden/person') return getCat('people', usePlural)
  if (type === 'unwalled.garden/template') return getCat('templates', usePlural)
  if (type === 'unwalled.garden/theme') return getCat('themes', usePlural)
  return getCat('websites', usePlural)
}

exports.categoryToType = function (category) {
  category = categoryToPlural(category)
  return CATEGORIES[category]
}

exports.getCategoriesArray = function (usePlural = false) {
  return Object.keys(CATEGORIES).map(st => getCat(st, usePlural))
}

exports.getCategoriesMap = function (usePlural = false) {
  var map = {}
  for (let st in CATEGORIES) {
    map[getCat(st, usePlural)] = CATEGORIES[st]
  }
  return map
}

const categoryToPlural =
exports.categoryToPlural = function (category) {
  if (CATEGORIES__S_TO_P[category]) return CATEGORIES__S_TO_P[category]
  if (category in CATEGORIES__P_TO_S) return category
  return 'websites'
}

const categoryToSingular =
exports.categoryToSingular = function (category) {
  if (CATEGORIES__P_TO_S[category]) return CATEGORIES__P_TO_S[category]
  if (category in CATEGORIES__S_TO_P) return category
  return 'website'
}

exports.getFAIcon = function (category) {
  category = categoryToSingular(category)
  if (category === 'module') return 'fas fa-cube'
  if (category === 'person') return 'far fa-user'
  if (category === 'template') return 'fas fa-pencil-ruler'
  if (category === 'theme') return 'fas fa-drafting-compass'
  return 'fas fa-sitemap'
}