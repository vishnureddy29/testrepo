public with sharing class Uploadfile {
    
  @AuraEnabled
  public static String uploadFile( String base64, String filename, string con) {
    List<data__c> conid = [SELECT conId__c FROM data__c ];
    String recordId = conid[0].conId__c;
      ContentVersion cv = createContentVersion(base64, filename);
      ContentDocumentLink cdl = createContentLink(cv.Id, recordId);
      if (cv == null || cdl == null) { return null; }
      return cdl.Id;
    }
    @AuraEnabled
      public static String uploadFile1(String base641, String file1name) {
      String base64 = base641;
      String filename = file1name;
      List<data__c> conid = [SELECT conId__c FROM data__c ];
      String recordId = conid[0].conId__c;
      ContentVersion cv = createContentVersion(base64, filename);
      ContentDocumentLink cdl = createContentLink(cv.Id, recordId);
      if (cv == null || cdl == null) { return null; }
      return cdl.Id;
    }
      private static ContentVersion createContentVersion(String base64, String filename) {
        ContentVersion cv = new ContentVersion();
        cv.VersionData = EncodingUtil.base64Decode(base64);
        cv.Title = filename;
        cv.PathOnClient = filename;
        try {
          insert cv;
          return cv;
        } catch(DMLException e) {
          System.debug(e);
          return null;
        }
      }
      private static ContentDocumentLink createContentLink(String contentVersionId, String recordId) {
        if (contentVersionId == null || recordId == null) { return null; }
            ContentDocumentLink cdl = new ContentDocumentLink();
            cdl.ContentDocumentId = [
            SELECT ContentDocumentId 
            FROM ContentVersion 
            WHERE Id =: contentVersionId
            ].ContentDocumentId;
            cdl.LinkedEntityId = recordId;
            cdl.ShareType = 'V';
            try {
            insert cdl;
            return cdl;
            } catch(DMLException e) {
            System.debug(e);
            return null;
            }
        }
}