@isTest
public with sharing class ContactControllerTest {
  
     @isTest
     public static void insertCon(){
        try{
        Contact con= new Contact();
         con.LastName='Darshan';
         System.debug('conlist valieferf'+con);
         ContactController.saveContact(con);
         system.assertEquals('Darshan',con.LastName, 'Error msg');
     }
     catch(AuraHandledException e) {
        System.debug('AuraHandledException: ' +e.getMessage());
        System.assert(false, e.getMessage());
    }

    }
    @isTest
    public static void insertConCatch(){
       try{
       Contact con= new Contact();
       
        con.FirstName='Darsha';
        System.debug('conlist valieferf'+con);
        ContactController.saveContact( con);
        system.assertEquals('Darshan',con.FirstName, 'Error msg');
    }
    catch(AuraHandledException e) {
       System.debug('AuraHandledException:' +e.getMessage());
       System.assert(true, e.getMessage());
   }

   }
}