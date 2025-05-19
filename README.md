# Test App for Conversion Microservice (XML <--> JSON)

This application provides a simple test of the Converter microservice, allowing the user to convert between JSON and XML.

## Example Call

The following are example programmatic calls to the microservice, written in TypeScript/JavaScript, which provides 2 conversion function endpoints. Both calls can be completed with simple POST requests to their given endpoints, setting the value as a string in the request body, and providing the 'Content-Type' header with the value 'text/plain'. You should also set the 'Accept' header with the value 'text/plain' as error messages will not return in the requested endpoint data format, but as plain text. After sending a request and receiving a response (these are synchronous calls), you can then serialize the returned string value into the appropriate object type. Ex: JSON.parse(response.body); for serializing a JSON string into a javascript object.

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

### xmltojson Success Response (200 OK)

```
{"?xml":{"@version":"1.0","@standalone":"no"},"root":{"person":[{"@id":"1","name":"Alan","url":"http://www.google.com"},{"@id":"2","name":"Louis","url":"http://www.yahoo.com"}]}}
```

### xmltojson Error Response (400 Bad Request)

```
Unexpected end of file has occurred. The following elements are not closed: root. Line 19, position 7.
```

### jsontoxml Success Response (200 OK)

```
{"?xml":{"@version":"1.0","@standalone":"no"},"root":{"person":[{"@id":"1","name":"Alan","url":"http://www.google.com"},{"@id":"2","name":"Louis","url":"http://www.yahoo.com"}]}}
```

### jsontoxml Error Response (400 Bad Request)

```
JsonToken EndArray is not valid for closing JsonType Object. Path 'root.person[1]', line 18, position 5.
```

## UML Diagrams
![alt text](https://github.com/h5aaimtron/Test-App/blob/main/xmltojson-uml.png "XML to JSON UML Diagram")

![alt text](https://github.com/h5aaimtron/Test-App/blob/main/jsontoxml-uml.png "JSON to XML UML Diagram")


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
