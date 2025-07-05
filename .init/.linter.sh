#!/bin/bash
cd /home/kavia/workspace/code-generation/playfulstorynest-107793-2056490b/storybook_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

