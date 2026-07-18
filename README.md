# 📦 SCM System v1.5.0 — Paket PWA

Aplikasi Supply Chain Management untuk PT HABIT (Halawa Series) — bisa diinstall seperti aplikasi native di HP maupun laptop, dan tetap bisa dibuka tanpa internet setelah pertama kali dimuat.

## 📂 Isi Paket

```
scm-system-pwa/
├── index.html          → Aplikasi utama (buka file ini)
├── manifest.json        → Konfigurasi PWA (nama, ikon, warna)
├── sw.js                 → Service Worker (offline + auto-update)
├── version.json          → Info versi saat ini
├── icons/                → Ikon aplikasi berbagai ukuran
└── README.md             → Panduan ini
```

## 🚀 Cara Deploy (Wajib via Web Server)

**PWA tidak bisa diinstall jika dibuka langsung dari file (`file://`).**
Harus dilayani lewat HTTP/HTTPS server. Pilih salah satu cara termudah:

### Opsi A — Hosting gratis (paling mudah, bisa diakses dari mana saja)
1. Buat akun gratis di **Netlify** (netlify.com) atau **Vercel** (vercel.com)
2. Drag & drop folder `scm-system-pwa` ke halaman deploy mereka
3. Dapatkan link (misal `scm-habit.netlify.app`) — buka link ini di HP/laptop
4. Selesai — tombol Install akan otomatis muncul

### Opsi B — Server lokal sederhana (untuk uji coba di jaringan kantor)
Jika komputer Anda punya Python:
```bash
cd scm-system-pwa
python3 -m http.server 8080
```
Lalu buka `http://localhost:8080` di browser komputer yang sama,
atau `http://[IP-komputer]:8080` dari HP yang terhubung ke WiFi yang sama.

### Opsi C — Google Drive / hosting kantor
Upload seluruh folder ke hosting yang mendukung file statis (harus HTTPS).

## 📲 Cara Install di HP/Laptop

Setelah dibuka via web server (bukan file langsung):

**Android (Chrome):**
Tombol **📲 Install App** akan muncul otomatis di pojok kanan atas header. Klik → Install.

**iOS (Safari):**
Tombol Share (kotak dengan panah ke atas) → **Add to Home Screen**.

**Desktop (Chrome/Edge):**
Ikon install (⊕) muncul di address bar sebelah kanan → klik → Install.

## 🔄 Cara Kerja Update Otomatis

1. Setiap kali Anda upload file baru (`index.html`, `sw.js`, dll) yang sudah diperbarui ke server yang sama
2. Saat user membuka aplikasi (yang sudah terinstall), sistem otomatis mengecek apakah ada versi baru
3. Jika ada versi baru, muncul **popup di pojok kanan bawah**: "🔄 Versi Baru Tersedia"
4. User klik **✅ Update Sekarang** → aplikasi reload dengan versi terbaru
5. Data yang sudah diproses di sesi berjalan (upload, stok, dll) tetap aman — hanya kode aplikasi yang diperbarui

Cek berkala setiap 30 menit selama aplikasi terbuka, dan setiap kali dibuka ulang.

## ⚠️ Cara Update Versi (untuk Admin)

Jika ada pembaruan sistem baru dari Claude:
1. Ganti isi `index.html` dengan versi baru
2. **Wajib ubah** `APP_VERSION` di `sw.js` (baris pertama) — misal dari `'1.5.0'` ke `'1.6.0'`
3. Update juga `version.json` dengan nomor versi dan catatan perubahan
4. Upload ulang ke server yang sama
5. User yang sudah install akan otomatis mendapat notifikasi update saat membuka aplikasi

**Penting:** Jika `APP_VERSION` di `sw.js` tidak diubah, sistem tidak akan mendeteksi ada versi baru meskipun isi `index.html` sudah berubah — karena nama cache tetap sama.

## 🔒 Offline Mode

Setelah aplikasi pernah dibuka sekali dengan koneksi internet, seluruh file inti (`index.html`, `manifest.json`, ikon) tersimpan di cache browser. Aplikasi tetap bisa dibuka dan dipakai tanpa internet — cocok untuk dipakai di gudang/lokasi dengan sinyal lemah.

## 📋 Versi Saat Ini

- **Versi:** 1.5.0
- **Fitur utama:** Dashboard Insight, 8 Metode Forecast, Bullwhip Detector, Stok Aktual, Lost of Sale, Laporan PO + PDF, Rumus & Metode
- **Build:** 14 Juli 2026
