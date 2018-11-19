worker_processes  1;

events {
    worker_connections  1024;
}

http {
    server {
        listen 80;
        server_name podnoms.com;
        return 301 http://www.podnoms.com$request_uri;
    }
    server {
        listen 80;
        server_name  www.podnoms.com;

        root   /usr/share/nginx/html;
        index  index.html index.htm;
        include /etc/nginx/mime.types;

        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-Xss-Protection "1; mode=block" always;
        add_header Referrer-Policy: no-referrer;
        add_header Content-Security-Policy: "default-src https://www.podnoms.com:443";
        add_header X-Content-Type-Options "nosniff" always;

        gzip on;
        gzip_min_length 1000;
        gzip_proxied expired no-cache no-store private auth;
        gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;

        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}

