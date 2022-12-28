import { LightningElement, wire, track } from 'lwc';
import displayDATA from '@salesforce/apex/ContactController.displayDATA';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
 
const columns = [
    {
        label: 'Name',
        fieldName: 'Name',
        type: 'text',
    }, {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone',
        editable: true,
    }, 
     {
        label: 'Description',
        fieldName: 'Type',
        type: 'text',
        editable: true
    }
    
];
export default class DisplayData extends LightningElement {
    columns = columns;
    @track conlist;
    fldsItemValues = [];
 
    @wire(displayDATA)
    cons(result) {
        this.conlist = result;
        if (result.error) {
            this.conlist = undefined;
        }
    };
 
    saveHandleAction(event) {
        this.fldsItemValues = event.detail.draftValues;
        const inputsItems = this.fldsItemValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });
 
       
        const promises = inputsItems.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(res => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Records Updated Successfully!!',
                    variant: 'success'
                })
            );
            this.fldsItemValues = [];
            return this.refresh();
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'An Error Occured!!',
                    variant: 'error'
                })
            );
        }).finally(() => {
            this.fldsItemValues = [];
        });
    }
 
   
    async refresh() {
        await refreshApex(this.conlist);
    }
}