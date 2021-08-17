# test-runner-cli [![CI](https://github.com/yuler/test-runner-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/yuler/test-runner-cli/actions/workflows/ci.yml)

> A simple way to run tests

## Features

-   Simple no API to learn, zero-config
-   Natively supports ESM

## Install

```bash
npm install test-runner-cli
```

## Usage

```bash
test-runner [dir|file] # default is dir `.`
```

Create a test file endsWith `.test.js` or naming `test.js` and use Node's built-in [assert](https://nodejs.org/api/assert.html) module, then export the test function.

```js
import {strict as assert} from 'assert' // Node <=16
// import { equal } from 'assert/strict'  // Node >=16

export function testSomeThing() {
	assert.equal(1 + 2, 3)
}
```

Edit package.json:

```json
{
	"scripts": {
		"test": "test-runner"
	}
}
```

Run test files:

```bash
npm test  // run all test files `.`
npx test-runner-cli fixtures test.js // run specify directory or file
```

## License

MIT
