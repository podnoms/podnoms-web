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
        server_tokens off;

        root   /usr/share/nginx/html;
        include /etc/nginx/mime.types;

        add_header X-Frame-Options SAMEORIGIN;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000; includeSubdomains; preload";
        add_header Cache-Control 'max-age=86400'; # one day

        gzip on;
        gzip_min_length 1000;
        gzip_proxied expired no-cache no-store private auth;
        gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;

        location / {
            try_files $uri $uri/ /index.html;
        }
        location ~ .*\.css$|.*\.js$ {
            add_header Cache-Control 'max-age=31449600'; # one year
        }
    }
}
