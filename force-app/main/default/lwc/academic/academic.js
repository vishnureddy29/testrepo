import { LightningElement,track } from 'lwc';
import getAcademicList from '@salesforce/apex/AcadamicDetailsController.academicDetail';
import uploadFile from '@salesforce/apex/Uploadfile.uploadFile';
export default class Academic extends LightningElement {
    @track Academic_detail__c = {};
    onChange(event){
        if(event.target.label == 'Institute_Name'){
            this.Academic_detail__c.Name = event.target.value           
        }      
        if(event.target.label == 'Board Name'){
            this.Academic_detail__c.X10th_Board__c = event.target.value       
        }
    } 
    openfileUpload(event){
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload =()=>{
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename':file.name,
                'base64':base64,  
            }
            console.log(this.fileData)
        }
        reader.readAsDataURL(file)
    } 
    handleClick(){
        const {base64, filename} = this.fileData
        uploadFile({base64, filename}).then(result=>{
            console.log(`${result} record uploaded successfully`)
        })
         getAcademicList({acd:this.Academic_detail__c})
            
            .then(result =>{
                console.log(`${result} record uploaded successfully`)
                //this.toastEventFire('Success','Record is Saved','success');
            })
            .catch(error =>{
                this.error = error.message;
                alert(JSON.stringify(error))
        })
    }
}