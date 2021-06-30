export interface OperatorSummaryDTO {
  uuid: string;
  logo: string | null;
  markerIcon: string | null;

}

export interface OperatorDTO extends OperatorSummaryDTO {
  name: string;
  operatorNumber: string;
}
