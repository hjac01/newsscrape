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
$(document).on("click", "#clear-all", function() {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/",
    // On a successful call, clear the #results section
    success: function(posts) {
      $("#results").empty();
    }
  });
});

  
  
