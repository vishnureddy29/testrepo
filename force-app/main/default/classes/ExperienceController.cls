public with sharing class ExperienceController {
    @AuraEnabled
    public static List<Experience__c> saveExperience(List<Experience__c> expList,String base64,String expFilename,String contactid) {
        
        for(Integer i=0;i<expList.size();i++){
            expList[i].name = expList[i].Company_name__c;
            expList[i].Contact__c = contactid;
        }
        insert expList;
        String fileName = expFilename;
        String base64File = base64;
        ContentVersion contentVersionRec = new ContentVersion();
        contentVersionRec.Title = fileName;
        contentVersionRec.PathOnClient = '/' + fileName;

        contentVersionRec.FirstPublishLocationId = expList[0].Id;
        contentVersionRec.VersionData = EncodingUtil.base64Decode(base64File);
        contentVersionRec.IsMajorVersion = true;
        Insert contentVersionRec;
        return expList;
    } 
    @AuraEnabled
    public static void getContact(String conid){
        List<Contact> conlist = [SELECT Id,name FROM Contact WHERE Id = :conid];
    }  
}