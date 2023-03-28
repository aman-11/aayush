/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";

export default class QuoteTotalSummary extends LightningElement {
    @api loading;
    handleAdjustQuote() {
        const openAdjustModal = new CustomEvent("openadjustmodal", {
            detail: true
        });

        this.dispatchEvent(openAdjustModal);
    }
}