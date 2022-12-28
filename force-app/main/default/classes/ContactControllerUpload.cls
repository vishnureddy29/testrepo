public with sharing class ContactControllerUpload {
    @AuraEnabled  
    public static string saveContact(Contact contactRec, string file, string fileName, string filep, string fileNamep) {  
      string contactId; 
      system.debug(contactRec);
     
      system.debug(file);
      system.debug(fileName);
      system.debug(filep);
      system.debug(fileNamep);
        insert contactRec;  
        contactId = contactRec.Id;  
        String base64File = EncodingUtil.urlDecode(file, 'UTF-8');     
        ContentVersion contentVersionRec1 = new ContentVersion();  
        contentVersionRec1.Title = fileName;  
        contentVersionRec1.PathOnClient = '/' + fileName;  
        contentVersionRec1.FirstPublishLocationId = contactRec.Id;  
        contentVersionRec1.VersionData = EncodingUtil.base64Decode(base64File);  
        contentVersionRec1.IsMajorVersion = true;  
        insert contentVersionRec1;

        String base641File = EncodingUtil.urlDecode(filep, 'UTF-8');     
        ContentVersion contentVersionRec = new ContentVersion();  
        contentVersionRec.Title = fileNamep;  
        contentVersionRec.PathOnClient = '/' + fileNamep;  
        contentVersionRec.FirstPublishLocationId = contactRec.Id;  
        contentVersionRec.VersionData = EncodingUtil.base64Decode(base641File);  
        contentVersionRec.IsMajorVersion = true;  
        insert contentVersionRec;  
        
      system.debug(contactId);
      return contactId;  
    }    
}