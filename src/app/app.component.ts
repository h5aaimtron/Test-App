import { HttpClient } from '@angular/common/http';
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
    this.http.post("https://converter.api.terracette.com/Converter/xmltojson", this.srcData, {}).subscribe({
      next: (response: any) => {
        // Successful response, push data to destination.
        this.dstData = response.data;
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
    this.http.post("https://converter.api.terracette.com/Converter/jsontoxml", this.srcData, {}).subscribe({
      next: (response: any) => {
        // Successful response, push data to destination.
        this.dstData = response.data;
      },
      error: (error: any) => {
        console.error(error);
        alert("Error occured while converting.");
      }
    })
  }
}
