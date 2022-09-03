describe("Landing page", function () {
  before((browser) => browser.navigateTo("http://localhost:3000"));

  it("Testing landing page", function (browser) {
    browser.waitForElementVisible("body").assert.titleContains("Rattle");
  });

  after((browser) => browser.end());
});
