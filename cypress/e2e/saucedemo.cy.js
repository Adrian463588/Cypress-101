import LoginPage from "../e2e/POMSauce/loginPage";
import HomePage from "../e2e/POMSauce/homePage";
import CheckoutPage from "../e2e/POMSauce/checkoutPage";

const loginPage = new LoginPage();
const homePage = new HomePage();
const checkoutPage = new CheckoutPage();

describe("SauceDemo Automation Test", () => {
  // Test Case A: Successfully login
  it("Successfully login and verify inventory display", () => {
    loginPage.visit();
    cy.wait(2000); // Tambahkan jeda 2 detik sebelum lanjut
    loginPage.inputUsername("standard_user");
    loginPage.inputPassword("secret_sauce");
    loginPage.clickLogin();

    // Verifikasi bahwa berada di halaman utama (home) dan item ditampilkan
    cy.wait(2000); // Tambahkan jeda 2 detik setelah login
    homePage.verifyPageTitle().should("eq", "Products");
    homePage.isInventoryDisplayed();
  });

  // Test Case B: Failed login with wrong password
  it("Failed login with wrong password", () => {
    cy.intercept("POST", "/?user-name=standard_user&password=secret_sauce").as(
      "loginRequest"
    );
    loginPage.visit();

    // Pastikan input username muncul sebelum lanjut
    cy.get("#user-name", { timeout: 10000 }).should("be.visible");
    loginPage.inputUsername("standard_user");
    loginPage.inputPassword("wrong_password");
    loginPage.clickLogin();

    // Verifikasi bahwa pesan error muncul tanpa menggunakan cy.wait
    loginPage
      .getErrorMessage()
      .should(
        "contain",
        "Username and password do not match any user in this service"
      );
  });

  // Test Case C: Sorting items by price from high to low
  it("Sorting items by price from high to low", () => {
    loginPage.visit();

    // Pastikan input username muncul sebelum lanjut
    cy.get("#user-name", { timeout: 10000 }).should("be.visible");
    loginPage.inputUsername("standard_user");
    loginPage.inputPassword("secret_sauce");
    loginPage.clickLogin();

    // Verifikasi bahwa berada di halaman utama (home) dan item ditampilkan
    homePage.verifyPageTitle().should("eq", "Products");
    homePage.isInventoryDisplayed();

    // Sort dari harga tertinggi ke terendah
    homePage.selectSortOption("hilo");

    // Verifikasi bahwa harga item pertama lebih besar dari item kedua
    homePage.getItemPrice(0).then((firstPrice) => {
      homePage.getItemPrice(1).then((secondPrice) => {
        expect(firstPrice).to.be.greaterThan(secondPrice);
      });
    });
  });

  // Test Case D: Checkout 2 items and validate success page
  it("Checkout 2 items and validate success page", () => {
    loginPage.visit();

    // Pastikan input username muncul sebelum lanjut
    cy.get("#user-name", { timeout: 10000 }).should("be.visible");
    loginPage.inputUsername("standard_user");
    loginPage.inputPassword("secret_sauce");
    loginPage.clickLogin();

    // Verifikasi bahwa berada di halaman utama (home) dan item ditampilkan
    homePage.verifyPageTitle().should("eq", "Products");
    homePage.isInventoryDisplayed();

    // Tambahkan 2 item ke cart
    homePage.addItemToCart(0); // Item pertama
    homePage.addItemToCart(1); // Item kedua
    homePage.clickCart();

    // Lanjutkan ke checkout
    checkoutPage.proceedToCheckout();

    // Pastikan input checkout muncul sebelum lanjut
    cy.get("#first-name", { timeout: 10000 }).should("be.visible");
    checkoutPage.fillCheckoutInformation("John", "Doe", "12345");
    checkoutPage.clickContinue();

    // Verifikasi subtotal, pajak, dan total
    checkoutPage.getSubtotal().should("include", "$");
    checkoutPage.getTax().should("include", "$");
    checkoutPage.getTotal().should("include", "$");

    // Klik finish dan verifikasi halaman sukses
    checkoutPage.clickFinish();

    // Verifikasi halaman success termuat dengan benar
    checkoutPage.isCheckoutComplete().should("be.visible");
    checkoutPage.getCompleteHeader().should("eq", "Thank you for your order!");
    checkoutPage
      .getCompleteText()
      .should("contain", "Your order has been dispatched");
    checkoutPage.isCompletedImageDisplayed().should("be.visible");
  });
});
