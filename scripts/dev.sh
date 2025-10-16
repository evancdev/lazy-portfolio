#!/bin/bash

# Start both server and site in parallel with visible logs
echo "Starting server and site..."

cd "$(dirname "$0")/.."

# Use trap to cleanup on Ctrl+C
trap 'kill $(jobs -p) 2>/dev/null; exit' INT TERM

# Start server with prefix
(cd app/server && npm run dev 2>&1 | sed 's/^/[SERVER] /') &

# Start site with prefix
(cd app/site && npm run dev 2>&1 | sed 's/^/[SITE] /') &

echo "Press Ctrl+C to stop both services"

# Wait for both processes
wait
