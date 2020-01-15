# DYMO Connect SDK  

## Getting Started 🚀

These instructions will help you to understand how DYMO Connect framework works for Javascript applications.

### Prerequisites 📋

DYMO Connect Software installed

* [DYMO Connect Software](https://www.dymo.com/en-US/dymo-connect-for-desktop-v12--windows%C2%AE-dymo-connect-for-desktop-v12#tab=Support)

* DYMO Connect framework has compatibility with DYMO Label Software

Reference to Javascript SDK file

* [DYMO.Connect.Framework](http://labelwriter.com/software/dls/sdk/js/dymo.connect.framework.js)

### Installing 🔧

Include the file in your project
```html
<script src = "http://labelwriter.com/software/dls/sdk/js/dymo.connect.framework.js" type="text/javascript"> </script>
```

### Methods ⚙️
These are the methods availables in JavaScript SDK

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
     - **Get preview**
    ```javascript
    dymo.label.framework.isValidLabel() //Validate if the current label content belongs to a valid DYMO label
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
