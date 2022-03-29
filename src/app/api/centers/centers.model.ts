/*
 *
 *  Corona-Warn-App / cwa-map-operators-frontend
 *
 * (C) 2020, T-Systems International GmbH
 *
 * Deutsche Telekom AG and all other contributors /
 * copyright owners license this file to you under the Apache
 * License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

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
  visible: boolean;
  labId: string;
  operatorName: string;
}

export interface EditCenter {
  userReference: string;
  name: string;
  website: string;
  email: string;
  address: string;
  openingHours: string[];
  addressNote: string;
  appointment: string | null;
  testKinds: string[];
  dcc: boolean;
  enterDate: string;
  leaveDate: string;
  visible: boolean;
  labId: string;
  operatorName: string;
  coordinates: Coordinates;
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
