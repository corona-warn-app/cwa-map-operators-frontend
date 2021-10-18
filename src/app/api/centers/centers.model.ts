import {OperatorDTO} from "../operators/operators.model";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Center {
  uuid: string;
  name: string;
  userReference: string;
  address: string;
  addressNote: string;
  appointment: string;
  testKinds: string[];
  website: string;
  email: string;
  openingHours: string[];
  dcc: boolean;
  operator: OperatorDTO;
  coordinates: Coordinates;
  enterDate: string;
  leaveDate: string;
  message: string;
}

export interface CenterWithDistance extends Center {
  distance: number;
}

export interface EditCenter {
  userReference: string;
  name: string;
  website: string;
  email: string;
  address: string;
  openingHours: string[];
  addressNote: string;
  appointment: string;
  testKinds: string[];
  dcc: boolean;
  enterDate: string;
  leaveDate: string;
}

export class ImportCenterRequest {
  deleteAll: boolean = false;
  centers: EditCenter[] = [];
}

export interface ImportCenterResult {
  center: EditCenter;
  errors: string[];
  warnings: string[];
}
