/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";

export default class AdjustQuotePrice extends LightningElement {
  adjustedAmountLabel = "Adjusted Amount";
  @api adjustedAmount;

  handleAdjustValue(e){
    if(e.detail.value == "") this.disableInp = true;
    else this.disableInp = false;
    const adjustmentvalue = new CustomEvent("adjustmentvalue", {
      detail: {
        'disableInp':this.disableInp,
        'value':e.target.value}
    });

    this.dispatchEvent(adjustmentvalue);
  }
}