# CRUD/BREAD / routes

Users

Browse - ? 
Read   - GET /users/:user_id (Users can view their profile)
Edit   - ?
Add    - ?
Delete - ? 

Login/Logout
GET /login (login page)
POST /logout (deletes cookie & redirects to homepage)


Maps

Browse - GET  / and redirect to /maps (home page/list of maps)
Read   - GET  /maps/:map_id (clicking onto a specific map)
Edit   - POST /maps/:map_id (modifying a specific map's marker)
Add    - POST /maps (creating a new map)
Delete - ? 

Markers

Browse - ? (maps autopopulate the markers in /maps/:map_id)
Read   - GET  /maps/:map_id/:marker_id
Edit   - POST /maps/:map_id/:marker_id/edit
Add    - POST /maps/:map_id/new
Delete - POST /maps/:map_id/:marker_id/delete


 