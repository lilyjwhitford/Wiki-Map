$(() => {
  $('#map-container i').on('click', () => {
    console.log('Hello');
  })
});
$(() => {
  $('#map-container i').on('click', () => {
    const userId = req.cookies.user_id;
    const mapId = req.params.map_id;
    $.ajax({
      type: "POST",
      url: `api/maps/favourites/:${mapId}`,
      success: res.json('Success'),
      error: function(xhr, status, error) {
        res.json('Error: ', error)
      }
    })
  })
});
