const CATEGORIES = {
  commands: 'unwalled.garden/command-package',
  modules: 'unwalled.garden/module',
  people: 'unwalled.garden/person',
  websites: 'unwalled.garden/website',
}

const CATEGORIES__P_TO_S = {
  commands: 'command',
  modules: 'module',
  people: 'person',
  websites: 'website'
}

const CATEGORIES__S_TO_P = Object.assign({}, ...Object.entries(CATEGORIES__P_TO_S).map(([a,b]) => ({ [b]: a })))

function getCat (st, usePlural) {
  if (usePlural) return CATEGORIES__S_TO_P[st] || st
  return CATEGORIES__P_TO_S[st] || st
}

exports.typeToCategory = function (type, usePlural = false) {
  type = Array.isArray(type) ? type[0] : type
  if (type === 'unwalled.garden/command-package') return getCat('commands', usePlural)
  if (type === 'unwalled.garden/module') return getCat('modules', usePlural)
  if (type === 'unwalled.garden/person') return getCat('people', usePlural)
  if (type === 'unwalled.garden/website') return getCat('websites', usePlural)
  return undefined
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
  return undefined
}

const categoryToSingular =
exports.categoryToSingular = function (category) {
  if (CATEGORIES__P_TO_S[category]) return CATEGORIES__P_TO_S[category]
  if (category in CATEGORIES__S_TO_P) return category
  return undefined
}

exports.getFAIcon = function (category) {
  category = categoryToSingular(category)
  if (category === 'command') return 'fas fa-terminal'
  if (category === 'module') return 'fas fa-cube'
  if (category === 'person') return 'far fa-user'
  if (category === 'website') return 'far fa-file-alt'
  return 'fas fa-archive'
}