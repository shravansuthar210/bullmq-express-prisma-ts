## 🚀 Getting Started

### package install used
    typescript
    expressjs
    prisma
    redis
    bullmq
    multer
    swagger

### 1. Clone the repository

```bash
git clone https://github.com/shravansuthar210/bullmq-express-prisma-ts.git
cd project-name
```
### 2 Install package
```bash
npm install
```
### 3 Generate migratation and apply
```bash
npx prisma generate
npx prisma migrate dev
```
### 4 run project
```bash
npm run dev
```

### 5 run a worker
```bash
npx ts-node-dev --respawn --transpile-only /src/bullmq/imageJob.ts
```

### 6 swagger docs link 
http://localhost:3000/api-docs
