# Используем базовый образ Node.js
FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код приложения
COPY . .

# Указываем порт, который будет прослушивать приложение
EXPOSE 3000

# Команда для запуска приложения
# CMD ["npm","run", "dev"]
CMD ["node", "server.js"]
