public with sharing class QuoteInformationSelector {
    
    @AuraEnabled(cacheable=true)
    public static SObject getQuoteInformation(Id recordId){
        QuoteDto quoteInfo;
        try {
            Quote__c quoteRecord = [SELECT Id, Name, StartDate__c, EndDate__c FROM Quote__c WHERE Id = :recordId limit 1];
            quoteInfo = new QuoteDto(quoteRecord);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return quoteInfo.sObj;
    }

    @AuraEnabled
    public static void updateQuoteInformation(QuoteDto quoteData){
        try {
            System.debug(logginglevel.ERROR, '*** : ' + quoteData);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    
}
