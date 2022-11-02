# Node ES6 URL Shortener

![](https://img.shields.io/badge/node-success-brightgreen.svg)
![](https://img.shields.io/badge/test-success-brightgreen.svg)

# Stack

![](https://img.shields.io/badge/node_16-✓-blue.svg)
![](https://img.shields.io/badge/ES6-✓-blue.svg)
![](https://img.shields.io/badge/express-✓-blue.svg)
![](https://img.shields.io/badge/mongoDB-✓-blue.svg)

***

<h3 align="center">Please help this repo with a :star: if you find it useful! :blush:</h3>

***

# File structure

```
zippia-be-url-shortener-app/
│
├── api/
│   ├── controllers/
│   │   └── UrlController.js
│   │
│   ├── models/
│   │   └── Url.js
│   │
│   └── helpers/
│      └── base58.js
│
├── docs/
│   ├── swagger.yaml
|
├── lib/
│   ├── http-response/
│   │   ├── index.js
│   │
│   ├── models/
│   │   ├── index.js
│   │   └── shortUrl.model.js
│   │
│   ├── util/
│   │   ├── index.js
│   
├── routes/
│   ├── urls/
│   │   ├── index.js
│   │   |── UrlController.js
│   │   └── UrlRoute.js
│   │
│   ├── index.js
│
│
│
├── .gitignore                    * Example git ignore file
├── .env.sample                   * Sample configuration file
├── index.js                      * Entry point of our Node's app
├── package.json                  * Defines our JavaScript dependencies
├── yarn.lock                     * Defines our exact JavaScript dependencies tree
└── README.md                     * This file
```

# Screenshot

<p align="center">
  <img src="https://github.com/metaronaksethi/zippia-be-url-shortener-app/blob/master/screenshot.png" width="90%" />
</p>

# Introduction

## What's a URL Shortener?

 URL shortening is a technique to convert a long URL (site or page address) to a shorter version. This shorter version of the URL is usually cleaner and easier to share or remember. When someone accesses the shortened address, the browser redirects to the original (large) url address. It is also called URL redirection or URL redirect.

For example, the large version of this url:
http://en.wikipedia.org/wiki/URL_shortening

Can be shortened with bit.do service to this small address, that redirects to the previous longer address:
http://bit.do/urlwiki

## How does it work?

Essentially, your database has 6 fields: `primaryKey`, `urlId`, `shortUrl`, `expireAt`, `createdAt` and `origUrl`.

Normally the `urlId` is simply the `primaryKey` (which is an int) converted to another base. So for instance base 62 (so 0 through 9, and then 'a' through 'z' then 'A' through 'z').

This makes it easy to look up the `targetURL` in the database, since you can just decode it to base 62 and find the primary key.

You will also have short URLs since the number of URLs you can have is 62^n where n is the number of characters in the shortened URL. So you can see that just with 4 letters you can have a possible of 2,313,441 different URLs. If you use capital letters (a larger base), this gets even larger. 

## How to use this code?

1. Make sure you have the latest stable version of Node.js installed

```
$ sudo npm cache clean -f
$ sudo npm install -g n
$ sudo n stable
```

2. Configure your database  in `env.api`. For example `.env.api` would look like this:

```js
see the sample env file for reference
```
  
3. Fork this repository and clone it
  
```
$ git clone https://github.com/<your-user>/zippia-be-url-shortener-app
```
  
4. Navigate into the folder  

```
$ cd zippia-be-url-shortener-app
```
  
5. Install NPM dependencies

```
$ npm install or yarn 
```
  
6. Make sure you have a MongoDB up and running


7. Run the project

```
$ node index.js  or yarn run start or npm run start
```
  
8. Or use `nodemon` for live-reload
  
```
$ npm start
```

> `npm start` will run `nodemon index.js`.

9. Navigate to `http://localhost:3000` in your browser to test it! or your configurable PORT


# Contribution

- Report issues
- Open pull request with improvements
- Spread the word
- Reach out to me directly at <ronak.sethi@metacube.com>
