class loginPage {
  // Method untuk membuka halaman
  visit() {
    cy.visit("http://www.saucedemo.com/");
  }

  // Method untuk mengisi username
  inputUsername(username) {
    cy.get("#user-name").type(username);
  }

  // Method untuk mengisi password
  inputPassword(password) {
    cy.get("#password").type(password);
  }

  // Method untuk klik tombol login
  clickLogin() {
    cy.get("#login-button").click();
  }

  // Method untuk mendapatkan pesan error
  getErrorMessage() {
    return cy.get('h3[data-test="error"]').invoke("text");
  }

  // Method untuk mendapatkan judul halaman setelah login
  getPageTitle() {
    return cy.get(".title").invoke("text");
  }
}

export default loginPage;
