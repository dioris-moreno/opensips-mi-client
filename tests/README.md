# opensips-mi-client

OpenSIPS 3.0 Management Interface Client

## Introduction

This is a client library that wraps all OpenSIPS 3.0 MI Functions in a comprehensive and easy to use way.
It is not intended to verify or handle the functionality of OpenSIPS modules. At this moment opensips-mi-client
only supports **http** transport.

## Test

This project include a series of integration tests that can be run against the OpenSIPS instance defined in .env file as follows:

```sh
npm run integrationTest
```

#### IMPORTANT: Do not run these tests against a production OpenSIPS box.

The results of this tests will depend a lot on the configuration of the OpenSIPS instance. Some of the test definitions include
a **test-error** note at the end of their descriptions. These particular tests are validating that OpenSIPS received all required
parameters by checking specific returned error messages, not by evaluating the functionality of the MI method.
