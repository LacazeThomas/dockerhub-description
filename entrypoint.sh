#!/bin/sh -l
set -eo pipefail
IFS=$'\n\t'

# Execute the action code and output to file
node index.js