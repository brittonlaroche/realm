
# Inventory Demo

[![GitHub license](https://img.shields.io/badge/license-Apache-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)

This repo contains a simple Inventory tracking app for iOS and Android that can synchronise your Inventory Items between devices via Realm sync to our Atlas Server.

Checkout the README.md in each directory!

# License

Distributed under the Apache license. See ``LICENSE`` for more information.

# Welcome to the Realm Inventory Demo.   

## Overview:
This demo has three distinct parts that interact to show end to end functionality of Realm and Atlas with other systems.  

- __sync:__ consits of a mobile demo with syncronized access to Atlas data.  
- __backOffice__ takes advantage of Atlas integration with serverless functions and triggers that interact with REST, Kafka and Twilio.   
- __html__ is a Realm hosted application written with dymanic HTML and the browser SDK to act as an admin console showing inventory items across all stores.

This documentation is focused on helping you install and confiure the Realm Demo.  Special thanks to __Nate Cotino__ for creating the Realm Android mobile application written in Kotlin with Android studio.  Also special thanks to __Chris Grabosky__ who created a great GraphQL tutorial on how to connect to Atlas and use GraphQL.  Both of their githubs are linked below and will be used as part of this demo.

https://github.com/nathan-contino-mongo/inventory-system   
https://github.com/graboskyc/MongoDBStitchGraphQL   

This project integrated mobile devices with an Atlas cluster and allows for seamless syncroniaztion of mobile data with the MongoDB Atlas database running in the cloud.  Additionally it shows how to use realm functions and triggers to integrate with other cloud poviders and tools such as Kafka running in the Confluent Cloud, or being able to send an SMS message through twilio to any mobile device.  This demonstration shows how to create rest, and GraphQL endpoints for integration with business to business  or business to customer consumers allowing third party applications to query data stored in Atlas across all mobile devices.  As data is changed in Atlas it is automatically sycnronized with the mobile devices.

We show how all the pieces fit together in the Orthoginal Diagram below.

## Diagram
![Overview Diagram](./export/html/img/RealmInventoryDemo.png)


## Philosophy   
We believe that there is power in simpliclicity.  We did not include any frameworks and kept to a minimalist "hand rolled" design to showcase functionality.  To that end when forced to make a choice on a mobile development platform we chose Android Kotlin as we felt it was the easiest for a new developer to work with. [The MongoDB Realm Documentation](https://docs.mongodb.com/realm/) has great tutorials on getting started with React Native, and IOS as well as other development platforms.

https://github.com/brittonlaroche/MongoDB-Demos/blob/master/Stitch/tools/img/1b.png

## ![1](https://github.com/brittonlaroche/MongoDB-Demos/blob/master/Stitch/tools/img/1b.png)Create and Atlas Cluster
The first step is to crete an Atlas cluster.

## Configure the RealmSync Project   
We will now import the realm sync project.

## Set up the mobile development environment   
The next step is to download Android Studio 4.0 (minimum required version is 4.0) [here](https://developer.android.com/studio). Once you have installed Android Studio you will need to downlaod and install the mobile application from this github: https://github.com/nathan-contino-mongo/inventory-system

## Import the "Back Office" application

## Host the HTML
