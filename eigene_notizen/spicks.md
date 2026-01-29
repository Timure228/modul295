1xx Informational Requests
100 Continue
2xx Successful Requests
200 OK
201 Created
204 No Content
3xx Redirects
301 Moved Permanently
302 Found
304 Not Modified
4xx Client Errors
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
418 I’m a Teapot
429 Too Many Requests
5xx Server Errors
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
Promise
Ein Promise hat 3 Zustände: pending – läuft noch; fulfilled – erfolgreich erfüllt; rejected – fehlgeschlagen
3 zentrale Funktionen / Methoden von Promise
resolve(value) – markiert das Promise als erfüllt (fulfilled) und liefert value.
reject(error) – markiert das Promise als abgelehnt (rejected) und liefert error.
finally(callback) – wird immer ausgeführt, egal ob erfüllt oder abgelehnt.
HTTP- > HTTP ist ein zustandsloses Protokoll. Client sendet Request, Server sendet Response. HTTPS = HTTP mit TLS-Verschlüsselung. HTTP nutzt TCP.
Node.js -> Node.js ist eine JavaScript-Laufzeitumgebung. Läuft serverseitig, nicht im Browser. Basiert auf der V8-Engine. Event-driven und non-blocking I/O. Gut für APIs und skalierbare Anwendungen.
HTTP-Verben (REST) -> GET – Daten lesen. POST – Daten erstellen PUT – Daten komplett ersetzen PATCH – Daten teilweise ändern DELETE – Daten löschen OPTIONS – verfügbare Methoden abfragen HEAD – wie GET, aber ohne Body
HTTP-Header
Übertragen Metadaten. Request-Header z. B.: Authorization, Accept, Content-Type.
Response-Header z. B.: Content-Type, Set-Cookie, Cache-Control. Können Caching, Authentifizierung und Inhalt steuern.
Ports (weitere Beispiele) -> 80 - HTTP. 443 - HTTPS 8080 - web servers, proxy and caching 21 – FTP 22 – SSH 25 – SMTP 3306 – MySQL 5432 – PostgreSQL
JavaScript Array Functions -> map() – transformiert Elemente. filter() – filtert Elemente
reduce() – reduziert auf einen Wert forEach() – iteriert über Elemente find() – findet erstes passendes Element  
// map  
[1, 2, 3].map(x => x * 2)  
// Output: [2, 4, 6]  
// filter  
[1, 2, 3, 4].filter(x => x % 2 === 0)  
// Output: [2, 4]  
// reduce  
[1, 2, 3, 4].reduce((sum, x) => sum + x, 0)  
// Output: 10    
// forEach  
let sum = 0  
[1, 2, 3].forEach(x => sum += x)  
// Output: 6  
// find  
[1, 2, 3, 4].find(x => x > 2)  
// Output: 3  