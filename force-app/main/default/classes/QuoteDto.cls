public with sharing class QuoteDto extends BaseDto {
  // public Date endDate;

  public QuoteDto() {
  }

  public QuoteDto(Quote__c quote, string operationType) {
    super(quote, operationType);
    this.endDate = quote.EndDate__c;
    this.startDate = quote.start_date__c;
    this.adjustedAmnt = quote.TotalQuotedAmount__c ;
  }

  public override void refreshSo() {
    //using it to revert the client back with the single quote Data
    if (Schema.sObjectType.Quote__c.isAccessible()){
      Quote__c quote = [SELECT Id, Name, start_date__c, EndDate__c FROM Quote__c WHERE Id=: this.id ];
      this.name = quote.Name;
      this.startDate = quote.start_date__c;
      this.endDate = quote.EndDate__c;
    }
  }

  public void handleSobjectOperations(){

    if(this.isUpdate()){
      if(this.endDate != null){
        updateQuote(this.id, this.startDate, this.endDate);
      }
      
      if(this.adjustedAmnt != null){
        updateQuote(this.id, this.adjustedAmnt);
      }
    }

    //when action performed referesh
    refreshSo();
  }

  public static void updateQuote(Id quoteId, Date startDate, Date endDate){
    Quote__c quote = new Quote__c();
    quote.Id = quoteId;
    quote.start_date__c = startDate;
    quote.EndDate__c = endDate;
    update quote;
  }
  public static void updateQuote(Id quoteId, decimal amnt){
    Quote__c quote = new Quote__c();
    quote.Id = quoteId;
    quote.TotalQuotedAmount__c = amnt;
    update quote;
  }

}
