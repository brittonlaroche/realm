exports = async function(argItemDoc){
  /*
    Accessing application's values:
    var x = context.values.get("value_name");

    Accessing a mongodb service:
    var collection = context.services.get("mongodb-atlas").db("dbname").collection("coll_name");
    var doc = collection.findOne({owner_id: context.user.id});

    To call other named functions:
    var result = context.functions.execute("function_name", arg1, arg2);

    Try running in the console below.
  */
  console.log("fnc_geoFence argItemDoc: " + JSON.stringify(argItemDoc));
  var storeLocCollection = context.services.get("mongodb-atlas").db("InventoryDemo").collection("location");
  const twilio = context.services.get("SupplierService");
  const ourNumber = context.values.get("ourNumber");
  var storeDoc = {};
  if (argItemDoc._partition.includes("T")) { 
    console.log("fnc_geoFence detected delivery truck");
    var tLong = parseFloat(argItemDoc.coordinates[0]);
    var tLat = parseFloat(argItemDoc.coordinates[1]);
    //see if we are within 100 meters of the store
    storeDoc = await storeLocCollection.findOne({coordinates: {$geoWithin: { $centerSphere: [ [ tLong, tLat ], 0.000015666312716083038 ]}}})
    if (storeDoc){
      console.log("Truck arrived at store:  " + storeDoc._partition);
      if (argItemDoc.supplier) {
        twilio.send({
          from: ourNumber,
          to: argItemDoc.supplier,
          body: `This is an alert that ${argItemDoc.name} has arrived at store ${storeDoc.store_id}. Please check the back office application to begin receiving`
        });
      }
    }
    
    return storeDoc;
  }
  
  
  storeDoc = await storeLocCollection.findOne({"store_id": argItemDoc._partition},{"coordinates":1});
  console.log("fnc_geoFence storeDoc: " + JSON.stringify(storeDoc));
  if(storeDoc){
    var storeLong = Math.abs(parseFloat(storeDoc.coordinates[0])*1000000);
    var storeLat = Math.abs(parseFloat(storeDoc.coordinates[1])*1000000);
    var itemLong = Math.abs(parseFloat(argItemDoc.coordinates[0])*1000000);
    var itemLat = Math.abs(parseFloat(argItemDoc.coordinates[1])*1000000);
    
    //console.log("storeLong: " + storeLong);
    //console.log("storeLat: " + storeLat);
    //console.log("itemLong: " + itemLong.toString());
    //console.log("itemLat: " + itemLat.toString());
    var longDist = Math.abs(parseFloat(storeLong - itemLong));
    var latDist = Math.abs(parseFloat(storeLat - itemLat));
    //console.log("longDist: " + longDist);
    //console.log("latDist: " + latDist);
    if (longDist > 1000 || latDist > 1000 ) {
      console.log("Store is outside of Item's Geo Fence!");
      var vcompanyName = await context.functions.execute("fnc_getCompanyName",argItemDoc._partition);
      //var vcompanyLogo = await context.functions.execute("fnc_getCompanyLogo",argItemDoc._partition);
      var recipient = argItemDoc.supplier;
      if (recipient) {
        twilio.send({
          from: ourNumber,
          to: recipient,
          body: `Hello from ${vcompanyName}. This is an alert that ${argItemDoc.name} has left store ${argItemDoc._partition}. Please check the back office application to locate your device`//,
          //mediaUrl: vcompanyLogo
        });
      }
    }
  }
  return storeDoc;
};