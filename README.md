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
var mi = require('opensips-mi-client');
var client = new mi.Client();
client.connect();
```

```sh

```

### TypeScript

```typescript
import { Client } from 'opensips-mi-client';
const client = new Client();
await client.connect();
```

```sh

```

### AMD

```javascript
```

## Test

```sh
npm run test
```
