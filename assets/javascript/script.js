let results = {}


const giphyAPIkey = 'zBP8Z4KrkNQ6v7Lm9gjyEVVqIXhY1qZp' ;

let topics = ['Kittens', 'Anime', 'Neuroscience', 'Jazz', 'JFK', 'Halloween', 'Paris', 'Pusheen', 'LSD', 'Timothy Leary']

//function to display buttons
function renderButtons(){
    $('#button-section').empty();
    for(let i=0; i < topics.length; i++){
        $('#button-section').append("<button  class='btn btn-primary btn-primary-spacing topic-button' data-topic='" + topics[i] + "'>" + topics[i] + "</button>");
    }
}


//function to add buttons for new giphy
function addNewButton(event){
    event.preventDefault();
    let topic = $('#search-input').val().trim();
    topics.push(topic);
    $('#search-input').val('');
    renderButtons();
}

//Function to display the Gifs 
function displayGifs(event){
    event.preventDefault();
    $('#giphy-section').empty();
    var gifTopic = $(this).attr('data-topic');
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifTopic + "&api_key=" + giphyAPIkey + "&limit=10";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method:  "GET"
    })
        .then(function(response){
            let results = response.data;

            for(let i=0; i<results.length; i++){
                let gifDiv = $("<div class='giphyDiv'>");

                let rating = results[i].rating;

                let p = $("<p>").text("Rating: " + rating);

                let topicImage = $('<img>');
                topicImage.attr({
                    'src': results[i].images.fixed_height_still.url,
                    'data-still': results[i].images.fixed_height_still.url,
                    'data-animate': results[i].images.fixed_height.url,
                    'data-state': 'still',
                    'class': 'gif',
                })
                
                gifDiv.append(topicImage);
                gifDiv.append(p);
                $('#giphy-section').append(gifDiv);
            }
        })
}


function animate(){
    let state = $(this).attr('data-state');


    if(state === 'still'){
        let newSource = $(this).attr("data-animate");
        $(this).attr('src', newSource);
        $(this).attr('data-state', 'animate');
    } else {
        let newSource =$(this).attr("data-still");
        $(this).attr('src', newSource);
        $(this).attr('data-state', 'still');
    }
}