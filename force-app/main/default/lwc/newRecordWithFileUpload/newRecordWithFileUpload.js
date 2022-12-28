import { LightningElement, track,api,wire } from 'lwc';  
 import saveContact from '@salesforce/apex/ContactControllerUpload.saveContact';  
 import {CurrentPageReference,NavigationMixin } from 'lightning/navigation';  
 import { ShowToastEvent } from 'lightning/platformShowToastEvent';  
 const MAX_FILE_SIZE = 100000000; //10mb  
 export default class NewRecordWithFileUpload extends NavigationMixin(LightningElement) {  
   @track name;  
   @track phone;  
   @track email;  
   @track description; 
   @api recordId;
   @wire(CurrentPageReference)
   setCurrentPageReference(currentPageReference) {
       this.currentPageReference = currentPageReference;
   }

   get recordId() {
       return this.currentPageReference?.state?.c__recordId;
   } 
   get objectType() {
    return this.currentPageReference?.state?.c__objectType;
}
   uploadedFiles = [];   file; fileContents; fileReader; content; fileName;  filep; fileContentsp; fileReaderp; contentp; fileNamep
   onNameChange(event) {  
     this.name = event.detail.value;  
   }  
   onPhoneChange(event) {  
     this.phone = event.detail.value;  
   }  
   onEmailChange(event) {  
     this.email = event.detail.value;  
   }  
   onDescriptionChange(event) {  
     this.description = event.detail.value;  
   }  
   onFileUpload(event) {  
     if (event.target.files.length > 0) {  
       this.uploadedFiles = event.target.files;  
       this.fileName = event.target.files[0].name;  
       this.file = this.uploadedFiles[0];  
       if (this.file.size > this.MAX_FILE_SIZE) {  
         alert("File Size Can not exceed" + MAX_FILE_SIZE);  
       }  
     } 
     this.fileReader = new FileReader(); 
     this.fileReader.readAsDataURL(this.file);  
     this.fileReader.onloadend = (() => {  
       this.fileContents = this.fileReader.result;  
       let base64 = 'base64,';  
       this.content = this.fileContents.indexOf(base64) + base64.length;  
       this.fileContents = this.fileContents.substring(this.content); 
     });  
     
   }  
   onFileUpload1(event) {  
    if (event.target.files.length > 0) {  
      this.uploadedFiles = event.target.files;  
      this.fileNamep = event.target.files[0].name;  
      this.filep = this.uploadedFiles[0];  
      if (this.filep.size > this.MAX_FILE_SIZE) {  
        alert("File Size Can not exceed" + MAX_FILE_SIZE);  
      }  
    } 
    this.fileReaderp = new FileReader(); 
    this.fileReaderp.readAsDataURL(this.filep);    
    this.fileReaderp.onloadend = (() => {  
      this.fileContentsp = this.fileReaderp.result;  
      let base64 = 'base64,';  
      this.contentp = this.fileContentsp.indexOf(base64) + base64.length;  
      this.fileContentsp = this.fileContentsp.substring(this.contentp);  
      
       
    }); 
   
  }  

   saveContact() {  
     var con = {  
       'sobjectType': 'Contact',  
       'LastName': this.name,  
       'Email': this.email,  
       'Phone': this.phone,  
       'Description': this.description  
     }  
     
     saveContact({  
       contactRec: con,  
       file: encodeURIComponent(this.fileContents),  
       fileName: this.fileName,
       filep: encodeURIComponent(this.fileContentsp),  
       fileNamep: this.fileNamep  
     }) 
     
       .then(conId => {  
         if (conId) {  
           this.dispatchEvent(  
             new ShowToastEvent({  
               title: 'Success',  
               variant: 'success',  
               message: 'Contact Successfully created',  
             }),  
           );  
           
          
         
         }  
       }).catch(error => {  
         console.log('error ', error);  
       });  
   }  
 }