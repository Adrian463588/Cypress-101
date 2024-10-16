# Cypress-101

Belajar Cypress QA Web Automation POM di saucedemo.com dan Orange HRM

## OrangeHRM Automation Test

OrangeHRM Test Suite dalam `mytest.cy.js` terdiri dari tiga skenario pengujian otomatis menggunakan Cypress di situs OrangeHRM. Pertama, pengujian positif memverifikasi bahwa judul halaman adalah "OrangeHRM" serta placeholder input untuk username dan password benar. Kedua, pengujian negatif memastikan bahwa judul halaman bukan "OrangeHRM123" yang salah. Terakhir, pengujian login menggunakan CSS selector memverifikasi bahwa pengguna dapat login dengan username "Admin" dan password "admin123", serta diarahkan ke halaman dashboard untuk memastikan login berhasil.

## SauceDemo Automation Test

### Deskripsi

Proyek ini merupakan automation test untuk situs SauceDemo menggunakan Cypress sebagai framework pengujian otomatisasi. Proyek ini juga mengimplementasikan **Page Object Model (POM)** untuk memisahkan logika antarmuka pengguna dari logika pengujian.

Pengujian mencakup beberapa test case penting, seperti login yang berhasil, login yang gagal, pengurutan item berdasarkan harga, dan proses checkout untuk memastikan semua fungsi di situs SauceDemo bekerja dengan baik.

### Struktur Page Object Model (POM)

Proyek ini mengikuti prinsip **Page Object Model (POM)**, dengan file terpisah untuk setiap halaman yang diuji:

- **loginPage.js** – Berisi metode untuk mengakses dan berinteraksi dengan halaman login.
- **homePage.js** – Berisi metode untuk berinteraksi dengan halaman home setelah login.
- **checkoutPage.js** – Berisi metode untuk mengelola proses checkout.

## Test Cases

### Test Case A: Successfully login and verify inventory display

**Tujuan**: Memverifikasi login yang berhasil dengan kredensial yang benar dan memastikan halaman inventori (home) dimuat dengan benar.

**Langkah-langkah**:

1. Kunjungi halaman login.
2. Masukkan username dan password yang valid (`standard_user` dan `secret_sauce`).
3. Klik tombol login.
4. Verifikasi bahwa halaman home menampilkan judul "Products".
5. Pastikan produk dalam inventori ditampilkan.

```javascript
loginPage.visit();
loginPage.inputUsername("standard_user");
loginPage.inputPassword("secret_sauce");
loginPage.clickLogin();
homePage.verifyPageTitle().should("eq", "Products");
homePage.isInventoryDisplayed();
```

### Test Case B: Failed login with wrong password

**Tujuan**: Memverifikasi bahwa login dengan kata sandi yang salah menghasilkan pesan error.

**Langkah-langkah**:

1. Kunjungi halaman login.
2. Masukkan username yang benar (`standard_user`) dan password yang salah (`wrong_password`).
3. Klik tombol login.
4. Verifikasi bahwa pesan error yang tepat muncul: "Username and password do not match any user in this service."

```javascript
loginPage.visit();
loginPage.inputUsername("standard_user");
loginPage.inputPassword("wrong_password");
loginPage.clickLogin();
loginPage
  .getErrorMessage()
  .should(
    "contain",
    "Username and password do not match any user in this service"
  );
```

### Test Case C: Sort products by price (low to high)

**Tujuan**: Memverifikasi bahwa fitur pengurutan item berdasarkan harga bekerja dengan benar, di mana harga tertinggi muncul lebih dulu.

**Langkah-langkah**:

1. Login dengan kredensial yang benar.
2. Setelah login, pastikan halaman home dimuat dengan benar.
3. Lakukan pengurutan item dari harga tertinggi ke terendah.
4. Verifikasi bahwa item diurutkan dengan benar.

```javascript
loginPage.visit();
loginPage.inputUsername("standard_user");
loginPage.inputPassword("secret_sauce");
loginPage.clickLogin();
homePage.verifyPageTitle().should("eq", "Products");
homePage.isInventoryDisplayed();
homePage.selectSortOption("hilo");
homePage.getItemPrice(0).then((firstPrice) => {
  homePage.getItemPrice(1).then((secondPrice) => {
    expect(firstPrice).to.be.greaterThan(secondPrice);
  });
});
```

### Test Case D: Checkout 2 items and validate success page

**Tujuan**: Memverifikasi bahwa proses checkout bekerja dengan benar mulai dari menambahkan item ke keranjang hingga menyelesaikan proses checkout.

**Langkah-langkah**:

1. Login menggunakan kredensial yang valid.
2. Tambahkan dua item ke keranjang.
3. Pergi ke halaman checkout.
4. Isi informasi checkout (nama depan, nama belakang, dan kode pos).
5. Klik tombol Continue dan selesaikan checkout.
6. Verifikasi bahwa halaman sukses checkout ditampilkan dengan pesan yang benar: "Thank you for your order!"

```javascript
loginPage.visit();
loginPage.inputUsername("standard_user");
loginPage.inputPassword("secret_sauce");
loginPage.clickLogin();
homePage.verifyPageTitle().should("eq", "Products");
homePage.isInventoryDisplayed();
homePage.addItemToCart(0);
homePage.addItemToCart(1);
homePage.clickCart();
checkoutPage.proceedToCheckout();
checkoutPage.fillCheckoutInformation("John", "Doe", "12345");
checkoutPage.clickContinue();
checkoutPage.getSubtotal().should("include", "$");
checkoutPage.getTax().should("include", "$");
checkoutPage.getTotal().should("include", "$");
checkoutPage.clickFinish();
checkoutPage.isCheckoutComplete().should("be.visible");
checkoutPage.getCompleteHeader().should("eq", "Thank you for your order!");
checkoutPage
  .getCompleteText()
  .should("contain", "Your order has been dispatched");
checkoutPage.isCompletedImageDisplayed().should("be.visible");
```

## Cara Menjalankan Tes

### Instalasi

Pastikan Cypress terinstal dalam proyek. Jika belum, instal Cypress dengan perintah berikut:

```bash
npm install cypress --save-dev 
```

Untuk menjalankan tes secara headless (tanpa membuka browser), gunakan perintah:

````bash
npx cypress run --spec "cypress/e2e/saucedemoTests.cy.js" --headless
````


### Struktur Proyek

```bash
cypress/
├── e2e/
│   └── saucedemoTests.cy.js     # File pengujian utama
├── pageObjects/                 # Folder untuk file Page Object
│   ├── loginPage.js             # Page Object untuk halaman login
│   ├── homePage.js              # Page Object untuk halaman home
│   └── checkoutPage.js          # Page Object untuk halaman checkout
└── support/
    └── commands.js              # Custom commands jika diperlukan

````

### Kesimpulan

Proyek ini memberikan contoh implementasi pengujian otomatis di situs SauceDemo menggunakan Cypress dengan pendekatan Page Object Model (POM). Dengan memisahkan setiap halaman situs menjadi kelas-kelas terpisah, logika pengujian dapat dipisahkan dari elemen halaman, sehingga pengujian lebih mudah dipelihara dan terstruktur.
