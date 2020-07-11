
# Inventory Demo

[![GitHub license](https://img.shields.io/badge/license-Apache-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)

This repo contains a simple Inventory tracking app for iOS and Android that can synchronise your Inventory Items between devices via Realm sync to our Atlas Server.

Checkout the README.md in each directory!

# License

Distributed under the Apache license. See ``LICENSE`` for more information.

# Welcome to the Realm Inventory Demo.   

## Tutorial Contents 
[Overview](#-overview)
1. [Create the Atlas Cluster](#-create-an-atlas-cluster)
2. [Configure the RealmSync Project](#-configure-the-realmsync-project)
3. [Set up the mobile development environment](#-set-up-the-mobile-development-environment)
4. [Import the Back Offcie Application](#-import-the-back-office-application)
5. [Host the HTML](#--host-the-html)
6. [Set up Twilio](#--set-up-twilio)
7. [Set up Charts](#--set-up-charts)
8. [Integrate with Kafka](#--integrate-with-kafka)


## Overview:
This demo has three distinct parts that interact to show end to end functionality of Realm and Atlas with other systems.  

- __sync:__ consits of a mobile demo with syncronized access to Atlas data.  
- __backOffice__ takes advantage of Atlas integration with serverless functions and triggers that interact with REST, Kafka and Twilio.   
- -> __html files__ inside the back office is a Realm hosted application written with dymanic HTML and the browser SDK to act as an admin console showing inventory items across all stores.

This documentation is focused on helping you install and confiure the Realm Demo.  Special thanks to __Nate Cotino__ for creating the Realm Android mobile application written in Kotlin with Android studio.  Also special thanks to __Chris Grabosky__ who created a great GraphQL tutorial on how to connect to Atlas and use GraphQL.  Both of their githubs are linked below and will be used as part of this demo.

https://github.com/nathan-contino-mongo/inventory-system   
https://github.com/graboskyc/MongoDBStitchGraphQL   

This project integrated mobile devices with an Atlas cluster and allows for seamless syncroniaztion of mobile data with the MongoDB Atlas database running in the cloud.  Additionally it shows how to use realm functions and triggers to integrate with other cloud poviders and tools such as Kafka running in the Confluent Cloud, or being able to send an SMS message through twilio to any mobile device.  This demonstration shows how to create rest, and GraphQL endpoints for integration with business to business  or business to customer consumers allowing third party applications to query data stored in Atlas across all mobile devices.  As data is changed in Atlas it is automatically sycnronized with the mobile devices.

We show how all the pieces fit together in the Orthoginal Diagram below.

## Diagram
![Overview Diagram](./img/RealmInventoryDemo2.png)


## Philosophy   
We believe that there is power in simpliclicity.  We did not include any frameworks and kept to a minimalist "hand rolled" design to showcase functionality.  To that end when forced to make a choice on a mobile development platform we chose Android Kotlin as we felt it was the easiest for a new developer to work with. Additionally Kotlin compiles to native code and has a light foot print on the mobile device in terms of CPU, Memory and Battery consumption.  Additionally, the vast majority of hand held devices manufactured for use in commercial applications is typically on Android as it is a better choice than Apple devices when considering manufacturing cost. Andorid also provides greater flexiblity to design a customized look and feel as well as greater control of the components used in manufacturing to determine the mobile device performance. [The MongoDB Realm Documentation](https://docs.mongodb.com/realm/) has great tutorials on getting started with React Native, and iOS as well as other development platforms.

Its an 8 step process to install the end to end Realm Inventory System Demo.  The following sections walk us through each step in great detail.  Its not a difficult process but it does require following a prescribed set of steps to be succesful.  Estimated time to completion about 60 to 90 minutes.  Each step yields its own independent results so you will see great progress and powerful features along the way.

## ![1](https://github.com/brittonlaroche/MongoDB-Demos/blob/master/Stitch/tools/img/1b.png) Create an Atlas Cluster
Our first step is to create an atlas cluster. In our example we wont be able to create a free tier cluster known as an M0. The reason is that Realm Sync requires MongoDB version 4.4 and it is not available on the free tier at this time (2020-06-30).  Additionally we have more than 5 triggers in our demo.  Realm sync by default will work on an M0 in the future. For now select an M2 through M10 to get started. If you are interetsed in using the Atlas Kafka connector through Confluent Cloud you will want to create an AWS cluster in East US 2.  You can always migrate your cluster to this region in the future.

Click the following link https://cloud.mongodb.com to sign up. Additional instructions on creating an Atlas cluster are available here: [Atlas getting started Guide](https://docs.atlas.mongodb.com/getting-started/)  

## ![2](https://github.com/brittonlaroche/MongoDB-Demos/blob/master/Stitch/tools/img/2b.png) Configure the RealmSync Project   
We have two options to create the realm sync Atlas project.  One is to import the existing project in this github, and the other is to create it by hand.  To import the realm project follow the instructions outlined in step 4.  When you get to step 4.4 execute the following code to link the sync project... the path __"/realm-master/inventoryDemo/export/sync"__ is the only change.

```
realm-cli import --path=./realm-master/inventoryDemo/export/sync --strategy=replace
```

__NOTE: YOU DO NOT NEED TO DO ANY OF THE REST OF THE STEPS IN SECTION 2 IF YOU IMPORT THE APP. GO TO SECTION 2.6 AND CREATE USER ACCOUNTS__

#### 2.1. Creating the inventorySync project Manually.
If you wish to create the SYNC application from scratch follow th enext few step in section 2. To start the sync process we need to create and Atlas realm application to sync data from the mobile device to the Atlas database.  We start by clicking the "__Realm__" tab in the upper middle tab of the Atlas console.  Then we select the green __"Create a New App"__ button in the upper right.

![createapp](./img/2.1.createRealmSync.png)

#### 2.2. Name the App InventorySync  
This brings up the __"New Application"__ Dialog window.  We give the application a name __"InventorySync"__ and select our atlas cluster to link the application.  Then we press the Create Realm Application Button.   
![Name App](./img/2.2.appName.png)

#### 2.3. Copy the AppID   
When the application is created we need to copy the AppID into our clipboard and save it for later use when connecting our mobile device to Atlas (Step 3.4 Below)
![App ID](./img/2.3.realmAppId.png)

#### 2.4. Creating the Schema   
Next we create a schema for our mobile application. Slected the rules tab and creat a new rule for a database "InventoryDemo" and a collection "InventoryItem." Next click on the schema tab and copy the sechema below into the schema for the application.  This schema is responsible for transalting the Realm Objects stored on the mobile devices to JSON documents on the Atlas server and vice versa.  The schema can be generated two other ways, one from existing data in Atlas, or another by going into development mode on the __sync__ window laucnhed by selecting the __sync__ menu item on the left navigation panel of the Realm console.


![Realm Schema](./img/2.4.realmSchema.png)
```js
{
  "title": "InventoryItem",
  "bsonType": "object",
  "required": [
    "_id",
    "_partition",
    "name",
    "price",
    "quantity"
  ],
  "properties": {
    "_id": {
      "bsonType": "objectId"
    },
    "_partition": {
      "bsonType": "string"
    },
    "name": {
      "bsonType": "string"
    },
    "price": {
      "bsonType": "double"
    },
    "quantity": {
      "bsonType": "long"
    }
  }
}
```

#### 2.5. Turn on Sync   
Now that we have created our schema we are ready to turn on Sync.  CLick on the "__Sync__" menu item on the left hand naviagtion menu of the Realm console.  The Sync configuration windo appears and we specify the cluster to sync with and the partion key as well as define permissions.  Use __" \_partition"__ as the partition key and leave the permissions to the default empty doucment __"{}"__

![Sync](./img/2.5.realmSync.png)

We are now ready to sync our mobile application.  Start the sync process by saving the config and pressing the start sync button and deploy the changes.  If for any reason sync seems to fail feel free to pause sync, deploy the changes.  After a few moments start sync again and deploy the changes.  Terminating sync requires rebuilding the schema and starting over.

#### 2.6. Create some user accounts
There are many ways to authenticate to Realm from the mobile device. For our inventory demo we will create some users that will authenticate via email and password.  Begin by selecting the __"Users"__ menu item from the left Navigation menu pane of the Realm console.  This brings up the Realm Users window.  Click on the providers tab.  We see many ways that users can authenticate.   Click on __"Email / Password."__   

![User Providers](./img/users1.png)

Set the provider __"Enabled"__ to __"On"__ by moving the slider.  Select __"Automatically Confirm Users"__ and chose a password reset function, then select __"Create New Function"__ go with the default reset funtion and then save.

![User Password](./img/users2.png)

Now we create several new users.  These will be the users that log in through the mobile devices.  For our demo we created the following users, one at a time.  The username includes an email address.

__demo_user@gmail.com__   
__demo_user1@gmail.com__   
__demo_user2@gmail.com__   


![User Creation](./img/users3.png)

## ![3](https://github.com/brittonlaroche/MongoDB-Demos/blob/master/Stitch/tools/img/3b.png) Set up the mobile development environment  

#### 3.0. Install Android Studio  
The first step to start developing Android Apps is to download Android Studio 4.0 (minimum required version is 4.0) [here](https://developer.android.com/studio). 

#### 3.1. Download the Android Inventory project from github  
Once you have installed Android Studio you will need to download and install the mobile application from this github: https://github.com/nathan-contino-mongo/inventory-system

Move the zip file to the folder of your choice. Double click the zip file and unzip the contents. Open android studio.  

#### 3.2. Open the Inventory project 
<img src="./img/openExistingProject.png" width="700">

When android opens a small popup window opens.  Select the "Open Existing Project" open the folder where you installed the zip file /inventory-system-master.  

#### 3.3. Syncronize the Gradle Scripts 
The project will load and a small staus window will ask you to syncronize the gradle files.  Chose the options to syncronize.  If you miss the prompt you can select File / Sync Project with Gradle Files.

![gradle](./img/gradleSync.png)    

#### 3.4. Set the AppId 
On the left hand navigation pane and expand the __Gradle Scripts__ and select the build.gradle(Module: app) file.  Find the appId variable and set it to the realm sync project AppId configured in step 2.

![app](./img/appId.png)   

#### 3.4. Install Andoid SDK 10.0 API Level 29 
Ah, the sheer joy of working with android mobile apps begins with the all the dependencies!  Now we need to download the andoroid sdk 10.0 API level 29. Click the menu popup in the lower right telling you that you need to install the new Android SDK API level 29 for this project and install it.  In case you missed the subtle prompt at the bottom right to install the SDK 10 API Level 29, and you did not click to install, you have another option by going to the menu bar and selecting __Tools > SDK Manager__   

![SDK](./img/androidSDK.png)  
 
After the SDK 10.0 with API level 29 has installed you will notice that the build has begun.  You can click the build tab at the lower left to see it running.

#### 3.5. Install Andoid Virtual Devices
The final step is to download at least 3 different android virtual devices.  I prefer a Galaxy, Nexus and a Pixel.  The AVD's can be managed and downlaoded from the AVD Manager located in the main menu under __Tools > AVD Manager__

![AVD](./img/androidAVD.png)  

#### 3.6. Launch the Android Application
You can run the Inventroy Demo on a single AVD.  Just press the green arrow on the toolbar and it will run the AVD selected in the drop list to the left.  However to show syncronization to Atlas and then back to multiple devices you may want to run the application on multiple AVDs.


![AVD](./img/runMutiple.png)  


#### 3.7. Run on Mutliple Devices

<img src="./img/multipleAVD.png" width="400">

#### 3.8. Connect to Atlas via Realm Authentication

<img src="./img/login.png" width="400">

## ![4](https://github.com/brittonlaroche/MongoDB-Demos/blob/master/Stitch/tools/img/4b.png) Import the "Back Office" application

#### 4.0. Download the realm github repository
Begin by downlaoding the zip file or performing a check out of the [realm inventory application in this github](https://github.com/brittonlaroche/realm) The easiest method is to select the green clone button and download a zip file.  Take the zip file and unzip it in a directory of your choice.

The following section shows how to import the application via this GitHub and the stitch command line tool __"realm-cli"__. Knowledge of how the stitch command line works is important as you can integrate realm-cli with your CICD (continuous integration and continuous delivery) tools.  This allows you to work in your native development enviroment, commit changes to GitHub and then deploy and test as you would normally through your CICD work flow. A good overview of the stitch command line tool is provided here: [Stitch Command Line Blog Overview](https://www.mongodb.com/blog/post/mongodb-stitch-command-line-interface)


#### 4.1. Install the realm-cli tool
Begin by [Installing the Realm Command Line Interface tool](https://docs.mongodb.com/realm/deploy/realm-cli-reference/#installation)

#### 4.2. Creat a project API key
Next [Create a Project API key](https://docs.atlas.mongodb.com/configure-api-access/#programmatic-api-keys).  When you createthe API key be sure to give yourself the __"Project Owner"__ role as you will need this to import the stitch application.  

![Api Key](./img/APIKey1.png)


Right click this link [Create a Project API key](https://docs.atlas.mongodb.com/configure-api-access/#programmatic-api-keys) open in new tab. Follow intrsuction under __Manage Programmatic Access to a Project__ perform each step listed in the section __Create an API Key for a Project__ be sure to copy the private API key somewhere safe for future refence.

![Api Key](./img/APIKey2.png)

Be sure to give project owner access.    
![Api Key](./img/APIKey3.png)

Also be sure to add your IP adress

![Api Key](./img/APIKey4.png)

#### 4.3. Log in via realm-cli
log into your atlas cluster with your API key (public and private keys) with the stich command line tool.

Sample login instructions:
```
realm-cli login --api-key=my-api-key --private-api-key=my-private-api-key
```

Example login (Don't worry its not a real api key):
```
realm-cli login --api-key=ytqictxq --private-api-key=8137b118-4a36-4197-a3c7-23b73ba49775
←[0;0myou have successfully logged in as ytqictxq←[0m
```


#### 4.3.1 Create a Supplier Secret Value for Twilio
https://docs.mongodb.com/realm/deploy/realm-cli-reference/#create-a-secret   

We need to create a supplier secret for Twilio that we will update later in order to import the back office application.  Once we have logged in we run the following command:

```
realm-cli secrets add --name SupplierSecret --value=TobeUpdated
```

#### 4.4 Import the inventory back office application
After logging in the command line maintains the connection until you execute the command __realm-cli logout__.  We are now ready to import the application. The following command below should work.  Navigate to the folder where you unziped the realm git hub zip file in step 4.0. 
```
realm-cli import --path=./realm-master/inventoryDemo/export/backOffice --strategy=replace   
```   

...or cd to the backOffice directory and run 

```
realm-cli import --strategy=replace
```

Follow the prompts and respond __y__ when asked if you would like to create a new app. Press enter to accept the default values.  Change the values to match your configuration.  An example is provided below.

```
realm-cli import \path=./realm-master/inventoryDemo/export/backOffice --strategy=replace
←[0;0mUnable to find app with ID: "invnetory-ekqoy": would you like to create a new app? [y/n]:←[0m y
←[0;0mApp name [inventory]:←[0m
←[0;0mAvailable Projects:←[0m
←[0;0mProject 0 - 5ce58a9fc56c98145d922e93←[0m
←[0;0mAtlas Project Name or ID [Project 0]:←[0m
←[0;0mLocation [US-VA]:←[0m
←[0;0mDeployment Model [GLOBAL]:←[0m
←[0;0mNew app created: inventory-vibtf←[0m
←[0;0mImporting app...←[0m
←[0;0mDone.←[0m
←[0;0mSuccessfully imported 'inventory-vibtf'←[0m

realm-cli logout

```
If you get an error: __app already exists with name "Inventory"__ then the replace option did not work as expected.  Feel free to click on the realm tab and delete the existing inventory application displayed.

If you named your cluster anything other than the default __"Cluster0"__ then you will need to modify a json document to reflect your cluster name. The document is located in your directory here: /realm-master/inventoryDemo/export/backOffice/services/mongodb-atlas/config.json

If you named your cluster "DevCluster" for example you would change the __"clusterName":__ field from __"Cluster0"__ to __"DevCluster"__.  An example has been provided below.

```

{
    "id": "5d218cb4e0601bec3de065c7",
    "name": "mongodb-atlas",
    "type": "mongodb-atlas",
    "config": {
        "clusterName": "DevCluster",
        "readPreference": "primary",
        "wireProtocolEnabled": false
    },
    "version": 1
}
```
Once you save your changes you are ready to try the import again.

### 4.5 Set up user accounts
Follow the same process as in [2.6 Set up User accounts](#26-create-some-user-accounts)  We will be creating back end users that have differnt access to the data than the froint end mobile users.  Creating two sets of users gives us greater ability to create and control who has access to what data.  

## ![5](https://github.com/brittonlaroche/MongoDB-Demos/blob/master/Stitch/tools/img/5b.png)  Host the HTML

 We will need to modify the files in the following directory.  Replace the appId to "inventory-hhsot" your to your application id.
 realm/inventoryDemo/export/backOffice/hosting/files/

![Hosting 1](./img/hosting1.png)  
![Hosting 2](./img/hosting1a.png)  

```
    <script>
        const sdk = new ChartsEmbedSDK;
        const client = stitch.Stitch.initializeDefaultAppClient('<your-appId>');
        const db = client.getServiceClient(stitch.RemoteMongoClient.factory,
        "mongodb-atlas").db('InventoryDemo');
        function displayItemsOnLoad() {
          client.auth
            .loginWithCredential(new stitch.AnonymousCredential())
            .then(displayItems)
            .then(defaultCompany)
            .catch(console.error);
        }
```

```
https://webhooks.mongodb-stitch.com/api/client/v2.0/app/inventory-hhsot/service/addStoreItemService/incoming_webhook/addStoreItemWH
```

## ![6](https://github.com/brittonlaroche/MongoDB-Demos/blob/master/Stitch/tools/img/6b.png)  Set up Twilio
Twilio Respinse webhook is on twilio side...
https://webhooks.mongodb-stitch.com/api/client/v2.0/app/inventory-hhsot/service/SupplierService/incoming_webhook/TwilioWH
in SMS
![Twilio](./img/twilioSupplierService.png) 
![Twilio](./img/twilioWh.png) 
![Twilio](./img/twilioWhFunction.png) 
![Twilio](./img/twilioWhSettings.png) 

![Twilio](./img/twilio1.png) 
![Twilio](./img/twilio3.png) 
![Twilio](./img/twilioSupplierSecret.png) 


## ![7](https://github.com/brittonlaroche/MongoDB-Demos/blob/master/Stitch/tools/img/7b.png)  Set up Charts
Charts
![CHARTS](./img/chartsEmbed.png)  


## ![8](https://github.com/brittonlaroche/MongoDB-Demos/blob/master/Stitch/tools/img/8b.png)  Integrate with Kafka
![Kafka](./img/Kafka1.png) 
![Kafka](./img/Kafka2.png) 
