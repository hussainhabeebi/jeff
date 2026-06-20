FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html
COPY style.css  /usr/share/nginx/html/style.css

# Drop in doctor photo if it exists alongside this Dockerfile
# Place doctor.jpg next to the Dockerfile before building
# If absent, the page shows a placeholder automatically
COPY --chown=nginx:nginx . /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
