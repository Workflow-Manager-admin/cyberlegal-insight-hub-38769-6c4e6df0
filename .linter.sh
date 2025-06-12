#!/bin/bash
cd /home/kavia/workspace/code-generation/cyberlegal-insight-hub-38769-6c4e6df0/cyberlegal_insight_hub
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

