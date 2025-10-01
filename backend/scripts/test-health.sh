#!/bin/bash

echo "🧪 Testing API Health Endpoint..."
echo ""

# Check if server is responding
HEALTH_URL="${1:-http://localhost:3000/api/health}"

echo "Testing: $HEALTH_URL"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" "$HEALTH_URL" 2>/dev/null)
HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
BODY=$(echo "$RESPONSE" | head -n -1)

if [ -z "$HTTP_CODE" ]; then
    echo "❌ Failed to connect to the API"
    echo "   Make sure the backend server is running: npm run dev"
    exit 1
fi

echo "HTTP Status Code: $HTTP_CODE"
echo ""

if [ "$HTTP_CODE" -eq 200 ]; then
    echo "✅ Health check passed!"
    echo ""
    echo "Response:"
    echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
    exit 0
elif [ "$HTTP_CODE" -eq 503 ]; then
    echo "⚠️  Service is unhealthy"
    echo ""
    echo "Response:"
    echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
    echo ""
    echo "This usually means:"
    echo "  - PostgreSQL is not running (run: make dev-up)"
    echo "  - Redis is not running (run: make dev-up)"
    exit 1
else
    echo "❌ Unexpected response code: $HTTP_CODE"
    echo ""
    echo "Response:"
    echo "$BODY"
    exit 1
fi
