# register
puts `curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"username":"admin", "password":"password"}' http://localhost:8000/api/register`
# login
sleep 2
puts `curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"username":"admin", "password":"password"}' http://localhost:8000/api/login`
# status
sleep 2
puts `curl -H "Accept: application/json" -H "Content-type: application/json" -X GET http://localhost:8000/api/status`
# logout
sleep 2
puts `curl -H "Accept: application/json" -H "Content-type: application/json" -X GET http://localhost:8000/api/logout`
