public with sharing abstract class BaseDto {
  public static final String OPERATION_TYPE_INSERT = 'insert';
  public static final String OPERATION_TYPE_UPDATE = 'update';
  public static final String OPERATION_TYPE_DELETE = 'delete';
  public static final String OPERATION_TYPE_READ = 'read';

  public SObject sObj;

  public BaseDto() {
  }

  protected BaseDto(SObject sObj, string operationType) {
    this.sObj = sObj;
    this.id = sObj.Id;
    this.operationType = operationType;
  }

  @AuraEnabled
  public String operationType { get; set; }

  @AuraEnabled
  public Id id { get; set; }
  @AuraEnabled
  public String name { get; set; }
  @AuraEnabled
  public Date startDate { get; set; }
  @AuraEnabled
  public Date endDate { get; set; }
  @AuraEnabled
  public Decimal adjustedAmnt { get; set; }

  public Boolean isInsert() {
    return operationType == OPERATION_TYPE_INSERT;
  }

  public Boolean isUpdate() {
    return operationType == OPERATION_TYPE_UPDATE;
  }

  public Boolean isDelete() {
    return operationType == OPERATION_TYPE_DELETE;
  }
  public Boolean isRead() {
    return operationType == OPERATION_TYPE_READ;
  }

  abstract public void refreshSo();
}