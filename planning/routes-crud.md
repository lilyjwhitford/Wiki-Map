# CRUD/BREAD / routes

USERS

Browse - ? 
Read   - GET /users/:user_id (Users can view their profile)
Edit   - ?
Add    - ?
Delete - ? 

Login/Logout
GET /login (login page)
POST /logout (deletes cookie & redirects to homepage)


MAPS

Browse - GET  /maps (show list of maps)
Read   - GET  /maps/:map_id (view a specific map)
Edit   - POST /maps/:map_id (modifying a map's name or image)
Add    - GET  /maps/new (form for creating a new map)
       - POST /maps (create new map)
Delete - POST /maps/:map_id/delete (delete map)


MARKERS

Browse - ? (maps autopopulate the markers in /maps/:map_id)
Read   - GET  /api/maps/:map_id/markers (JSON data of one maps markers)
Edit   - POST /api/maps/:map_id/markers/:marker_id(retrieving updated data)
Add    - POST /api/maps/:map_id/markers (add marker for specific map, returns JSON of the new row)
Delete - POST /api/maps/:map_id/markers/:marker_id/delete



 