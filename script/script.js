
$(document).ready(function () {

    var questions = $('.question');
    var container = $('#quiz-questions ul');
    var elm = container.find(':first-child').prop("tagName");
    var item_width = $('#carousel').outerWidth();
    var previous = 'prev'; 
    var next = 'next'; 

    $('#quiz-questions ul li').css('width', item_width);
    container.width(questions.length * item_width); //set the questions container to the correct total width
    container.find(elm + ':first').before(container.find(elm + ':last'));
    resetQuestions(item_width);

    $(window).resize(function() {
        item_width = $('#carousel').width(); 
        container.width(questions.length * item_width);
        $('#quiz-questions ul li').css('width', item_width);
        resetQuestions(item_width);

        $("input[type='range']").change(function() {
           // Cache this for efficiency
           el = $(this);
           // Measure width of range input
           width = el.width();
           // Figure out placement percentage between left and right of input
           newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));
           // Janky value to get pointer to line up better
           offset = -3.5 + (item_width / width);
            // console.log(width); 
            // console.log(item_width);
            // console.log(item_width / width); 
            // console.log(offset); 
           // Prevent bubble from going beyond left or right (unsupported browsers)
           if (newPoint < 0) { newPlace = 0; }
           else if (newPoint > 1) { newPlace = width; }
           else { newPlace = width * newPoint + offset; offset -= newPoint; }
           // Move bubble
           el
             .next("output")
             .css({
               left: newPlace,
               marginLeft: offset + "%"
             })
             .text(el.val());
         })
         // Fake a change to position bubble at page load
         .trigger('change');
    });
    
    
    //if user clicked on prev button
    $('#buttons button').click(function (e) {
        //slide the item
        if (container.is(':animated')) {
            return false;
        }
        if (e.target.id == previous) {
            container.stop().animate({
                'left': 0
            }, 500, function () {
                container.find(elm + ':first').before(container.find(elm + ':last'));
                resetQuestions(item_width);
            });
        }
        
        if (e.target.id == next) {
            container.stop().animate({
                'left': item_width * -2
            }, 500, function () {
                container.find(elm + ':last').after(container.find(elm + ':first'));
                resetQuestions(item_width);
            });
        }
        
        //cancel the link behavior            
        return false;
        
    });  
    
    function resetQuestions( width ) {
        //and adjust the container so current is in the frame
        container.css({
            'left': -1 * width
        });
    }
  
}); //end of document ready function


//a function to click next link
function rotate() {
    $('#next').click();
}

//give the range some pretty colours
$('input[type="range"]').change(function () {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
    
    $(this).css('background-image',
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + val + ', #FFD700), '
                + 'color-stop(' + val + ', #f4f4f4)'
                + ')'
                );
});



$(function() {
 var el, newPoint, newPlace, offset;
 
 // Select all range inputs, watch for change
 $("input[type='range']").change(function() {
   // Cache this for efficiency
   el = $(this);
   // Measure width of range input
   width = el.width();
   // Figure out placement percentage between left and right of input
   newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));
   // Janky value to get pointer to line up better
   offset = -1.5;
   // Prevent bubble from going beyond left or right (unsupported browsers)
   if (newPoint < 0) { newPlace = 0; }
   else if (newPoint > 1) { newPlace = width; }
   else { newPlace = width * newPoint + offset; offset -= newPoint; }
   // Move bubble
   el
     .next("output")
     .css({
       left: newPlace,
       marginLeft: offset + "%"
     })
     .text(el.val());
 })
 // Fake a change to position bubble at page load
 .trigger('change');
});

//calculate the score 
function calcscore(){
    var score = 0;
    $(".calc:checked").each(function(){
        score+=parseInt($(this).val(),10);
    });

    results = "You're " + (
        score >  200 ? " Super Mega Awkward 😳" :
        score >  180 ? " Extremely Awkward 😦" :
        score >  120 ? " Normal Awkward 🤓" :
        score >  60 ? " a Tiny bit Awkward 🤗" :
        score >   0 ? " not so Awkward, which is Awkward! 😒" :
                     " Hey! you didn't even answer any of the questions. This is Awkward."
    );
    resultsText = "What does it mean? " + (
        score >  250 ? " It means everyday is a battle filled with awkward glances and clunky body parts. " :
        score >  180 ? " It means when you're in your element you're most likely fine. Buuut when outside of you're comfort zone shit gets weird." :
        score >  120 ? " It means your days are tough but you've figured out a few survival strategies." :
        score >  60 ? " It means you have your moments but generally you're fine." :
        score >   0 ? " It means you're one of the few people who own every room you walk into, congratulations!" :
                     " Hey! you didn't even answer any of the questions. This is Awkward."
    );

    $('.result').text(results);
    $('.result-text').text(resultsText);
    $('.final-score').text(score);

    // $('.output').show();

}

$().ready(function(){
    $(".calc").change(function(){
        calcscore()
    });
});


$('.start-over').on('click',function(e){
        e.preventDefault;
        location.reload();
});


console.log("Thanks for checking out my game (:");



