import { Injectable } from "@angular/core";
var baseApiUrl = "http://localhost:3540";
var apiUrl = "http://localhost:3540/api";

//Dynamically change BASE and API URL
if (window.location.origin !== "http://localhost:4200") {
  var baseApiUrl = window.location.origin; // 'http://52.34.207.5:5115'
  var apiUrl = window.location.origin + "/api"; // 'http://52.34.207.5:5115/api/v3'
}

@Injectable()
export class AppConfig {
  clientUrl = window.location.origin;


}
