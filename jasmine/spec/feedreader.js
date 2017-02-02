/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Tests that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URL defined and Not empty', function() {
            for (var x = 0; x < allFeeds.length; x++) {
                expect(allFeeds[x].url).toBeDefined();
                expect(allFeeds[x].url.lenght).not.toBe(0);
            }
         });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Name Defined and Not empty', function() {
            for (var x = 0; x < allFeeds.length; x++) {
                expect(allFeeds[x].name).toBeDefined();
                expect(allFeeds[x].name.length).not.toBe(0);
            }
         });
    });


    /* Test suite named "The menu" */
    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default.
         */
         it('menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });

          /* Test that ensures the menu appear and is
         * hidden.
         */
         it('menu changes visibility', function() {
            /* Trigger event on menu */
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);

         });
    });

    /* Initial Entries suite. */
    describe('Initial Entries', function () {

        /* Call loadFeed for initial entries */
        beforeEach(function(done) {
            loadFeed(0, function () {
                done();
            });
        });

        /* This test ensures that when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        */
        it('has at least one entry', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* A new test suite named "New Feed Selection" */
    describe("New Feed Selection", function(){
        var current;
        var after;

       /* beforeEach wait for async calls to finish */
        beforeEach(function(done) {
            /* Load the first feed */
            loadFeed(0 ,function() {
              /* Save content of feed to variable */
              current = $('.feed').html();
              /* Load second feed */
              loadFeed(1, function() {
                /* Save contentof feed to variable */
                after = $('.feed').html();
                done();
              });
            });
        });

        /* Test to ensure that content changes */
        it('changes content' , function(done) {
            expect(current != after).toBe(true);
            done();
        });
    });
}());
