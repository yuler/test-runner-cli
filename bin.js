#!/usr/bin/env node

import fs from 'node:fs/promises'
import {dirname, basename, join} from 'node:path'
import {pathToFileURL} from 'node:url'

/**
 * Walk through a directory recursively
 * @param {string} dir
 */
async function* walk(dir) {
	for await (const d of await fs.opendir(dir)) {
		const entry = join(dir, d.name)
		if (d.isDirectory()) yield* walk(entry)
		else if (d.isFile()) yield entry
	}
}

/**
 * Run test functions by file
 * @param {string} file
 */
async function runTestFile(file) {
	const fns = await import(pathToFileURL(file))
	for (const [_, fn] of Object.entries(fns)) {
		if (typeof fn !== 'function') continue
		try {
			fn()
		} catch (error) {
			if (error instanceof Error) console.error(error.stack)
		}
	}
}

const targets = process.argv[2] ? process.argv.slice(2) : ['.']

const validFile = file =>
	basename(file) === 'test.js' || file.endsWith('.test.js')

for await (const target of targets) {
	if ((await fs.lstat(target)).isFile()) {
		validFile(target) && runTestFile(target)
	} else {
		for await (const file of walk(target)) {
			if (!dirname(file).includes('node_modules') && validFile(file)) {
				console.log(file)
				await runTestFile(file)
			}
		}
	}
}
