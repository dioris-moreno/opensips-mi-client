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

or using destructured import

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

## Configuration

This library supports the following environment variables:

```sh
OS_MI_COMM_TYPE=http
OS_MI_FIFO_FILE=/tmp/opensips_fifo
OS_MI_FIFO_REPLY_DIR=/tmp
OS_MI_URL=http://127.0.0.1:8888/mi
```

It also uses dotenv node module, so you can create a .env file at the root of the project to set the variables.
These variables can be easily retrieved by importing **config** object from the library as follows:

```typescript
import { config } from 'opensips-mi-client';
console.log(config);
```

The **config** object has the properties **communication_type**, **fifo_file**, **fifo_reply_dir** and **url**,
with the corresponding values read from the .env file.

```sh
{  communication_type: 'http',
   fifo_file: '/tmp/opensips_fifo',
   fifo_reply_dir: '/tmp',
   url: 'http://127.0.0.1:8888/mi',
   jsonrpcVersion: '2.0' }
```

### Usage

Client class is the default export of the library, so you can just import it as follows:

```typescript
import Client from 'opensips-mi-client';
```

You are able to connect to the OpenSIPS instance defined in .env and get its version as easy as this:

```typescript
import Client from 'opensips-mi-client';
const client = new Client();
const version = client.version();
console.log(version);
```

```sh
{ Server: 'OpenSIPS (3.1.0-dev (x86_64/linux))' }
```

Client class constructor supports passing the parameters needed to connect to OpenSIPS, so instead using environment
variables you can create a client as follows:

```typescript
import Client from 'opensips-mi-client';
const client = new Client({ url: 'http://10.10.10.10:8000/mi' });
const version = client.version();
console.log(version);
```

> Note: at this moment opensips-mi-client only supports **http** transport.

### Function Parameters

All parameters required by OpenSIPS MI functions are passed to each method defined in this library using only one parameter called
**params**. For each method, **params** type has been defined according to the specifications of the respective MI function.

### Intellisense

In order to get the must from this library, it is recommended to use an IDE that can read JsDoc descriptions. Every single method includes
its description and the description of its parameters in JsDoc format, based on OpenSIPS documentation. Parameter types have been
excluded from JsDoc because they are enforced by TypeScript.

### Name Conventions

The Management interface of OpenSIPS, and must of its code, uses snake_case naming convention. This library has been developed
using camelCase and PascalCase naming following the [ESLint Code Conventions](https://eslint.org/docs/developer-guide/code-conventions).
In order to do that, names of MI functions has been converted to camelCase, however, its parameters were not. For example:

```typescript
const dialog_id = 'Y2IwYjQ2YmE2ZDg5MWVkNDNkZGIwZjAzNGM1ZDY';
await client.dialog.endDlg({ dialog_id });
```

All parameters of all MI functions keep the same name, opensips-mi-client only defines their types. This library does not parse the
parameters, it only passes them to OpenSIPS MI. That is the reason why it keeps exactly the same names along every module code. If you see
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
