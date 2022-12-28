import { LightningElement,wire,track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
import {refreshApex} from '@salesforce/apex'
import getContacts from '@salesforce/apex/ContactEdit.getContacts'

export default class ContactViewList extends LightningElement {
  // preview(){
  //   this.conId = sessionStorage.getItem("conid");
  //   console.log(this.conId); 
  //   getContacts({conId:this.conId})
  //   .then(result=> {
  //     this.contacts=result;
  //     console.log('preview data---------->>>>>>>>>',JSON.stringify(this.contacts));
  //   });
  //   }
    @wire (getContacts)contacts; 
    @track disabled=true; 
    @track recordId;
    
    @track Contact = {}
 
    @track conId

  
    LastNameChange(event){
    this.Contact.LastName = event.target.value
    }
    FirstNameChange(event){
      this.Contact.FirstName = event.target.value
    }
    EmailChange(event){
      this.Contact.Email = event.target.value
    }
    Birthchange(event){
      this.Contact.Birthdate = event.target.value
    }
    PhoneChange(event){
      this.Contact.Phone = event.target.value
    }
    FatherNameChange(event){
      this.Contact.FatherName__c = event.target.value
    }
    MotherNameChange(event){
      this.Contact.MotherName__c = event.target.value
    }
    AddressChange(event){
      this.Contact.MailingCity= event.target.value
    }
    CountryChange(event){
      this.Contact.MailingCountry = event.target.value
    }
    stateChange(event){
      this.Contact.MailingState = event.target.value
    }
    zipChange(event){
      this.Contact.MailingPostalCode = event.target.value
    }
  
    // Handle gender picklist value change
  
    value = 'Select';
    get genderOptions() {
      return [
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female'},
                { label: 'Others', value: 'Others' }
              ];
    }
  
    handleValueGenderChange(event) {
      this.value = event.detail.value;
      this.Contact.gender__c = this.value
      console.log(event.target.value)
    }
    handleAccounttEdit(event){

      
        
        this.disabled=false;
   

}
  
    Submit(){
   
        creatcon({con5:this.Contact })
        .then(result =>{
          console.log(result)
          this.conId = sessionStorage.setItem("conid",result);
          console.log(this.conId)
          this.toastEventFire('Success','record Created','success');
        })
       
    }
    
  
    toastEventFire(title,msg,variant,mode){
        const e = new ShowToastEvent({
            title: title,
            message: msg,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(e);
    }
  

}