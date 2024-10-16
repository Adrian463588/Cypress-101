class homePage {
  // Method untuk memverifikasi halaman
  verifyPageTitle() {
    return cy.get(".title").invoke("text");
  }

  // Method untuk memeriksa apakah inventory ditampilkan
  isInventoryDisplayed() {
    return cy.get(".inventory_item").should("have.length.greaterThan", 0);
  }

  // Method untuk memilih opsi sort
  selectSortOption(option) {
    cy.get(".product_sort_container").select(option);
  }

  // Method untuk mendapatkan harga item berdasarkan indeks
  getItemPrice(index) {
    return cy
      .get(".inventory_item_price")
      .eq(index)
      .invoke("text")
      .then((priceText) => {
        return parseFloat(priceText.replace("$", ""));
      });
  }

  // Method untuk menambahkan item ke cart
  addItemToCart(itemIndex) {
    cy.get(".btn_inventory").eq(itemIndex).click();
  }

  // Method untuk mengklik cart link
  clickCart() {
    cy.get(".shopping_cart_link").click();
  }
}

export default homePage;
