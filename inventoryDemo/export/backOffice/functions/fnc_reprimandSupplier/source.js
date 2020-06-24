exports = async function(recipient) {
  /*===============================================================
  - Date:       Author:           Version:        Notes:
  -----------------------------------------------------------------
  - 2020-06-24  Britton LaRoche   1.0            Initial Release
  -
  ===============================================================*/
  const twilio = context.services.get("SupplierService");
  const ourNumber = context.values.get("ourNumber");
  var codes = context.services.get("mongodb-atlas").db("InventoryDemo").collection("codes");
  var vcompanyName = await context.functions.execute("fnc_getCompanyName");
  var vcompanyLogo = await context.functions.execute("fnc_getCompanyLogo");

  console.log(JSON.stringify("fnc_reprimandSupplier called with arguments: " + recipient));
  console.log("COMPANY_NAME: "+ vcompanyName);
  
  twilio.send({
    from: ourNumber,
    to: recipient,
    body: `Hello from ${vcompanyName}. Use 0 if you can not deliver. Last reponse was interprited as 0. Use only numbers, no commas or letters symbols or spaces.`,
    mediaUrl: 'https://inventory-rccnj.mongodbstitch.com/logo.png'
  });
};