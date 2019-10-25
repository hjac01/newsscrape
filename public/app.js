function getResults(posts) {
posts.forEach(function(post) {
    var tr = $("<tr>").append(
      $("<td>").text(post.title),
      $("<td>").text(post.link),
      $("<td>").append(`<button class="save-article" value = ${post._id}> Save article</button>`)
    );

    $("tbody").append(tr);
  });

}

$.getJSON("/api/posts", function(posts) {
  console.log(posts)
    getResults(posts);
});

$.getJSON("/api/posts/saved", function(posts) {
  console.log(posts)
    getResults(posts);
});


// getResults();
$(document).on("click", "#scrape-new", function() {
  $("#results").show();
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "/api/scrape",
      success: function(posts) {
        $.getJSON("/api/posts", function(data) {
          console.log(data)
            getResults(data);
        });
  
      }
      
    })

  });

  //clear articles button
$(document).on("click", "#clear-all", function() {
  console.log("clicked")
  $("#results").hide();
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/",
    
  });
});

$(document).on("click", ".save-article", function() {
  console.log("saving article")
  var id = $(this).val()
  console.log(id)
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/api/posts",
      data: {
        id: id
      },
      success: function(posts) {
        console.log("updated")
        
      }
      
    })

  });


  
  
