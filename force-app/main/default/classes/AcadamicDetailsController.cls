public with sharing class AcadamicDetailsController {
    @AuraEnabled
    public static String academicDetail(Academic_detail__c acd,string contactid){

      acd.Contact__c =  contactid;
      insert acd;
      return acd.Id;

    }
    // public static String academicDetail(Academic_detail__c acd,string tfileName,string tbase64, string dfileName , string dbase64, string uGfileName , string uGbase,string pGfileName , string pGbase,string contactid ) { 
    //   acd.Contact__c =  contactid;
    //   insert acd;
    //   ContentVersion tenth = new ContentVersion();
    //   tenth.Title = tfileName;
    //   tenth.PathOnClient = '/' + tfileName;
    //   tenth.FirstPublishLocationId = acd.Id;
    //   tenth.VersionData = EncodingUtil.base64Decode(tbase64);
    //   tenth.IsMajorVersion = true;
    //   Insert tenth;
    
    //   ContentVersion diplomatwelveth = new ContentVersion();
    //   diplomatwelveth.Title = dfileName;
    //   diplomatwelveth.PathOnClient = '/' + dfileName;
    //   diplomatwelveth.FirstPublishLocationId = acd.Id;
    //   diplomatwelveth.VersionData = EncodingUtil.base64Decode(dbase64);      
    //   Insert diplomatwelveth;

    //   ContentVersion uG = new ContentVersion();
    //   uG.Title = uGfileName;
    //   uG.PathOnClient = '/' + uGfileName;
    //   uG.FirstPublishLocationId = acd.Id;
    //   uG.VersionData = EncodingUtil.base64Decode(uGbase);      
    //   Insert uG;

    //   if(PGfileName != NULL || PGbase != NULL){
    //     ContentVersion pG = new ContentVersion();
    //     pG.Title = pGfileName;
    //     pG.PathOnClient = '/' + pGfileName;
    //     pG.FirstPublishLocationId = acd.Id;
    //     pG.VersionData = EncodingUtil.base64Decode(pGbase);      
    //     Insert pG;
    //   }
    //   return acd.Name;
    //}

   
}