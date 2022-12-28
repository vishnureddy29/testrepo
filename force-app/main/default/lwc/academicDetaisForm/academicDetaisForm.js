import { LightningElement, wire,track } from 'lwc';
import getAcademicList from '@salesforce/apex/AcadamicDetailsController.academicDetail';
import { NavigationMixin } from 'lightning/navigation';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class AcademicDetaisForm extends NavigationMixin(LightningElement) {
    
    @track conid;
    @track form1 = false;
    @track form2 = false;
    @track form3 = false;
    @track btn1 = true;
    @track btn2 = true;
    @track btn3 = true;
    @track markscard10thName
    // @track markscard10thbase
    // @track markscard12thName
    // @track markscard12thbase
    // @track UGfileName
    // @track UGbase
    // @track PGfileName
    // @track PGbase
    @track relatedRecordId
    @track conid
    @track relatedRecordId
    @track DetailsSaved
    @track Academic_detail__c = {
       
    };
    onChange(event){
         
        if(event.target.name == '10th Institute_Name'){
            this.Academic_detail__c.Name = event.target.value
        }      
        if(event.target.name == '10th Board Name'){
            this.Academic_detail__c.X10th_Board__c = event.target.value       
        }
        if(event.target.name == '10th Percentage'){
            this.Academic_detail__c.X10th_Percentage__c = event.target.value       
        }
        if(event.target.name == '12th Institute_Name'){
            this.Academic_detail__c.X12th_Deploma_Institute_name__c = event.target.value
        }      
        if(event.target.name == '12th Board Name'){
            this.Academic_detail__c.X12th_Deploma_Board__c = event.target.value       
        }
        if(event.target.label == '12th Percentage'){
            this.Academic_detail__c.X12th_Deploma_Percentage__c = event.target.value       
        }
        if(event.target.name == 'UG Institute_Name'){
            this.Academic_detail__c.UG_Institute_name__c = event.target.value
        }    
        if(event.target.name == 'gUniversity Name'){
            this.Academic_detail__c.Degree_University__c = event.target.value       
        }
        if(event.target.name == 'gSpecification'){
            this.Academic_detail__c.Degree_Specification__c = event.target.value       
        }
        if(event.target.name == 'xPercentage'){
            this.Academic_detail__c.Degree_Percentage__c = event.target.value       
        }
        if(event.target.name == 'PG Institute_Name'){
            this.Academic_detail__c.PG_Institute_name__c = event.target.value
        }
        if(event.target.name == 'University Name'){
            this.Academic_detail__c.Pg_University__c = event.target.value       
        }
        if(event.target.name == 'Specification'){
            this.Academic_detail__c.Pg_Specification__c = event.target.value       
        }
        if(event.target.name == 'pPercentage'){
            this.Academic_detail__c.Pg_percentage__c = event.target.value       
        }
    }
    value;

    get options() {
        return [
            { label: 'B.A.', value: 'B.A' },
            { label: 'B.E. / B.Tech', value: 'B.E. / B.Tech' },
            { label: 'B.Arch', value: 'B.Arch' },
            { label: 'B.Com', value: 'B.Com' },
            { label: 'B.Sc.', value: 'B.Sc.' },
            { label: 'BBA', value: 'BBA' },
            { label: 'BCA', value: 'BCA' },
            { label: 'Others', value: 'Others' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
        this.Academic_detail__c.Degree_Specification__c = this.value
    }
    value1;
    get Pgoptions() {
        return [
            { label: 'MBA', value: 'MBA' },
            { label: 'M.Tech', value: 'M.Tech' },
            { label: 'M.Sc', value: 'M.Sc' },
            { label: 'M.COM', value: 'M.COM' },
            { label: 'M.C.A', value: 'M.C.A' },
            { label: 'M.ARCH', value: 'M.ARCH' },
            { label: 'M.A', value: 'M.A' },
            { label: 'Others', value: 'Others' },
        ];
    }
    @track years;
    get year() {
        return [
            { label: '2000', value: '2000' },
            { label: '2001', value: '2001' },
            { label: '2002', value: '2002' },
            { label: '2003', value: '2003' },
            { label: '2004', value: '2004' },
            { label: '2005', value: '2005' },
            { label: '2006', value: '2006' },
            { label: '2007', value: '2007' },
            { label: '2008', value: '2008' },
            { label: '2009', value: '2009' },
            { label: '2010', value: '2010' },
            { label: '2011', value: '2011' },
            { label: '2012', value: '2012' },
            { label: '2013', value: '2013' },
            { label: '2014', value: '2014' },
            { label: '2015', value: '2015' },
            { label: '2016', value: '2016' },
            { label: '2017', value: '2017' },
            { label: '2018', value: '2018' },
            { label: '2019', value: '2019' },
            { label: '2020', value: '2020' },
            { label: '2021', value: '2021' },
            { label: '2022', value: '2022' },
            
        ];
    }
    Year10thChange(event){
        this.years = event.detail.value
        this.Academic_detail__c.X10th_Year_Of_Pass__c = this.years
    }
    Year12thChange(event){
        this.years = event.detail.value
        this.Academic_detail__c.X12th_Deploma_Year_of_Pass__c = this.years
    }
    YearUGChange(event){
        this.years = event.detail.value
        this.Academic_detail__c.Degree_YOP__c = this.years
    }
    YearPGChange(event){
        this.years = event.detail.value
        this.Academic_detail__c.Pg_YOP__c = this.years
    }
    Pgchange(event){
        this.value1 = event.detail.value;
        this.Academic_detail__c.PG__c = this.value1
    } 
    // openfileUpload(event){
    //     const file = event.target.files[0]
    //     var reader = new FileReader()
    //     reader.onload =()=>{
    //         var base64 = reader.result.split(',')[1]
    //         this.markscard10thName = file.name
    //         this.markscard10thbase = base64
    //     }
    //     reader.readAsDataURL(file)
        
    // } 
    // openfileUpload1(event){
    //     const file = event.target.files[0]
    //     var reader = new FileReader()
    //     reader.onload =()=>{
    //         var base64 = reader.result.split(',')[1]
    //         this.markscard12thName = file.name
    //         this.markscard12thbase = base64            
    //     }
    //     reader.readAsDataURL(file)
        
    // }
    // openfileUpload2(event){
    //     const file = event.target.files[0]
    //     var reader = new FileReader()
    //     reader.onload =()=>{
    //         var base64 = reader.result.split(',')[1]
    //         this.UGfileName = file.name
    //         this.UGbase = base64  
    //     }
    //     reader.readAsDataURL(file)
        
    // }
    // openfileUpload3(event){
        
    //     const file = event.target.files[0]
    //     var reader = new FileReader()
    //     reader.onload =()=>{
    //         var base64 = reader.result.split(',')[1]
    //         this.PGfileName = file.name
    //         this.PGbase = base64
    //     }
    //     reader.readAsDataURL(file)
        
    // }
    
    
    Save(){ 
        this.conid = sessionStorage.getItem("conid");
        console.log(this.conid)
        getAcademicList({acd:this.Academic_detail__c, 
            
            contactid:this.conid
            
        }) 
            .then(result =>{
                this.relatedRecordId = result;
                console.log(`record uploaded successfully`)
                this.toastEventFire('Success',`record Created`,'success');
            })
            .catch(error =>{
                this.error = error.message;
                alert(JSON.stringify(error))
        })     
        this.DetailsSaved = true
            
        
    }
    add1(){
        this.form1 = true;
        this.btn1 = false;
    }
    add2(){
        this.form2 = true;
        this.btn2 = false;
    }
    add3(){
        this.form3 = true;
        this.btn3 = false;
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
    navigateToNextPage() {
        
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name:'Experience_details__c'
            }
        });
    }
    navigateToPrevPage(){       
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name:'Personal_details__c'
                
            }
        });
    }
    
    handleUpload10th(event) {
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
    
      handleUpload12thORdiploma(event) {
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
      handleUploadUG(event) {
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
      handleUploadPG(event) {
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
   
}