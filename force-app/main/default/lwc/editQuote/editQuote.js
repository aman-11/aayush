/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api, track } from "lwc";

export default class EditQuote extends LightningElement {
  // @api recordId;
  // quoteData = {
  //   name: "Quote Name",
  //   endDate: 1547250828000
  // };
  @api quoteData;
  @api loading;
  endDate = null;
  startDate = null;

  connectedCallback() {
  }

  handleStartDate(e) {
    console.log('startdate', e.target.value)
    this.startDate = e.target.value;
  }
  handleEndDate(e) {
    console.log('enddate', e.target.value)
    this.endDate = e.target.value;

  }

  handleSave() {
    if(this.startDate == null && this.quoteData.startDate != undefined) this.startDate = this.quoteData.startDate;
    if(this.endDate == null) this.endDate = this.quoteData.endDate;
    const saveQuoteEvent = new CustomEvent("savequotebtn", {
      detail: {
        "startDate": this.startDate,
        "endDate": this.endDate,
      }
    });

    this.dispatchEvent(saveQuoteEvent);
  }

  renderedCallback() { }
}