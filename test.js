var selenium     = require('selenium-webdriver');

jasmine.getEnv().defaultTimeoutInterval = 10000; // in microseconds.
jasmine.DEFAULT_TIMEOUT_INTERVAL        = 10000; // in microseconds.

describe('Check that we have window object', function () {

    var urls = [
        'http://www.google.com/',
        'http://www.yahoo.com/',
        'https://idanmorblog.wordpress.com/'
    ];

    var index = -1;

    // Open the TECH.insight website in the browser before each test is run
    beforeEach(function (done) {
        this.driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
        this.driver.manage().timeouts().setScriptTimeout(10000);
        index++;
        if (index >= urls.length) index = 0;
        this.driver.get(urls[index]).then(done);
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function (done) {
        this.driver.quit().then(done);
    });

    // the function to test the rule - the Jasmine it object
    var checkWindow = function (url) {
        it('Check if there is a window object on page: ' + url, function (done) {
            this.driver.executeAsyncScript(
                "arguments[arguments.length - 1](!!window);").then(function (res) {
                expect(res).toBe(true);
            });
            done();
        });
    };

    //run all the tests on each url
    urls.forEach(function (url) {
        checkWindow(url);
    });

});