@ECHO OFF
echo ^> corepack pnpm %*
WHERE corepack 1>nul 2>&1 || (echo "corepack" not found. Make sure you are using Node.js ^>= 16.9 && EXIT /B 1)
CALL corepack pnpm %*
