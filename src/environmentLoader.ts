import {environment} from "./environments/environment";

export const environmentLoader = new Promise<any>((resolve, reject) => {
  fetch('./assets/environment/environment.json')
    .then(response => {
      if (!response.ok) {
        resolve(environment)
      }
      return response.json();
    }).then(env => resolve(env));
});
