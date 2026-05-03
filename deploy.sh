#!/bin/bash
# Automatically get the current Project ID
PROJECT_ID=$(gcloud config get-value project)

if [ -z "$PROJECT_ID" ]; then
  echo "❌ Error: No project selected."
  echo "Please type: gcloud config set project YOUR_PROJECT_ID"
  exit 1
fi

echo "🚀 Deploying to project: $PROJECT_ID"
# Note: Ensure you have set OPENROUTER_API_KEY in your local environment 
# or replace YOUR_KEY_HERE with your key manually for local use only.
gcloud run deploy election-assistant \
  --project "$PROJECT_ID" \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars OPENROUTER_API_KEY=YOUR_KEY_HERE
echo "✅ Done!"
