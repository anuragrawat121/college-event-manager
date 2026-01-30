@echo off
set "DATABASE_URL=postgresql://neondb_owner:npg_GS0PiYJzAwH4@ep-royal-poetry-ahrk780n-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"
node Backend/migrate_neon.js
