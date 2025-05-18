# Test App for Conversion Microservice (XML <--> JSON)

This application provides a simple test of the Converter microservice, allowing the user to convert between JSON and XML.

## Example Call

The following are example programmatic calls to the microservice, written in TypeScript/JavaScript, which provides 2 conversion function endpoints.

```
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
```

```
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
```

## UML Diagram



## API Specification

SwaggerUI utilzing the below spec can be found here: https://www.terracetta.com/swagger/index.html

Specification conforms to openapi specification version 3.0.4

```
{
    "openapi": "3.0.4",
    "servers": [
        {
            "url": "https://converter.api.terracette.com"
        }
    ],
    "info": {
        "title": "cs361.xmltojson.microservice",
        "version": "1.0"
    },
    "paths": {
        "/Converter": {
            "get": {
                "tags": [
                    "Converter"
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/Converter/xmltojson": {
            "post": {
                "tags": [
                    "Converter"
                ],
                "parameters": [
                    {
                        "name": "body",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/Converter/jsontoxml": {
            "post": {
                "tags": [
                    "Converter"
                ],
                "parameters": [
                    {
                        "name": "body",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/": {
            "get": {
                "tags": [
                    "cs361.xmltojson.microservice"
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "components": {}
}
```

## Generation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
