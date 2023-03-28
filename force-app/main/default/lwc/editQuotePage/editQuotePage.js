/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api, wire, track } from "lwc";
import performOperation from '@salesforce/apex/HandleQuoteOpeartions.performOperation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EditQuotePage extends LightningElement {
  @api recordId;
  @track quoteData;
  openAdjustModal = false;
  @track disableInp = false;

  connectedCallback() {
    this.loading = true;
    let quote = {
        "Id": this.recordId,
      }
    this.callApexApi(quote,"read");
  }

  handleAdjustModal(e){
    this.openAdjustModal = e.detail;
  }

  handleCloseAdjust(){
    this.openAdjustModal = false;
  }
  
  handleSaveAdjust(){
    if(this.adjustQuoteAmnt == undefined){
      this.adjustQuoteAmnt = this.quoteData.adjustedAmnt;
    }
    console.log('saveAdjustamnt ', this.adjustQuoteAmnt);
    let quote = {
        "Id": this.recordId,
        "TotalQuotedAmount__c": this.adjustQuoteAmnt,
      }
    this.callApexApi(quote,"update");
  }

  handleAdjustValue(e){
    console.log('line36-adjustValuechanges- ', JSON.stringify(e.detail));
    this.disableInp = e.detail.disableInp;
    this.adjustQuoteAmnt = e.detail.value;
  }

  callApexApi(quote, operation) {
    performOperation({
      "quote": quote, "operationType": operation
    }).then((result) => {
      console.log(`line56editquotepageread ${result.operationType} `, result);
      this.quoteData = JSON.parse(JSON.stringify(result));
      this.loading = false;
      if(result.operationType == 'update'){
        const evt = new ShowToastEvent({
          title: 'Toast Success',
          message: `${this.quoteData.operationType} sucessfull for ${this.quoteData.name}`,
          variant: 'success',
          mode: 'dismissable'
        });
        this.dispatchEvent(evt);
      }
    })
      .catch((error) => {
        this.loading = false;
        this.error = error;
        console.error(`${operation} -> ${JSON.stringify(error)}`)
      });
  }

  handleQuoteSave(e){
    console.log('line47savequotebtn ', JSON.stringify(e.detail));
    let quote = {
        "Id": this.recordId,
        "start_date__c": e.detail.startDate == null ? null : e.detail.startDate,
        "EndDate__c": e.detail.endDate,
      }
    this.callApexApi(quote,"update");
  }
}