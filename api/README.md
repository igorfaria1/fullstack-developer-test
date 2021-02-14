# Lumen PHP Framework

## Requeriments

PHP >= 7.2 <br/>
Composer

## Documentation

1. Enter "api" folder ``cd api``
2. Install dependencies ``composer install``
3. Rename ``.env.example`` to ``.env``
4. Config database on ``.env``
5. Run Migration ``php artisan migrate``
6. Run API ``php -S localhost:3001 -t public``

## Routes

``GET`` - api/products <br/>
``GET`` - api/products/{id} <br/>
``POST`` - api/products <br/>
``PUT`` - api/products/{id} <br/>
``DELETE`` - api/products/{id} <br/>
