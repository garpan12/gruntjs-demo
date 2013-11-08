test('hello', function() {
    expect(1);
    var button = jQuery("#example");
    button.click();
    var popover = jQuery("div#q1-popover");
    equal(popover.html(), "", "DOM accessed");
});
