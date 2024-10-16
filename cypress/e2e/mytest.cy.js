// const cypress = require("cypress");

describe("My First Test", () => {
  it("verify title-positive test", () => {
    cy.visit("https://opensource-demo.orangehrmlive.com/");
    cy.title().should("eq", "OrangeHRM");
    cy.get('input[name="username"]').should(
      "have.attr",
      "placeholder",
      "Username"
    );
    cy.get('input[name="password"]').should(
      "have.attr",
      "placeholder",
      "Password"
    );
  });

  it("verify title - Negative test", () => {
    // Mengunjungi halaman
    cy.visit("https://opensource-demo.orangehrmlive.com/");

    // Memverifikasi bahwa title halaman bukan "OrangeHRM123"
    cy.title().should("not.eq", "OrangeHRM123");
  });

  it("Css Locator", () => {
    // Mengunjungi halaman login
    cy.visit("https://opensource-demo.orangehrmlive.com/");

    // Mengetikkan username menggunakan atribut name
    cy.get('input[name="username"]').type("Admin");

    // Mengetikkan password menggunakan atribut name
    cy.get('input[name="password"]').type("admin123");

    // Klik tombol login menggunakan atribut type
    cy.get('button[type="submit"]').click();

    // Verifikasi bahwa login berhasil dengan memeriksa keberadaan elemen dashboard
    cy.url().should("include", "/dashboard");
    cy.get(".oxd-topbar-header-breadcrumb").should("contain", "Dashboard");
  });
});
