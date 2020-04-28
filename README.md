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

Client class is the default export of the library, so you can just import it as follows:

```typescript
import Client from 'opensips-mi-client';
```

Or using destructured import:

```typescript
import { Client } from 'opensips-mi-client';
```

```typescript
import { Client } from 'opensips-mi-client';
const client = new Client();
await client.connect();
```

```sh

```

### Function Parameters

All parameters required by OpenSIPS MI functions are passed to each method defined in this library using only one parameter called
**params**.

### Name Conventions

The Management interface of OpenSIPS, and must of its code, uses snake_case naming convention. This library has been developed
using camelCase and PascalCase naming following the [ESLint Code Conventions](https://eslint.org/docs/developer-guide/code-conventions).
In order to do that, names of MI functions has been converted to camelCase, however, its parameters were not. For example:

```typescript
const dialog_id = 'Y2IwYjQ2YmE2ZDg5MWVkNDNkZGIwZjAzNGM1ZDY';
await client.dialog.endDlg({ dialog_id });
```

All parameters of all MI functions keep the same name, opensips-mi-client only defines their types. This library does not parse the
parameters, it only pases to OpenSIPS MI. That is the reason why it keeps exactly the same names along every module code. If you see
any parameter name in all caps, it is because that is the name OpenSIPS MI expects, like **DID** parameter in this example:

```typescript
const dlg_val_name = 'var_name';
const dlg_val_value = 'var_value';
const DID = ['DID1'];
const response = await client.dialog.pushVar({ dlg_val_name, dlg_val_value, DID });
```

### Statistics

The client exposes all core MI functions, including listStatistics and getStatistics functions. These functions work in the way
documented in OpenSIPS MI. listStatistics returns a list of all available statistics in the OpenSIPS instance, and getStatistics
returns their realtime values. getStatistics allows to filter statistics using a group or an specific name. This is feature is used
by opensips-mi-client to expose both functions in every module that has available statistics. These functions can be use to obtain
the statistics of the module from they are called. For example:

```typescript
const response = await client.dialog.getStatistics();
console.log(response);
```

will print

```sh
{
    active_dialogs: 0,
    early_dialogs: 0,
    processed_dialogs: 0,
    expired_dialogs: 0,
    failed_dialogs: 0,
    create_sent: 0,
    update_sent: 0,
    delete_sent: 0,
    create_recv: 0,
    update_recv: 0,
    delete_recv: 0,
}
```

Note that the statistics are returned without the group name. This functionality is implemented in opensips-mi-client by default
to make more clean and easier to manipulate the statistics values. If you want to get the original names returned by OpenSIPS you
can pass the keepGroupName option to getStatistics as follows:

```typescript
const options = { keepGroupName: true };
const response = await client.dialog.getStatistics(options);
console.log(response);
```

and get

```sh
{
    dialog:active_dialogs: 0,
    dialog:early_dialogs: 0,
    dialog:processed_dialogs: 0,
    dialog:expired_dialogs: 0,
    dialog:failed_dialogs: 0,
    dialog:create_sent: 0,
    dialog:update_sent: 0,
    dialog:delete_sent: 0,
    dialog:create_recv: 0,
    dialog:update_recv: 0,
    dialog:delete_recv: 0,
}
```

the group name is removed from

### AMD

```javascript
```

## Test

```sh
npm run test
```
