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

Modify the file `.env` and add the environment configuration parameters

```text
REACT_APP_API_URL=THE_API_URL_HERE
```

### Creating the Database

Open a terminal and change to the Accounts Backend directory

```bash
cd demoup/front
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
