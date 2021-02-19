exports = async function(recipient, aStoreId, aItemName, aQuantity, aMinQuantity) {
  /*===============================================================
  - Date:       Author:           Version:        Notes:
  -----------------------------------------------------------------
  - 2020-06-24  Britton LaRoche   1.0            Initial Release
  -
  ===============================================================*/
  
  const twilio = context.services.get("SupplierService");
  const ourNumber = context.values.get("ourNumber");
  var codes = context.services.get("mongodb-atlas").db("InventoryDemo").collection("codes");
  var vcompanyName = await context.functions.execute("fnc_getCompanyName",aStoreId);
  var vcompanyLogo = await context.functions.execute("fnc_getCompanyLogo",aStoreId);

  console.log(JSON.stringify("fnc_verifyRestock called with arguments: " + recipient + ", " + aStoreId + ", " + aItemName + ", " + aQuantity));
  console.log("COMPANY_NAME: "+ vcompanyName);
  
  /*
  //Zebra
  twilio.send({
    from: ourNumber,
    to: recipient,
    body: `Hello from ${vcompanyName}. We have a configuration number of ${aQuantity} for ${aItemName} for store ${aStoreId}, we need a minimum configuration of ${aMinQuantity}. Please update your device, or respond with 1 to apply the next configuration.`
  });
  */

  //Normal
  twilio.send({
    from: ourNumber,
    to: recipient,
    body: `Hello from ${vcompanyName}. We have ${aQuantity} units of ${aItemName} for store ${aStoreId}, we need a minimum of ${aMinQuantity}. Please reply with the number of units you can deliver. 0 if you can not deliver.`
  });
  
  
  /*
  twilio.send({
    from: ourNumber,
    to: recipient,
    body: `Hello from ${vcompanyName}. We have ${aQuantity} units of ${aItemName} for store ${aStoreId}, we need a minimum of ${aMinQuantity}. Please reply with the number of units you can deliver. 0 if you can not deliver.`,
    mediaUrl: vcompanyLogo
  });
  */
  
};