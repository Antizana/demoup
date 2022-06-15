# DemoUP App

## Description

DemoUp Coding Challenge.

## Software Prerequisites

* MySQL
* Nodejs v16.15
* NPM 8.11

## Steps to Build the App

```bash
git clone https://github.com/Antizana/demoup.git
```

Modify the file `orm.config.json` and add the MySQL configuration parameters

```json
{
  "type": "mysql",
  "username": "THE_DATABASE_USERNAME_HERE",
  "password": "THE_DATABASE_PASSWORD_HERE",
  "host": "THE_DATABASE_ENDPOINT_HERE",
  "port": "THE_DATABASE_PORT_HERE",
  "database": "THE_DATABASE_NAME_HERE",
  "entities": ["src/**/**/*.entity{.ts,.js}"],
  "migrations": ["src/database/migrations/*{.ts,.js}"],
  "cli": {
    "migrationsDir": "src/database/migrations"
  }
}
```

Modify the file `.env` and add the environment configuration parameters

```text
PORT=THE_API_PORT_HERE
HOST=THE_DATABASE_ENDPOINT_HERE
USERNAME=THE_DATABASE_USERNAME_HERE
PASSWORD=THE_DATABASE_PASSWORD_HERE
DATABASE=THE_DATABASE_NAME_HERE
DB_PORT=THE_DATABASE_PORT_HERE
```

### Creating the Database

Open a terminal and change to the DemoUP directory and run the migrations for the database.

```bash
cd demoup/back
npm run migration:run
```

Open a terminal and change to the DemoUP Backend directory

```bash
cd demoup/back
npm install
npm run dev
```

## Api Endpoints

### Retrieve Products Information

```bash
curl --location --request GET 'http://localhost:8000/api/v1/products'
```

```text
[
    {
        "product_id": 394,
        "name":"",
        "customerI18N_Name": "Water Smart Flow"
        "Model_Number": "8188,8188-20,8188-24,8188-29"
    },
]
```
