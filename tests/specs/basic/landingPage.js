describe("Landing page", function () {
  it("Testing landing page", function (browser) {
    browser.init().waitForElementVisible("body").assert.titleContains("Rattle");
  });

  after((browser) => browser.end());
});
