SETUP:

For Backend:

First install all dependencies for the backend with the following commands:
```bash
cd backend
npm install
npm run dev
```

Now, the server would be running on default port 5000. You can add a PORT variable in the backend .env file to alternate the server port.

For Frontend:

Redirect to the frontend folder under root and install all depencencies with the following commands:
```bash
cd ../frontend
npm install
npm start
```

The app would be running on default port 3000.


For Database Migration:

This project uses node-pg-migration for database migration. Under the root there is a migrations folder, in which neccessary migration files for user and tasks tables have been provided. 

Before the migration, check for the backend package.json for the following scripts:

```json
    "scripts": {
    "migrate": "node-pg-migrate up",
    "migrate:down": "node-pg-migrate down"
    }
```

Then update the DATABASE_URL in the backend .env file:

```bash
DATABASE_URL=postgres://<your_username>:<your_password>@localhost:5432/taskdb
```

With the DATABASE_URL updated, run the following command to migrate the tables to your database.

```bash
npm run migrate
```


Expected Salary:
I wish to have a minimum of 20$/hr so 3600 monthly salary. Thank you for your consideration.  