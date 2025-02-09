# todo-be

## Running with docker
Frontend part of the application can be found here https://github.com/StingrayFG/todo-fe

To build the backend image, run ``` sudo docker buildx build -t todo-be . ``` from the project root.


## Running without docker
From the project root run
```
npm i
cp .env.example .env
```
After that, configure the DATABASE_URL environment variable value in the .env file according to your configuration of postgresql in the system.


In case of you not having postgresql installed in your system, you can run it in a container using docker with the following command:
```sudo docker run --name my-postgres -e POSTGRES_PASSWORD=123 -d -p 5433:5432 postgres```

Then run the following:
```
npx prisma migrate dev
npm start
```
Following that, the backend app should be available on http://localhost:4001/




