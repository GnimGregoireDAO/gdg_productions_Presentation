# Dockerfile pour GDG Productions
FROM node:20-alpine AS build

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Build l'application Astro
RUN npm run build

# Stage de production avec nginx
FROM nginx:alpine

# Copier le build Astro vers nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copier la configuration nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 8080 (requis par Cloud Run)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
