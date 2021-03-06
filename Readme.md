# Aplicaciones Interactivas Backend

Web server built in Node.js for the backend of the Interactive Applications project (UADE 2020).

## Heroku cloud deployed version

If you want to view the project without having to install it locally, you can access the version deployed in Heroku [clicking here!](https://interactivas-backend.herokuapp.com/)

## Installation and local deployment

Use the [node package manager](https://www.npmjs.com/) commands after clone the repository to install all the necessary dependencies to run the project locally.

```bash
npm install
```

Once the dependencies are installed, use this command to run the server on the default 3002 port.

```bash
npm run start
```

## MongoDB Database

Our database is implemented using MongoDB, a NoSQL database system. It is deployed in [Mongo Atlas](https://www.mongodb.com/cloud/atlas), a global cloud database service for modern applications.
To access it you can use [Mongo Compass](https://www.mongodb.com/products/compass), the GUI for MongoDB.
We provide you with the following connection string to access the records and collections of the database with read-only permission through Mongo Compass:
```bash
mongodb+srv://readOnly:readOnly@cluster0.iafee.mongodb.net/appInteractivasDataBase
```

## API Docs

If you want to view the API documentation [click here!](https://interactivas-backend.herokuapp.com/api-docs/)

## Authors
- Lautaro Mitelman
- Ariel Nastasi
- July Marcela Bustamante
- German Morone
- Valentin Saettone

## License
[MIT](https://choosealicense.com/licenses/mit/)