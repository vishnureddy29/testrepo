import { LightningElement,track } from 'lwc';
import creatcon from  '@salesforce/apex/ContactController.saveContacts';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class PersonalDetailForm extends NavigationMixin(LightningElement) {
  @track Contact = {}
  @track signbase64
  @track signFilename
  @track picFilename
  @track picbase64
  @track conId
  @track DetailsSaved = false
  @track relatedRecordId


  handlePhotoUploadFinished(event) {
    const uploadedFiles = event.detail.files;
    let noOfFiles = uploadedFiles.length;
    console.log( 'No. of files uploaded', noOfFiles );
    this.dispatchEvent(
        new ShowToastEvent( {
            title: 'File(s) Download',
            message: noOfFiles + 'File(s) Uploaded Successfully!!!',
            variant: 'success'
        } ),
    );
  }

  handleSignatureUploadFinished(event) {
    const uploadedFiles = event.detail.files;
    let noOfFiles = uploadedFiles.length;
    console.log( 'No. of files uploaded', noOfFiles );
    this.dispatchEvent(
        new ShowToastEvent( {
            title: 'File(s) Download',
            message: noOfFiles + 'File(s) Uploaded Successfully!!!',
            variant: 'success'
        } ),
    );
  }

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

  saveContact(){
      // console.log(this.signFilename,'signFilename');
      // console.log(this.signbase64,'signbase64');
      // console.log(this.picFilename,'picFilename');
      // console.log(this.picbase64,'picbase64');
      // creatcon({con5:this.Contact,sign:this.signbase64,signFilename:this.signFilename ,photo:this.picbase64,photoFilename:this.picFilename })
      creatcon({con:this.Contact})
      .then(result =>{
        this.contactId = result
        sessionStorage.setItem("conid",this.contactId);
        // console.log(this.conId)
        this.toastEventFire('Success','record Created','success');
        this.relatedRecordId = this.contactId
        console.log(this.relatedRecordId)
        this.DetailsSaved = true

        // this[NavigationMixin.Navigate]({
        //   type: 'comm__namedPage',
        //   attributes: {
        //         name:'Academic_Details__c'
        //   }
        // })
      })
      .catch(error =>{
        this.toastEventFire('Error',error.body.pageErrors[0].message,'Error');
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
  onFileUpload(event){
      const file = event.target.files[0]
      var reader = new FileReader()
      reader.onload =()=>{
      var base64 = reader.result.split(',')[1]
        this.signFilename=file.name;
        this.signbase64=base64;
    }
    reader.readAsDataURL(file)
  }


  onFileUpload1(event){
      const file = event.target.files[0]
      var reader = new FileReader()
      reader.onload =()=>{
      var base64 = reader.result.split(',')[1]
        this.picFilename=file.name;
        this.picbase64=base64;
    }
    reader.readAsDataURL(file)
  }
 
}