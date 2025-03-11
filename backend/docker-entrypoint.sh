#!/bin/sh

# Esperar a que MongoDB esté disponible (simple retry mechanism)
echo "Esperando a que MongoDB esté disponible..."
RETRIES=30
until nc -z mongodb 27017 || [ $RETRIES -eq 0 ]; do
  echo "Esperando a que MongoDB esté disponible, $((RETRIES--)) intentos restantes..."
  sleep 2
done

# Ejecutar el seed si se ha establecido la variable de entorno SEED_DATABASE
if [ "$SEED_DATABASE" = "true" ]; then
  echo "Ejecutando el seeder..."
  npm run seed
fi

# Iniciar la aplicación
echo "Iniciando la aplicación..."
npm run dev 