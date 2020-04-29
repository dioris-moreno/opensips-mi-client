# opensips-mi-client

OpenSIPS 3.0 Management Interface Client

## Introduction

This is a client library that wraps all OpenSIPS 3.0 MI Functions in a comprehensive and easy to use way.
It is not intended to verify or handle the functionality of OpenSIPS modules. At this moment opensips-mi-client
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

Client class is the default export of the library, so you can import it as follows:

```typescript
import Client from 'opensips-mi-client';
```

You now are able to connect to the OpenSIPS instance defined in .env and get its version with just a few lines of code:

```typescript
import Client from 'opensips-mi-client';
const client = new Client();
const version = client.version();
console.log(version);
```

```sh
{ Server: 'OpenSIPS (3.1.0-dev (x86_64/linux))' }
```

Client class constructor supports passing the parameters needed to connect to OpenSIPS, so instead of using environment
variables you can create a client as follows:

```typescript
import Client from 'opensips-mi-client';
const client = new Client({ url: 'http://10.10.10.10:8000/mi' });
const version = client.version();
console.log(version);
```

> Note: at this moment opensips-mi-client only supports **http** transport.

### Javascript

Use the library in Javascript in the following way:

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
its explanation and the description of its parameters in JsDoc format, based on the OpenSIPS documentation. Parameter types have been
excluded from JsDoc because they are enforced by TypeScript.

### Name Conventions

The OpenSIPS Management Interface, and must of its code, uses **snake_case** naming convention. This library has been developed
using **camelCase** and **PascalCase** naming following the [ESLint Code Conventions](https://eslint.org/docs/developer-guide/code-conventions).
In order to do that, names of MI functions have been converted to **camelCase**, but the names of its parameters have not been changed. For example:

```typescript
const dialog_id = 'Y2IwYjQ2YmE2ZDg5MWVkNDNkZGIwZjAzNGM1ZDY';
await client.dialog.endDlg({ dialog_id });
```

Here MI function name **dlg_end_dlg** was converted to **endDlg** (camelCase), but the parameter keeps the same name **dialog_id**. This is because
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
OpenSIPS instance we are connected to does not support the MI functions of one module (maybe because it is not using it), and we try to
execute any of its methods, an error like the following will be trigger:

```sh
'dlg_end_dlg' command is not available in this OpenSIPS instance.
```

> Note: the names of the properties (modules) in Client class use camelCase naming convention.

### Statistics

The Client class exposes all core MI functions, including listStatistics and getStatistics methods. These methods work in the way
documented in OpenSIPS: listStatistics returns a list of all available statistics in the instance, and getStatistics
returns their realtime values. getStatistics allows to filter statistics using a group or an specific name. This library also exposes
a getStatistics method in every module that has statistics. This method can be used to obtain the realtime values
of the statistics of the module from where it is called. For example:

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

To facilitate getting statistics by name, all possible statistics of a module are exposed in an enum of the class called **Stats**.
For exmple, in order to only get the value of the **update_recv** statistic, call the getStatistics method of client.dialog
using the corresponding enum member.

```typescript
const response = await client.dialog.getStatistics(Dialog.Stats.UpdateRecv);
console.log(response);
```

it will print

```sh
{ update_recv: 0 }
```

All Stats enums include an **All** member that can be used to obtain the values of all the statistics. You will get the same
result if you call getStatistics method without any parameter. It is not mandatory to call getStatistics using the enum, you
can get stats values by name using strings:

```typescript
const response = await client.dialog.getStatistics('update_recv');
console.log(response);
```

This library defines as types the names of all the statistics of every module to enforce the use of valid names in TypeScript.
So, if you try to pass an invalid statistic name, TypeScript will give you an error, like in the following example:

```typescript
const response = await client.dialog.getStatistics('invalid_parameter_name');
console.log(response);
```

There are some statistics in TM module with names that cannot be used to define enums (**2xx_transactions**, **3xx_transactions**, etc.).
The letter **C** (code) was added in front of these names in order to define the corresponding members in Stats enum of this module as follows:

```sh
Tm.Stats.C2xxTransactions
Tm.Stats.C3xxTransactions
Tm.Stats.C4xxTransactions
Tm.Stats.C5xxTransactions
Tm.Stats.C6xxTransactions
```

Note that the statistics are returned without the group name. This functionality is implemented in opensips-mi-client by default
to make easier to manipulate the statistics values. If you want to get the original names returned by OpenSIPS, you can pass
the keepGroupName option to getStatistics as follows:

```typescript
const options = { keepGroupName: true };
const response = await client.dialog.getStatistics(Dialog.Stats.All, options);
console.log(response);
```

and get

```sh
{   'dialog:active_dialogs': 0,
    'dialog:early_dialogs': 0,
    'dialog:processed_dialogs': 0,
    'dialog:expired_dialogs': 0,
    'dialog:failed_dialogs': 0,
    'dialog:create_sent': 0,
    'dialog:update_sent': 0,
    'dialog:delete_sent': 0,
    'dialog:create_recv': 0,
    'dialog:update_recv': 0,
    'dialog:delete_recv': 0 }
```
