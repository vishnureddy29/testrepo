import { LightningElement,wire,track } from 'lwc';

import {refreshApex} from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class AccTable extends LightningElement {
    visibleAccounts
    
    @track recordId;
    @track updateId; 
    @track Contact ={};
                        
    handleFirstName(event){
                    
                            this.Contact.FirstName = event.target.value;
          }
          handleLastName(event){
                        
                            this.Contact.LastName=event.target.value;
                        }
                        handleFatherName(event){
                            this.Contact.FatherName=event.target.value;
                        }

                        handlePhone(event){
                                this.Contact.Phone=event.target.value;
                        }

                        handleEmail(event){
                            this.Contact.Email=event.target.value;
                        }
                        handleBirthDate (event){
                            this.Contact.BirthDate=event.target.value;
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