/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api, wire, track } from "lwc";
import getQuoteInfo from '@salesforce/apex/QuoteInformationSelector.getQuoteInformation';
import updateQuoteInfo from '@salesforce/apex/QuoteInformationSelector.updateQuoteInformation';

export default class EditQuote extends LightningElement {
  @api recordId;
  @track quoteData = {};
  
  @wire(getQuoteInfo, {recordId: '$recordId'})
  quoteInformations({error, data}){
    if (data) {
      console.log('inside data');
      console.log(JSON.stringify(data));
      console.log(JSON.stringify(data.Name));

      this.quoteData = {"name":data.Name, "startDate":data.StartDate__c, "endDate":data.EndDate__c }
      
      console.log(this.quoteData);
      
    } else if (error) {
      console.log(JSON.stringify(error));
    }
  }

  saveQuote(e){
    console.log(JSON.stringify(e.target.value));
    updateQuoteInfo({
      quoteData: this.quoteData
    })
    .then(() => {
        refreshApex(this.quoteData)
        .then(() => {
            // do something with the refreshed data in this.opptiesOverAmount
        });
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
        //this.message = 'Error received: code' + error.errorCode + ', ' +
            //'message ' + error.body.message;
    });
  }

  renderedCallback() {}
}
