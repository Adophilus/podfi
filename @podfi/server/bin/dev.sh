#! /usr/bin/env bash

bun run cli db migrate
bun run --watch run.ts
