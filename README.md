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
      "createdAt": "2019-08-26T15:02:03.623Z"
    },
    {
      "key": "206bf21c61a8c65e3fb1463d6d9b8231dc2726e795009139747a9152f47bb8f7",
      "isHosting": true,
      "visibility": "unlisted",
      "createdAt": "2019-08-26T15:02:03.623Z"
    }
  ]
}
```

The json-schema for library.json [can be found here](./library.json).

## "Simple Types"

Dat archives provide a `"type"` field in their manifests. The "simple type" is a shortname mapping to those full types.

If multiple types are set on a dat, the first known type is used to determine the simple type.

The "website" simple type is catchall for dats with an unknown type.

## API

### `typesToSimpleType(types, usePlural=false)`

Provides the "simple type" for a given manifest's full type value.

```js
libTools.typesToSimpleType(['unwalled.garden/person'], false)
// => 'person'
libTools.typesToSimpleType(['unwalled.garden/person'], true)
// => 'people'
```

### `getSimpleTypesArray(usePlural=false)`

Gives an array of the simple types.

```js
libTools.getSimpleTypesArray(false)
// => ['module', 'person', 'template', 'website']
libTools.getSimpleTypesArray(true)
// => ['modules', 'people', 'templates', 'websites']
```

### `getSimpleTypesMap(usePlural=false)`

Gives a map of the simple types to their fully-qualified types.

```js
libTools.getSimpleTypesMap(false)
/* => {
  module: 'unwalled.garden/module',
  person: 'unwalled.garden/person',
  template: 'unwalled.garden/template',
  website: undefined
} */
libTools.getSimpleTypesMap(true)
/* => {
  modules: 'unwalled.garden/module',
  people: 'unwalled.garden/person',
  templates: 'unwalled.garden/template',
  websites: undefined
} */
```

### `simpleTypeToPlural(simpleType)`

Convert a simple type to its plural.

```js
libTools.simpleTypeToPlural('person')
// => 'people'
```

### `simpleTypeToSingular(simpleType)`

Convert a simple type to its singular.

```js
libTools.simpleTypeToSingular('people')
// => 'person'
```

### `getFAIcon(simpleType)`

Gets the Font Awesome icon for a given simple type.

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