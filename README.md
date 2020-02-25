# DYMO Connect Framework  

DYMO.Connect.Framework is a new JavaScript SDK based on DYMO.Label.Framework introducing compatibility with DYMO Connect Software.


## Getting Started 🚀

These instructions will help you to understand how DYMO.Connect.Framework works.

### Prerequisites 📋

DYMO Connect Software installed

* [DYMO Connect Software](https://www.dymo.com/en-US/dymo-connect-for-desktop-v12--windows%C2%AE-dymo-connect-for-desktop-v12#tab=Support)

* DYMO.Connect.Framework has compatibility with DYMO Label Software and DYMO Connect Software.

Samples 

* [JS samples](https://github.com/dymosoftware/DCD-SDK-Sample/tree/master/JavaScript)

### Installing 🔧

Include the framework into your project

* [https://github.com/dymosoftware/dymo-connect-framework/blob/master/dymo.connect.framework.js](https://github.com/dymosoftware/dymo-connect-framework/blob/master/dymo.connect.framework.js)
* [http://labelwriter.com/software/dls/sdk/js/dymo.connect.framework.js](http://labelwriter.com/software/dls/sdk/js/dymo.connect.framework.js)

### Functions ⚙️

dymo.connect.framework includes functions from the previous dymo.label.framework

* [DYMO.Label.Framework documentation](http://labelwriter.com/software/dls/sdk/docs/DYMOLabelFrameworkJavaScriptHelp/)

These are the main functions to get start

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
    dymo.label.framework.openLabelFile(fileName) //Load label from file name and return label instance
    ```
    - **Validate label**
    ```javascript
    dymo.label.framework.openLabelXml(labelXml) //Load label from XML content and return label instance
    ```
     - **Validate label instance** (introduced in dymo.connect.framework)
    ```javascript
    label.isValidLabel() //Validate if the current content is a valid label based on the current service installed
    label.isDCDLabel() //Validate if the current content is a valid DYMO Connect label based on DYMO Connect service
    label.isDLSLabel() //Validate if the current content is a valid DYMO Label Software label based on DYMO Label Software service
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
## Important notes

Opening a label file previously created from DYMO Label Software, with DYMO Connect Software installed, it will convert the structure of DLS label into DYMO Connect label.
Therefore, **isDCDLabel** function will return always true after label file has been open, when DYMO Connect is running.

**setTextMarkup** function is not supported for DYMO Connect labels. 


## Authors ✒️

DYMO Team
[www.dymo.com](http://www.dymo.com/en-US)

## Acknowledgments 📢

* [NETStandard documentation](https://docs.microsoft.com/en-us/dotnet/standard/net-standard)
* Questions? [dymoconsumercare@newellco.com](mailto:dymoconsumercare@newellco.com)
*  [Developer's blog](https://developers.dymo.com/)
