class checkoutPage {
  // Method untuk klik tombol checkout
  proceedToCheckout() {
    cy.get("#checkout").click();
  }

  // Method untuk mengisi informasi checkout
  fillCheckoutInformation(firstName, lastName, postalCode) {
    cy.get("#first-name").type(firstName);
    cy.get("#last-name").type(lastName);
    cy.get("#postal-code").type(postalCode);
  }

  // Method untuk klik tombol continue
  clickContinue() {
    cy.get('input[data-test="continue"]').click();
  }

  // Method untuk klik tombol cancel
  clickCancel() {
    cy.get(".btn_secondary.cart_button").click();
  }

  // Method untuk mengambil subtotal
  getSubtotal() {
    return cy.get(".summary_subtotal_label").invoke("text");
  }

  // Method untuk mengambil nilai pajak (tax)
  getTax() {
    return cy.get(".summary_tax_label").invoke("text");
  }

  // Method untuk mengambil total pembayaran
  getTotal() {
    return cy.get(".summary_total_label").invoke("text");
  }

  // Method untuk klik tombol finish
  clickFinish() {
    cy.get('button[data-test="finish"]').click();
  }

  // Method untuk verifikasi apakah gambar checkout complete ditampilkan
  isCompletedImageDisplayed() {
    return cy.get(".pony_express").should("be.visible");
  }

  // Method untuk mendapatkan teks header complete
  getCompleteHeader() {
    return cy.get(".complete-header").invoke("text");
  }

  // Method untuk mendapatkan teks keterangan complete
  getCompleteText() {
    return cy.get(".complete-text").invoke("text");
  }

  // Method untuk verifikasi apakah checkout selesai (complete)
  isCheckoutComplete() {
    return cy.get(".complete-header").should("be.visible");
  }
}

export default checkoutPage;
