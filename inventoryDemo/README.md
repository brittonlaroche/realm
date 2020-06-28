
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

This documentation is focused on helping you install and confiure the Realm Demo.  Special thanks to __Nate Cotino__ for creating the Android application written in Kotlin with Android studio.  Also special thanks to __Chris Grabosky__ who created a great GraphQL tutorial on how to connect to Atlas and use GraphQL.  Both of their githubs are linked below and will be used as part of this demo.

https://github.com/nathan-contino-mongo/inventory-system   
https://github.com/graboskyc/MongoDBStitchGraphQL   

This project integrated mobile devices with an Atlas cluster and allows for seamless syncroniaztion of mobile data with the MongoDB Atlas database running in the cloud.  Additionally it shows how to use realm functions and triggers to integrate with other cloud poviders and tools such as Kafka running in the Confluent Cloud, or being able to send an SMS message through twilio to any mobile device.  This demonstration shows how to create rest, and GraphQL endpoints for integration with business to business  or business to customer consumers allowing third party applications to query data stored in Atlas across all mobile devices.  As data is changed in Atlas it is Automatically sycnronized with the mobile devices.

We show how all the pieces fit together in the Orthoginal Diagram below.

 # Diagram
![Overview Diagram](./export/html/img/RealmInventoryDemo.png)


