# backend_data-defined-data.js
Data Defined Data (DDD) is a 'data defined' storage layer to your database.

[![Build Status](https://travis-ci.org/dmblack/backend_data-defined-data.js.svg?branch=master)](https://travis-ci.org/dmblack/backend_data-defined-data.js?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/dmblack/backend_data-defined-data.js/badge.svg?branch=master)](https://coveralls.io/github/dmblack/backend_data-defined-data.js?branch=master)

## Table of Contents

* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [FAQ](#FAQ)
* [Examples](#examples)

## Description

Provides an object orientated interface to a storage layer of data, defined by`
data. The result is a dynamically allocated structure to your data, stored in a
data base, with all the associated [Pros](#pros), and - hopefully - very few 
[Cons](#cons).

A Data Object is composed of;
- A 'Definition'
- A series of 'Definition' associated 'Attributes' 

Instances, of Definitions (Data Objects), are then invoked with an appropriate
definition ID, and the associated (if mandatory) attribute id's.

## Installation

You can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):


    $ npm install backend_data-defined-data.js
    $ yarn add backend_data-defined-data.js

## Usage

### Configuration

Create your database, and users, within postgres;
```$ sudo -u postgres createuser development_ddd```
```$ sudo -u postgres createuser test_ddd```
```$ sudo -u postgres createdb development_ddd```
```$ sudo -u postgres createdb test_ddd```

Then set passwords, and grant appropriate privileges;
```$ sudo -u postgres psql```
```# alter user test_ddd with encrypted password '()m-vD!-[tG-F4)';```
```# alter user development_ddd with encrypted password '()m-vD!-[tG-F4)';```
```# grant all privileges on database test_ddd to test_ddd;```
```# grant all privileges on database development_ddd to development_ddd;```
```# \q```

Important: Obviously; you should not expose dev and test to the wild.

More To Come

## FAQ
(Mostly asked by myself, to myself)

* Why does this even exist?

Initially learning about web development, I was overhwelmed with the amount of
'interfaces' and management involved in defining your databases. Though I've
always enjoyed designing and using databases - learning each new interface
quickly became frustrating.

I also found that, no matter what; there was always a point to which manual
database administrator level actions were needed on the database.

My original, and still work in progress, attempt to resolve this was to
encourage database design entirely by theTBA
TBA database provider (manual), with an
interface that then created an object orientated interface to entites scrapped
from the database. This included their relationships, everything.

Somewhere along those lines; this project was born.

DataObject, Data-Warehouse, Data Driven Data (DDD) - has been in development on
and off for about 5 years.

## Examples

TBC

## Pros

### Consolidated

A pro of such an implementation is a centralized, or consolidated, location for
location for all your different data. As it's data defined, you can simply
define any type of data you wish to store; and store it as it's own record.

As per;
    https://www.postgresql.org/message-id/42C3C382.5020108@cineca.it
    Maximum number of rows in a table?    unlimited

### Easy Segmentation

As per a bit of best practice; if you're concerned about storing different
levels of secure data - you can quickly spin up another instance. An example of
this may be your application users table. As per above, this is not a necessity,
though I personally separate the logic of authentication to an individual 
(secure) local API.

INTERNET <--> Public API <--> Private API

## Cons

### Overhead

Overhead in any action is experienced due to the queries involved. An example
may be;

Query Instance:
Get individual instance record (For eg; by id)
Get all associated Instance Attributes, using the instance id.
Get all associated Attribute meta, using the instance id (Describes attributes)
Get definition information.

In the end; this will be optimised; but is most certainly an additional layer
of complexity when managing data.

### Interface Bottleneck

Due to the way the data is stored in the database, interacting with it outside
of using this layer library becomes rather combersome - and is not recommended.

This is because the application also manages additional meta, where enabled,
such as - but not limited to;

- User ACL
- Group ACL
- Record Meta:
- - History
- - Timestamps

Therefore; interacting with the data outside of this library may bring result in
unexpected behavior with this information.
