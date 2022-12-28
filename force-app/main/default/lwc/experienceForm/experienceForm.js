import { LightningElement,track,wire,api} from 'lwc';
import saveExperience from '@salesforce/apex/ExperienceController.saveExperience'
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getContact from '@salesforce/apex/ExperienceController.getContact'
import { NavigationMixin } from 'lightning/navigation';

export default class ExperienceForm extends NavigationMixin(LightningElement) {


    @track base64
    @track fileuploaded=false
    @track Filename
    @track previewDisabled = true
    @track saveDisabled = true
    @track keyIndex = 0
    @track result
    @track contactid
    @track experienceids
    @track experiencelist = []
    @track experienceRecList = [
        {
            Company_name__c: '',
            Designation__c: '',
            Employee_ID__c: '',
            Industry_type__c:'',
            Date_of_joining__c:'',
            Leaving_date__c: '',
            Employer_name__c: '',
            Employer_designation__c: '',
            Employer_email__c: '',
            Employer_phone__c: '',
            Contact__c: ''

        }
    ];

//Add new form when plus button is clicked
    addForm(){
        this.keyIndex+1
        this.experienceRecList.push({
            Company_name__c: '',
            Designation__c: '',
            Employee_ID__c: '',
            Industry_type__c:'',
            Date_of_joining__c:'',
            Leaving_date__c: '',
            Employer_name__c: '',
            Employer_designation__c: '',
            Employer_email__c: '',
            Employer_phone__c: '',
            Contact__c: ''
        })
    }

//Remove form when delete button is clicked 
    removeForm(event){
            this.experienceRecList.pop();
            this.keyIndex-1
    }

//Enable or disable delete form button   
    get isDisabled(){
        return this.experienceRecList.length<2
    }

// Handle input changes
    changeHandler(event){
        
        if(event.target.name==="Company"){
            this.experienceRecList[event.target.accessKey].Company_name__c = event.target.value;
            console.log(this.contactid)
        }
        else if(event.target.name==="Designation"){
            this.experienceRecList[event.target.accessKey].Designation__c = event.target.value;
            console.log(event.target.value)
        }
        else if(event.target.name==="Employee ID"){
            this.experienceRecList[event.target.accessKey].Employee_ID__c = event.target.value;
        }
        else if(event.target.name==="Industry Type"){
            this.experienceRecList[event.target.accessKey].Industry_type__c = event.target.value;
        }
        else if(event.target.name==="From"){
            this.experienceRecList[event.target.accessKey].Date_of_joining__c = event.target.value;
        }
        else if(event.target.name==="To"){
            this.experienceRecList[event.target.accessKey].Leaving_date__c = event.target.value;
        }
        else if(event.target.name==="Name"){
            this.experienceRecList[event.target.accessKey].Employer_name__c = event.target.value;
        }
        else if(event.target.name==="Employer Designation"){
            this.experienceRecList[event.target.accessKey].Employer_designation__c = event.target.value;
        }
        else if(event.target.name==="Email"){
            this.experienceRecList[event.target.accessKey].Employer_email__c = event.target.value;
        }
        else if(event.target.name==="Phone"){
            this.experienceRecList[event.target.accessKey].Employer_phone__c = event.target.value;  
        }
    }

// Handle file upload
    onFileUpload(event){
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload =()=>{
        var base64 = reader.result.split(',')[1]
        this.Filename=file.name;
        this.base64=base64;
        }
        reader.readAsDataURL(file)
        this.fileuploaded = true
        this.saveDisabled = false 
    }


// Delete uploaded file

    removeAttachment(){
        this.fileuploaded = false
        this.base64 = null
        this.Filename = null
        this.saveDisabled = true
    }

//Handle save details and navigate to homepage

    submitHandler(event){
        this.contactid = sessionStorage.getItem("conid");
        saveExperience({expList : this.experienceRecList,base64:this.base64,expFilename:this.Filename,contactid:this.contactid})
        .then(result =>{
            for(let i = 0;i < result.length; i++){
                this.experiencelist.push(result[i].Id)
            }
            window.sessionStorage.setItem("expids", JSON.stringify(this.experiencelist));
            this.experienceids = sessionStorage.getItem("expids")
            console.log(this.experienceids)

            this.toastEventFire('Success','Details Saved','success');
            this.previewDisabled = false
        })

        .catch(error =>{
            this.toastEventFire('Error',error.body.pageErrors[0].message,'Error');
        })
        // this[NavigationMixin.Navigate]({
        //     type: 'comm__namedPage',
        //     attributes: {
        //         name:'Home'
        //     }
        // });
    }

// Navigate to previous page

    navigateToPreviousPage() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name:'Academic_Details__c'
            },
        });
    }

// Navigate to next page

    navigateToNextPage(){
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name:'Preview__c'
            },
        });
    }

// Toast event

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