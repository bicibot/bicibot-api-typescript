import NodeGeocoder from "node-geocoder";
class GeocodingService {
  options = {
    provider: "google",

    // Optional depending on the providers
    httpAdapter: "https", // Default
    apiKey: "YOUR_API_KEY", // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
  };
  geocoder: any;
  public constructor() {
    this.geocoder = NodeGeocoder(this.options);
  }
}

export default new GeocodingService();
