function getResults(posts) {
posts.forEach(function(post) {
    var tr = $("<tr>").append(
      $("<td>").text(post.title),
      $("<td>").text(post.link),
    );

    $("tbody").append(tr);
  });

}

$.getJSON("/api/posts", function(posts) {
  console.log(posts)
    getResults(posts);
});

// getResults();
$(document).on("click", "#scrape-new", function() {
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/",
      data: {
        title: $("#title").val(),
        link: $("#link").val(),
      }
    })

  });

  // When the #clear-all button is pressed
$("#clear-all").on("click", function() {
  // Make an AJAX GET request to delete the notes from the db
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/clearall",
    // On a successful call, clear the #results section
    success: function(response) {
      $("#results").empty();
    }
  });
});



  
  
