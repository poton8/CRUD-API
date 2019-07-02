#Get curl command
curl -X GET http://localhost:3000/employees

#Get specific employee curl command
curl -X GET http://localhost:3000/employees/942bf3f5-bfeb-4311-b437-ee65ae8b451b

#Put curl command
curl -X PUT -H "Content-Type: application/json" http://localhost:3000/employees/942bf3f5-bfeb-4311-b437-ee65ae8b451b -d "{\"name\":\"james\"}"

#Post curl command
curl -X POST -H "Content-Type: application/json" http://localhost:3000/employees -d "{\"name\":\"lisa\"}"

#Delete curl command
curl -X DELETE http://localhost:3000/employees/942bf3f5-bfeb-4311-b437-ee65ae8b451b