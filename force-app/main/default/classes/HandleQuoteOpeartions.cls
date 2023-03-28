/**
 * handling this class as a single point of contact from the client
 */
public with sharing class HandleQuoteOpeartions {
    
    @AuraEnabled
    public static QuoteDto performOperation(Quote__c quote, String operationType){
        try {
            QuoteDto qDto = new QuoteDto(quote, operationType);
            qDto.handleSobjectOperations();
            return qDto;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}