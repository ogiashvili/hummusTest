
const path = require('path');
const fs = require('fs');
const hummus = require("hummus");

function test() {
    let sourcePdf = path.join(__dirname, 'pdf-html/test2.pdf');
    let PDFDigitalForm = require('./helper');
    let pdfParser = hummus.createReader(sourcePdf);
    var infoDict = pdfParser.queryDictionaryObject(pdfParser.getTrailer(), "Info")
    var info = infoDict.toJSObject()

    Object.keys(info).forEach(function(key){
        info[key]=pdfParser.queryDictionaryObject(infoDict,key).value
    });

    let digitalForm = new PDFDigitalForm(pdfParser);
    if(digitalForm.hasForm()) {
        console.log(digitalForm.fields);
        console.log(digitalForm.createSimpleKeyValue());
    }
}

test();

