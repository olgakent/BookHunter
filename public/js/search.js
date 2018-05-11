// Search filter function for the all books page

function searchBooks() {
    // Declare variables
    //console.log("typed");
    var input, filter, cards, spans, span, i;
    input = document.getElementById('input');
    filter = input.value.toUpperCase();

    // array of all the cards
    cards = document.querySelectorAll(".col-sm-3");

    // array of the spans containing the title and author
    spans = document.querySelectorAll(".hide-text");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < spans.length; i++) {
        span = spans[i];
        if (span.innerHTML.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}
