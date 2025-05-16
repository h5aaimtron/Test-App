import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import XMLFormatter from 'xml-formatter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  public title = 'testApp';
  public srcData: string = "";
  public dstData: string = "";

  @ViewChild('inputArea', { static: false })
  public inputArea!: ElementRef;
  @ViewChild('lineNumbers', { static: false })
  public lineNumbers!: ElementRef

  private xmlOptions = {
    indentation: '  ',
    collapseContent: false,
    lineSeparator: '\n'
  };

  constructor(
    private http: HttpClient
  ) { }

  ngAfterViewInit(): void {
    this.updateLineNumbers();
  }

  private updateLineNumbers() {
    const lines = this.inputArea.nativeElement.value.split('\n').length;
    let numbers = '';
    for (let i = 1; i <= lines; i++) {
      numbers += i + '\n';
    }
    this.lineNumbers.nativeElement.textContent = numbers;
  }

  public onKey() {
    try {
      this.srcData = XMLFormatter(this.srcData, this.xmlOptions);
    } catch {
      try {
        const parsedJson = JSON.parse(this.srcData);
        this.srcData = JSON.stringify(parsedJson, null, 2);
      } catch { }
    }
    let blur = setInterval(() => {
      this.updateLineNumbers();
      clearInterval(blur);
    }, 10);
  }

  public onScroll() {
    this.lineNumbers.nativeElement.scrollTop = this.inputArea.nativeElement.scrollTop;
  }

  /**
   * Converts the srcData to JSON
   * assuming srcData is XML
   */
  public convertToJSON(): void {
    try {
      this.srcData = XMLFormatter(this.srcData, this.xmlOptions);
    } catch { }

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
          const parsedJson = JSON.parse(response);
          this.dstData = JSON.stringify(parsedJson, null, 2);
        },
        error: (error: any) => {
          console.error(error);
          this.dstData = error.error;
          //alert("Error occured while converting.");
        }
      });
  }

  /**
   * Converts srcData (JSON) to XML
   * assuming srcData is valid JSON
   */
  public convertToXML(): void {
    try {
      const parsedJson = JSON.parse(this.srcData);
      this.srcData = JSON.stringify(parsedJson, null, 2);
    } catch { }

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
          this.dstData = XMLFormatter(response, this.xmlOptions);
        },
        error: (error: any) => {
          console.error(error);
          this.dstData = error.error;
          //alert("Error occured while converting.");
        }
      });
  }
}
