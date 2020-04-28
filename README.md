# opensips-mi-client

OpenSIPS 3.0 Management Interface Client

## Introduction

This is a client library that wraps all OpenSIPS 3.0 MI Functions in a comprehensive and easy to use way.
It is not intended to verify or handled the functionality of OpenSIPS modules. At this moment opensips-mi-client
only supports **http** transport.

## Installation

```sh
npm install opensips-mi-client --save
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

## Usage

### TypeScript

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

### Javascript

Use the library in Javascript as follows:

```javascript
var Client = require('opensips-mi-client');
var client = new Client();
var version = client.version();
console.log(version);
```

### Function Parameters

All parameters required by OpenSIPS MI functions are passed to each method defined in this library using only one parameter called
**params**. For each method, **params** type has been defined according to the specifications of the respective MI function.

### Intellisense

In order to get the must from this library, it is recommended to use an IDE that can read JsDoc descriptions. Every single method includes
its description and the description of its parameters in JsDoc format, based on OpenSIPS documentation. Parameter types have been
excluded from JsDoc because they are enforced by TypeScript.

### Name Conventions

The Management Interface of OpenSIPS, and must of its code, uses snake_case naming convention. This library has been developed
using camelCase and PascalCase naming following the [ESLint Code Conventions](https://eslint.org/docs/developer-guide/code-conventions).
In order to do that, names of MI functions have been converted to camelCase, but the names of its parameters were not. For example:

```typescript
const dialog_id = 'Y2IwYjQ2YmE2ZDg5MWVkNDNkZGIwZjAzNGM1ZDY';
await client.dialog.endDlg({ dialog_id });
```

Here MI function **dlg_end_dlg** was camelCased to **endDlg**, but the parameter name keeps the same **dialog_id**. This is because
OpenSIPS MI needs to receive the parameters with these specific names. This library does not parse the parameters in any way,
it only defines their types and passes them to OpenSIPS MI. If you see a parameter name in all caps, it is because that is the name
OpenSIPS MI expects, like **DID** in this example:

```typescript
const dlg_val_name = 'var_name';
const dlg_val_value = 'var_value';
const DID = ['DID1'];
const response = await client.dialog.pushVar({ dlg_val_name, dlg_val_value, DID });
```

OpenSIPS modules are defined as classes in opensips-mi-client and their names where converted to PascalCase. As noticed in the above
examples, MI functions prefixes **dlg\_** were removed from the method names for clarity and simplicity.

### Modules

This library defines one class for each OpenSIPS module, and the Client class exposes all possible modules as properties. If the
OpenSIPS instance we are connected to does not support the MI functions of one module because it is not using it, and we try to
execute any of its methods, an error like the following will be trigger:

```sh
'dlg_end_dlg' command is not available in this OpenSIPS instance.

```

> Note: the names of the properties (modules) in Client class are camelCase.

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

## Test

This project include a series of integration tests that can be run against the OpenSIPS instance defined in .env file as follows:

```sh
npm run integrationTest
```

#### IMPORTANT: Do not run these tests against a production OpenSIPS box.

The results of this tests will depend a lot on the configuration of the OpenSIPS instance. Some of the test definitions include
a **test-error** note at the end of their descriptions. These particular tests are validating that OpenSIPS received all required
parameters by checking specific returned error messages, not by evaluating the functionality of the MI method. This library is
only a client that wraps all MI functions in a comprehensive and easy to use way. It is not intended to verify or handled the
functionality of OpenSIPS modules.
