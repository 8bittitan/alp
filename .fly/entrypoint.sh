#!/usr/bin/env bash

/usr/local/bin/bun run db:migrate

exec bun run start