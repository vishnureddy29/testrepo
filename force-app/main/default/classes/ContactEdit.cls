public with sharing class ContactEdit {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
       
        return   [select Id,FirstName,LastName,Phone,Email,Birthdate,FatherName__c,MotherName__c,MailingCity,MailingCountry,MailingState,MailingPostalCode FROM Contact Where Id=:'0035g00000iqoysAAA'];
    
           }

   
        @AuraEnabled
        public static void updateContacts(Contact con,Id conId){
           
         system.debug(con);
            
          try {
    Contact updateContacts= [SELECT Id,FirstName,LastName,Phone,Email,Birthdate,FatherName__c,MotherName__c,MailingCity,MailingCountry,MailingState,MailingPostalCode FROM Contact WHERE Id=:conId];
                 con.Id=conId;  
                 system.debug(conId);
                 system.debug(updateContacts);
                UPDATE updateContacts;
            } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}