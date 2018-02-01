## Software Engineering 2017

### Kid activities booking system

### Members

We are **Team Rocket** and here are our member details:

| Full Name 		    	| Student ID | E-mail 					|
| ------------------------- | ---------- | ------------------------ |
| Βασιλόπουλος Εμμανουήλ 	| 3110795	 | sk8ermanos@gmail.com 	|
| Μποστάνης Απόστολος		| 3111579	 | mpoapostolis@gmail.com	|
| Μαρούσης Νικόλαος		    | 3111025	 | n.marousis@gmail.com 	|
| Γεωργακόπουλος Ιωάννης	| 3111512	 | john.k.georg@gmail.com	|
| Virgilio Tello Garcia	    | 3117622	 | virgilio.tello@gmail.com	|


### vm link 191.232.180.111

### Usage
Pull then run:
```
cd /app && npm run build
docker-compose up -d
```

Navigate to `http://localhost:4000` or `https://localhost:4001`.

### Useful stuff.
Starting a single service by name (along with its dependencies). Omit the `-d`
option to attach to container (aka view shell output).

If no service_name is supplied, then **all** services are started.
```
docker-compose up -d service_name
```

Print the status report of all containers.
```
docker-compose ps
```

Stopping a service by name.

If no service_name is supplied, all services are stopped.
```
docker-compose stop service_name
```

Re-build a **stopped** service.
```
docker-compose build service_name
```

For details about the deployment configuration, take a look at the file named
`docker-compose.yml`. You can check out its language reference
[here](https://docs.docker.com/compose/compose-file/compose-file-v2/).
