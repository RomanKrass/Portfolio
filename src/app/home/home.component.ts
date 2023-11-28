import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // variables
  public latitude = 0;
  public longitude = 0;
  private locationObservable = new Observable<boolean>();

  public ngOnInit(): void {
    this.getLocation().subscribe((result) => {
      // Only get the weather if the location was successfully obtained
      if (result) {
        //this.getWeather();
      }
    });
  }

  /**
   * Gets the current location.
   * @returns An observable that emits a boolean value indicating if the location was successfully obtained.
   */
  getLocation(): Observable<boolean> {
    this.locationObservable = new Observable<boolean>((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            if (position) {
              console.log(
                'Latitude: ' +
                  position.coords.latitude +
                  'Longitude: ' +
                  position.coords.longitude
              );
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
              observer.next(true);
              observer.complete();
            }
          },
          (error: GeolocationPositionError) => {
            console.log(error);
            alert('Error getting location: ' + error.message);
            observer.next(false);
            observer.complete();
          }
        );
      } else {
        alert('Geolocation is not supported by this browser.');
        observer.next(false);
        observer.complete();
      }
    });
    return this.locationObservable;
  }

  // Gets the weather information based on the current location.
  getWeather() {
    const url =
      'https://api.openweathermap.org/data/2.5/weather?lat=' +
      this.latitude +
      '&lon=' +
      this.longitude +
      '&units=metric&appid=6635a473002fe06b833a9e5e039b8471';

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const weather = data.weather[0].description;
        const temperature = data.main.temp;
        const feelsLike = data.main.feels_like;
        const humidity = data.main.humidity;
        const wind = data.wind.speed;
        const city = data.name;

        // Update the weather element with the weather information
        const weatherElement = document.getElementById('weather');
        if (weatherElement) {
          weatherElement.innerHTML = `The weather in ${city} is ${weather} with a temperature of ${temperature} degrees Celsius. It feels like ${feelsLike} degrees Celsius. The humidity is ${humidity}% and the wind speed is ${wind} m/s.`;
        }

        // updatew temperature element
        const tempElement = document.getElementById('temperature');
        if (tempElement) {
          tempElement.innerHTML = `${temperature} &#8451;`;
        }

        // update wind element
        const windElement = document.getElementById('wind');
        if (windElement) {
          windElement.innerHTML = `${wind} m/s`;
        }
      })

      .catch((error) => {
        console.log(error);
        alert('Error getting weather data.');
      });
  }
}
