# Modified LWC Components

1. EditQuotePage
2. EditQuote
3. QuoteTotalSummary
4. AdjustQuotePrice

# Modified APEX Classes

1. BaseDto.cls
>> Added new operation type named as "Read" which will help to retrieve data for Client(LWC) onLoad time from quote object.
>> init the operationType on the class instance for which the apex api was invoked from the client(LWC) helping to know what is the operation required to perform
>> Exposed startDate, endDate, adjustedAmnt, Id, Name, operationType in the APEX response to Client(LWC)

2. QuoteDto.cls
>> When class instance is created, using constructor required input is stored in the properties in order to use values for DML operation
>> refreshSo helps to refersh the exposed property values after certain operation is performed or helping directly to send back the data from server to client on operation type "Read"
>> **handleSobjectOperations** is the single method where all the logic is handled depending on the opertion type. End of the method **refreshSo** is invoked just to take care if any modification was done with the record data which helps to keep the client side updated.
>> updateQuote is method overloaded based on different cases where arguments differ to update Quote. ie. one method for the updating date(startDate or endDate) another adjustmentAmount

3. HandleQuoteOperations.cls
>> Single Apex API exposed to client(LWC) handling all operations which expectes 2 params Quote and Operation to be performed and it returns the wrapper class properties helping to maintain the return structure.


# Approach

1. Since we are following Data Transfer Object pattern which focus on data flow from Client to server and vice-versa as well as helping to reduce the remote call done from the client to server.
2. To achieve this **HandleQuoteOpeartions** Class is created where single method handles the CRUD operation required. During this apex callout from the LWC we send the Quote object depending upon the operation to be performed like 
    1. Onload of LWC it displays the record data for the respective recordId, so during APEX callout the params passed will be Quote oject with 1 property Id which has recordID in it and operation = read
    2. onClick of save button for updating the startDate or endDate, Quote oject with 3 property (Id, start_date__c, EndDate__c) and operation = update
    3. onCLick of Apply button for updating the amount, Quote oject with 2 property (Id, TotalQuotedAmount__c) and operation = update
    4. After callout **QuoteDto.cls** will take care to perform some opeartion and revert back with the newly updated values
3. **EditQuotePage - LWC** being the parent takes care of all the child elements whether it is data to be displayed or its loading state to handling the UI.
    1. It has child **EditQuote - LWC**  which displays the quote record data on load which is handled by calling the method **callApexApi(quote = {id}, operation = read)**. It has 2 Input start and end Date once the input is filled.
    2. Now onclick of SAVE button, it fires a custom event to parent with payload (start and end date)
    3. Once the Parents gets to know there was an event triggered from child **EditQuote - LWC**, it calls the method **callApexApi(quote = {id, startDate, endDate}, operation = update)**
    4. Similarly It has child **QuoteTotalSummary - LWC**  which displays the button *Adjust Quote* 
    5. When button *Adjust Quote* is clicked it fires the custom event from child to parent
    6. **EditQuotePage - LWC** being the parent listens to the event and opens the Modal window
    7. THis Modal window has an input field type currency under the **AdjustQuotePrice - LWC** which is again the child of **EditQuotePage - LWC** and the SAVE btn is present in the footer of the Modal under the root LWC.
    8. In order to save the amount, **AdjustQuotePrice - LWC** fires the event to keep updating the amountValue typed in the child LWC.
    9. Once the SAVE btn is clicked then it calls the method **callApexApi(quote = {id, adjustmentAmount}, operation = update)**
4. Root LWC has single method **callApexApi(quote, operation)** which takes care of apex callout dynamically.
5. Avoided child LWC's to perform any logic. 

## Difficulty

1. Understanding basics of DTO
2. Update getting failed due to DML opeation exceeded

