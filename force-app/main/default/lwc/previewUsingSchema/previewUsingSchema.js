import { LightningElement, track } from 'lwc';

export default class PreviewUsingSchema extends LightningElement {
    @track conid;
    @track form = false;
    
    edit(){
        this.conid = sessionStorage.getItem("conid");
        console.log(this.conid);
        this.form = true;
    }
    
}