# @beaker/library-tools

Utility library to manage Beaker's library of dats.

## Library folder and library.json

Beaker manages a `/library` folder in the user's private hyperdrive that contains mounts to all saved dats. The archives are sorted into folders according to their "Primary Type" (see `getPrimaryType()`). An example folder hierarchy:

```
/library/modules
/library/people
/library/templates
/library/themes
/library/websites
/library/library.json
```

The `library.json` file is the primary record of the "saved dats." It lists saved dats along with additional configuration. Here is an example:

```json
{
  "type": "beakerbrowser.com/library",
  "dats": [
    {
      "key": "9892414902579ba93ae62e63d5041b69b137f2aa9e86a4e2bc1bcef70ab6d569",
      "isHosting": true,
      "visibility": "public",
      "savedAt": "2019-08-26T15:02:03.623Z"
    },
    {
      "key": "206bf21c61a8c65e3fb1463d6d9b8231dc2726e795009139747a9152f47bb8f7",
      "isHosting": true,
      "visibility": "unlisted",
      "savedAt": "2019-08-26T15:02:03.623Z"
    }
  ]
}
```

The json-schema for library.json [can be found here](./library.json).

## "Categories"

Dat archives provide a `type` field in their manifests. The "category" is a shortname mapping to those full types.

If multiple types are set on a dat, the first known type is used to determine the category.

The "website" category is catchall for dats with an unknown type.

## API

### `typeToCategory(type, usePlural=false)`

Provides the category for a given manifest's full type value.

```js
libTools.typeToCategory('unwalled.garden/person', false)
// => 'person'
libTools.typeToCategory('unwalled.garden/person', true)
// => 'people'
```

### `categoryToType(category)`

Provides the full type for a given category. Can use the plural or singular.

```js
libTools.categoryToType('person')
// => 'unwalled.garden/person'
libTools.categoryToType('people')
// => 'unwalled.garden/person'
```

### `getCategoriesArray(usePlural=false)`

Gives an array of the categories.

```js
libTools.getCategoriesArray(false)
// => ['module', 'person', 'template', 'website']
libTools.getCategoriesArray(true)
// => ['modules', 'people', 'templates', 'websites']
```

### `getCategoriesMap(usePlural=false)`

Gives a map of the categories to their fully-qualified types.

```js
libTools.getCategoriesMap(false)
/* => {
  module: 'unwalled.garden/module',
  person: 'unwalled.garden/person',
  template: 'unwalled.garden/template',
  website: undefined
} */
libTools.getCategoriesMap(true)
/* => {
  modules: 'unwalled.garden/module',
  people: 'unwalled.garden/person',
  templates: 'unwalled.garden/template',
  websites: undefined
} */
```

### `categoryToPlural(category)`

Convert a category to its plural.

```js
libTools.categoryToPlural('person')
// => 'people'
```

### `categoryToSingular(category)`

Convert a category to its singular.

```js
libTools.categoryToSingular('people')
// => 'person'
```

### `getFAIcon(category)`

Gets the Font Awesome icon for a given category.

```js
libTools.getFAIcon('module')
// => 'fas fa-cube'
libTools.getFAIcon('person')
// => 'far fa-user'
libTools.getFAIcon('template')
// => 'fas fa-pencil-ruler'
libTools.getFAIcon('theme')
// => 'fas fa-drafting-compass'
```