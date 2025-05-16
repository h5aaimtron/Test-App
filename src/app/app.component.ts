import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'testApp';
  public srcData: string = "";
  public dstData: string = "";

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Converts the srcData to JSON
   * assuming srcData is XML
   */
  public convertToJSON(): void {
    this.http.post("https://converter.api.terracette.com/Converter/xmltojson", this.srcData, {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
        'Accept': 'text/plain'
      }),
      responseType: 'text' as 'json'
    })
    .subscribe({
      next: (response: any) => {
        // Successful response, push data to destination.
        this.dstData = response;
      },
      error: (error: any) => {
        console.error(error);
        alert("Error occured while converting.");
      }
    });
  }

  /**
   * Converts srcData (JSON) to XML
   * assuming srcData is valid JSON
   */
  public convertToXML(): void {
    this.http.post("https://converter.api.terracette.com/Converter/jsontoxml", this.srcData, {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
        'Accept': 'text/plain'
      }),
      responseType: 'text' as 'json'
    })
    .subscribe({
      next: (response: any) => {
        // Successful response, push data to destination.
        this.dstData = response;
      },
      error: (error: any) => {
        console.error(error);
        alert("Error occured while converting.");
      }
    });
  }
}
