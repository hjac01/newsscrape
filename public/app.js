function getResults(newPost) {
    $("tbody").empty();
newPost.forEach(function(post) {
    var tr = $("<tr>").append(
      $("<td>").text(title),
      $("<td>").text(link),
    );

    $("tbody").append(tr);
  });

}

$.getJSON("/", function(data) {
    getResults(data);
});

getResults();
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



  
  
