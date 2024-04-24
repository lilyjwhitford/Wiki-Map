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

Browse - GET  / and redirect to /maps (home page/list of maps)
Read   - GET  /api/maps/:map_id (clicking onto a specific map)
Edit   - POST /maps/:map_id/edit (modifying a map's name or image)
Add    - POST /maps/new (creating a new map)
Delete - ? 


MARKERS

Browse - ? (maps autopopulate the markers in /maps/:map_id)
Read   - GET  /api/maps/:map_id/:marker_id
Edit   - POST /maps/:map_id/:marker_id/edit 
Add    - POST /maps/:map_id/new
Delete - POST /maps/:map_id/:marker_id/delete



 