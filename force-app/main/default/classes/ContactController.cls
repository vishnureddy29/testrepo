public with sharing class ContactController {
    @AuraEnabled
    // public static String saveContacts(Contact con5, string sign , string signFilename , String photo, String photoFilename) {
    public static String saveContacts(Contact con) {     

      insert con;
      String conId = con.Id;
      return conId;
     
      //  insert con5;
      //  String conId = con5.Id;
      //  system.debug([select Id,LastName From Contact WHERE Id=:con5.Id]);
      //   String fileName = signFilename;
      //   String base64File = sign;
      //   // UPLOAD  SIGNATURE
      //   ContentVersion uploadSignature = new ContentVersion();
      //   uploadSignature.Title = fileName;
      //   uploadSignature.PathOnClient = '/' + fileName;
      //   uploadSignature.FirstPublishLocationId = con5.Id;
      //   uploadSignature.VersionData = EncodingUtil.base64Decode(base64File);
      //   uploadSignature.IsMajorVersion = true;
      //   Insert uploadSignature;
      //   // UPLOAD PHOTO
      //   String fileName1 = photoFilename;
      //   String base64File1 = photo;
      //   ContentVersion uploadPhoto = new ContentVersion();
      //   uploadPhoto.Title = fileName1;
      //   uploadPhoto.PathOnClient = '/' + fileName1;
      //   uploadPhoto.FirstPublishLocationId = con5.Id;
      //   uploadPhoto.VersionData = EncodingUtil.base64Decode(base64File1);
      //   uploadPhoto.IsMajorVersion = true;
      //   Insert uploadPhoto;
      //   return conId;
    }
} 
//end of class