#! /usr/bin/env bash

esbuild run.ts --bundle --platform=node --outfile=build/run.js --format=cjs
