# DYMO Connect Framework  

## Getting Started 🚀

These instructions will help you to understand how DYMO Connect framework works for Javascript applications.

### Prerequisites 📋

DYMO Connect Software installed

* [DYMO Connect Software](https://www.dymo.com/en-US/dymo-connect-for-desktop-v12--windows%C2%AE-dymo-connect-for-desktop-v12#tab=Support)

* DYMO Connect framework has compatibility with DYMO Label Software

Samples 

* [JS samples](https://github.com/dymosoftware/DCD-SDK-Sample/tree/master/JavaScript)

### Installing 🔧

Include the framework into your project

* [https://github.com/dymosoftware/dymo-connect-framework/blob/master/dymo.connect.framework.js](https://github.com/dymosoftware/dymo-connect-framework/blob/master/dymo.connect.framework.js)
* [http://labelwriter.com/software/dls/sdk/js/dymo.connect.framework.js](http://labelwriter.com/software/dls/sdk/js/dymo.connect.framework.js)

### Methods ⚙️
These are the methods available in JavaScript SDK

- #### dymo.connect.framework
    - **Initialize**
    ```javascript 
     dymo.label.framework.init() //Initialize DYMO Label Framework
    ```
    ```javascript
    dymo.label.framework.checkEnvironment() // Validate if the environment meets the requirements
    ```
    - **Load label**
    ```javascript
    dymo.label.framework.openLabelFile(fileName) //Load label from file name
    ```
    - **Validate label**
    ```javascript
    dymo.label.framework.openLabelXml(labelXml) //Load label from XML content
    ```
     - **Validate label**
    ```javascript
    dymo.label.framework.isValidLabel() //Validate if the current content is a valid label
    dymo.label.framework.isDCDLabel() //Validate if the current content is a valid DYMO Connect label
    dymo.label.framework.isDLSLabel() //Validate if the current content is a valid DYMO Label Software label
    ```
     - **Get printers**
    ```javascript
    dymo.label.framework.getPrinters() //Get list of DYMO printers installed
    ```
    - **Print**
    ```javascript
    dymo.label.framework.printLabel(printerName, printParamsXml, labelXml, labelSetXml) //Print label
    ```
     - **Get preview**
    ```javascript
    dymo.label.framework.renderLabel(labelXml, renderParamsXml, printerName) //Get label preview image of the label
    ```

## Authors ✒️

DYMO Team
[www.dymo.com](http://www.dymo.com/en-US)

## Acknowledgments 📢

* [NETStandard documentation](https://docs.microsoft.com/en-us/dotnet/standard/net-standard)
* Questions? [dymoconsumercare@newellco.com](mailto:dymoconsumercare@newellco.com)
