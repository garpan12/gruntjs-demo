module("Basic Tests");

test("dabool", function() {
    ok(true, "true");
    equal(1, true, "1 is true");
    notEqual(0, true, "0 is NOT true");
});
