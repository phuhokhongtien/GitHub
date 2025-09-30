#!/bin/bash

# Demo script for Analytics Dashboard
# This script starts a simple HTTP server and opens the dashboard

echo "Starting Analytics Dashboard Demo..."
echo ""
echo "Dashboard will be available at: http://localhost:8000/src/analytics/ui/dashboard.html"
echo ""
echo "To generate sample data:"
echo "1. Open browser console (F12)"
echo "2. Enable analytics when prompted"
echo "3. Run: window.generateSampleData()"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    cd "$(dirname "$0")"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    cd "$(dirname "$0")"
    python -m SimpleHTTPServer 8000
else
    echo "Error: Python is required to run the demo server"
    echo "Please install Python or open dashboard.html directly in your browser"
    exit 1
fi
