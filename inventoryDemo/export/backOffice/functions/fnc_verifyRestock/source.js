exports = async function(recipient, aStoreId, aItemName, aQuantity) {
  
  const twilio = context.services.get("SupplierService");
  const ourNumber = context.values.get("ourNumber");
  var codes = context.services.get("mongodb-atlas").db("InventoryDemo").collection("codes");
  var vcompanyName = await context.functions.execute("fnc_getCompanyName");
  var vcompanyLogo = await context.functions.execute("fnc_getCompanyLogo");

  console.log(JSON.stringify("fnc_verifyRestock called with arguments: " + recipient + ", " + aStoreId + ", " + aItemName + ", " + aQuantity));
  console.log("COMPANY_NAME: "+ vcompanyName);
  
  twilio.send({
    from: ourNumber,
    to: recipient,
    body: `Hello from ${vcompanyName}. We are below our minimum quantity and need to restock.  We only have ${aQuantity} units of ${aItemName} for store ${aStoreId}. Reply with the number of items you can deliver in the next 24 hours. Use 0 if you can not deliver.`,
    mediaUrl: vcompanyLogo
  });
};