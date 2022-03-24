install:
	npm install
	npm run client:install
start:
	npm run client:build
	npm run prod
dev:
	npm run dev
lint:
	npx eslint .