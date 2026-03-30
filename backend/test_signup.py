import urllib.request
import json
import urllib.error

data = json.dumps({'username': 'testuser2', 'email': 'test2@test.com', 'password': 'password123'}).encode('utf-8')
req = urllib.request.Request('http://localhost:8000/signup', data=data, headers={'Content-Type': 'application/json'})
try:
    res = urllib.request.urlopen(req)
    print("SUCCESS", res.read())
except urllib.error.HTTPError as e:
    print("STATUS", e.code)
    print("BODY", e.read().decode('utf-8'))
except Exception as e:
    print("ERROR", e)
