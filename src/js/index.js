$(function ()
{
    $('#example').popover({
        placement : 'bottom',
        title : 'Question 1',
        html: true,
        content: '<div id="q1-popover">What Programming Language is Grunt in?</div>'
    });
    $('#example2').popover({
        placement : 'bottom',
        title : 'Question 2',
        html: true,
        content: '<div id="q2-popover">Name a Grunt Plugin and Explain What it Does.</div>'
    });
    $('#example3').popover({
        placement : 'bottom',
        title : 'Question 3',
        html: true,
        content: '<div id="q3-popover">What does grunt.loadNpmTasks() do?</div>',
    });
   $('#example4').popover({
        placement : 'bottom',
        title : 'Question 4',
        html: true,
        content: '<div id="q4-popover">Explain how you would create a task in the Gruntfile</div>'
    });
   $('#example5').popover({
        placement : 'bottom',
        title : 'Question 5',
        html: true,
        content: '<div id="q5-popover">What is Our Group Number?</div>'
    });
   
});

