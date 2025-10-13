## AnterIn — Aplikasi Pengantaran & Ekspedisi

AnterIn adalah aplikasi mobile berbasis React Native untuk memfasilitasi proses pengantaran paket/ekspedisi antara konsumen dan kurir. Aplikasi ini menyediakan alur end-to-end mulai dari pendaftaran, input pesanan, pemilihan kurir, pelacakan, hingga penyelesaian dan penilaian layanan. Selain itu, terdapat fitur khusus untuk kurir seperti melihat pesanan, navigasi peta, rincian pendapatan, dan pengelolaan profil.

### Tujuan
- Mempermudah konsumen membuat dan melacak pesanan pengiriman.
- Memberikan sarana bagi kurir untuk menerima, mengeksekusi, dan menyelesaikan pesanan secara efisien.

---

### Fitur Utama
- Autentikasi & Akun: Login/Daftar, Lupa Password, Tambah Password Baru, pengelolaan profil.
- Beranda & Navigasi: Navigasi tab bawah dan stack untuk akses cepat ke halaman-halaman utama.
- Pesanan: Input Pesanan, Checkout, Riwayat Pesanan, Detail Pesanan, status selesai.
- Alamat & Klasifikasi: Tambah/kelola alamat, klasifikasi objek yang akan dikirim.
- Kurir: Daftar sebagai kurir, rekomendasi/list kurir, Maps Kurir, Rincian Pendapatan, Gaji, Alamat Kurir, Tambah Alamat Kurir.
- Komunikasi: Chatting konsumen–kurir, riwayat chat, detail chat.
- Penilaian: Berikan rating/ulasan layanan.
- TopUp: TopUp saldo dan riwayat TopUp.
- Peta & Ongkir: Integrasi peta dan RajaOngkir untuk estimasi ongkos kirim.
- Pemberitahuan: Pengumuman/pemberitahuan untuk kurir.

Catatan: Nama-nama layar/fitur didasarkan pada konfigurasi navigator di `App.js`.

---

### Arsitektur Singkat
- Teknologi: React Native `^0.73.6`, React `18.2.0`.
- Navigasi: React Navigation (native stack + bottom tabs).
- Komponen UI: `react-native-paper`, `react-native-vector-icons`.
- Komunikasi data: `axios`, `socket.io-client`.
- Utilitas: `moment`, `@react-native-async-storage/async-storage`, image picker, PDF generator, peta, rating, dan komponen pendukung lainnya.

---

### Prasyarat
- Node.js >= 18
- NPM atau Yarn
- Android: Android Studio (SDK, emulator/Perangkat fisik dengan USB debugging)
- iOS (opsional, macOS): Xcode & iOS Simulator
- Java/JDK yang diperlukan oleh toolchain Android

Pastikan mengikuti panduan resmi React Native untuk menyiapkan lingkungan pengembangan.

---

### Instalasi
```bash
# 1) Clone repositori
git clone <url-repo-anda>
cd Delivery-Expedition-PT-Dwi-Dharma-Djaya

# 2) Install dependensi
npm install
# atau
yarn
```

Jika menggunakan React Native 0.73, sebagian besar modul sudah auto-link. Untuk iOS, jalankan `pod install` di dalam direktori `ios` bila diperlukan.

---

### Menjalankan Aplikasi
```bash
# Jalankan Metro bundler
npm start

# Menjalankan di Android (emulator/perangkat)
npm run android

# Menjalankan di iOS (Simulator, macOS)
npm run ios
```

Tips:
- Buka dua terminal terpisah: satu untuk `npm start`, satu lagi untuk `npm run android`/`npm run ios`.
- Jika emulator tidak berjalan, buka dari Android Studio atau Xcode terlebih dahulu.

---

### Contoh Alur Penggunaan
- Konsumen:
  1. Daftar atau Login.
  2. Tambah alamat pengirim/penerima.
  3. Input detail pesanan dan klasifikasi objek.
  4. Pilih kurir yang direkomendasikan.
  5. Lakukan checkout dan pantau status pengiriman di Riwayat/Detail Pesanan.
  6. Setelah selesai, beri rating dan ulasan.

- Kurir:
  1. Daftar sebagai kurir atau Login kurir.
  2. Lihat daftar pesanan dan detailnya.
  3. Gunakan Maps Kurir untuk navigasi.
  4. Selesaikan pesanan dan cek Rincian Pendapatan/Gaji.

---

### Konfigurasi (Opsional)
Beberapa integrasi mungkin membutuhkan konfigurasi variabel lingkungan, misalnya:
- BASE_URL API backend
- Endpoint `socket.io`

Silakan gunakan mekanisme konfigurasi yang Anda pilih (mis. `.env` + library terkait) dan pastikan izin aplikasi (lokasi, kamera, penyimpanan) di Android `AndroidManifest.xml` serta Info.plist (iOS) telah diatur sesuai kebutuhan modul (geolocation, image picker, file system, dll.).

---

### Dependensi Utama
Ringkasan dari `package.json`:
- Navigasi: `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`, `@react-navigation/material-bottom-tabs`
- UI & Ikon: `react-native-paper`, `react-native-vector-icons`, `@expo/vector-icons`
- Data & Utilitas: `axios`, `moment`, `@react-native-async-storage/async-storage`, `async`
- Media & Dokumen: `react-native-image-picker`, `react-native-html-to-pdf`, `react-native-fs`
- Lokasi & Peta: `@react-native-community/geolocation`, `react-native-map-link`, `react-native-screens`, `react-native-safe-area-context`
- Form/Input: `@react-native-picker/picker`, `react-native-picker-select`, `@react-native-community/checkbox`, `@react-native-clipboard/clipboard`
- Komunikasi Real-time & Chat: `socket.io`, `socket.io-client`, `react-native-gifted-chat`
- Lainnya: `react-native-ratings`, `react-native-rating-star`

Skrip NPM yang tersedia:
```bash
npm run start   # Menjalankan Metro bundler
npm run android # Menjalankan di Android
npm run ios     # Menjalankan di iOS
npm run test    # Menjalankan pengujian Jest
npm run lint    # Menjalankan ESLint
```

---

### Pengujian
Aplikasi dikonfigurasi dengan Jest. Jalankan:
```bash
npm test
```

---

### Lisensi
Proyek ini dilisensikan di bawah lisensi MIT. Lihat berkas `LICENSE` untuk detail lengkap.

Hak Cipta (c) 2024 Rizky Sulaeman

---

### Kontribusi
Kontribusi sangat disambut! Silakan buat issue untuk pelaporan bug/fitur dan ajukan pull request untuk perbaikan atau penambahan.


