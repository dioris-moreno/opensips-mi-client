# opensips-mi-client

OpenSIPS 3.0 Management Interface Client

## Installation

```sh
npm install opensips-mi-client --save
yarn add opensips-mi-client
bower install pluralize --save
```

## Usage

### Javascript

```javascript
var pluralise = require('opensips-mi-client');
var boys = pluralise.getPlural('Boy');
```

```sh
Output should be 'Boys'
```

### TypeScript

```typescript
import { getPlural } from 'opensips-mi-client';
console.log(getPlural('Goose'));
```

```sh
Output should be 'Geese'
```

### AMD

```javascript
define(function (require, exports, module) {
    var pluralise = require('opensips-mi-client');
});
```

## Test

```sh
npm run test
```
