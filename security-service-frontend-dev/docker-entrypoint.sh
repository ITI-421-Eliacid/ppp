#!/bin/sh
# docker-entrypoint.sh

# Generate env.js with runtime environment variables
cat <<EOF > /usr/share/nginx/html/env.js
window.env = {
  VITE_API_URL: "${VITE_API_URL}"
};
EOF

# Start nginx
exec "$@"
