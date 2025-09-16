#!/bin/bash
cd /home/kavia/workspace/code-generation/taskmate-real-time-database-integration-20766-20775/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

