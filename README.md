# backend_final_project_hs
backend_final_project_hs menggunakan Prisma dan XAMPP 8.2.4

1. Clonning repository ini di pc (bisa download atau clonning)
2. npm install (agar terinstall node, prisma, bcrypt dan plugin2 yang lainnya)
3. pastikan sudah terinstall xampp versi : (XAMPP for Windows 8.2.4) dan sudah menjalankan servernya (start apache dan mysql)
4. rename .env.example menjadi .env , untuk default (APP_PORT=5000, DATABASE_URL="mysql://root:@localhost:3306/forlokers")
5. dalam projek CMD ketik **npx prisma migrate dev** (pilih "y" dan ketik nama migrasi , misal "first migration")
6. selesai
