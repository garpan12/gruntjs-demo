test('hello', function() {
    expect(1);
    var button = document.getElementById("example");
    equal(button.innerText, "hello", "DOM accessed");
});
