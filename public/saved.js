function getResults(posts) {
    posts.forEach(function(post) {
      var tr = $("<tr>").append(
        $("<td>").text(post.title),
        $("<td>").text(post.link),
        $("<td>").append(
          `<button class="save-article" value = ${post._id}> Save article</button>`
        )
      );
  
      $("tbody").append(tr);
    });
  }


  $.getJSON("/api/posts/saved", function(posts) {
    console.log(posts);
    getResults(posts);
  });