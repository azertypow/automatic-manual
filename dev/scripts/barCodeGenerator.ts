declare const require: any;
const JsBarcode = require('jsbarcode');

export function barCodeGenerator() {
    const date = new Date();

    console.log(
        "date.getDay()", date.getDay(),
        "date.getDate()", date.getDate(),
        "date.getMonth()", date.getMonth(),
        "date.getHours()", date.getHours(),
        "date.getFullYear()", date.getFullYear(),
        "date.getMinutes()", date.getMinutes(),
        "date.getSeconds()", date.getSeconds(),
    );

    const days = {
        1:"LUN",
        2:"MAR",
        3:"MER",
        4:"JEU",
        5:"VEN",
        6:"SAM",
        0:"DIM",
    };

    const month = {
        0: "01",
        1: "02",
        2: "03",
        3: "04",
        4: "05",
        5: "06",
        6: "07",
        7: "08",
        8: "09",
        9: "10",
        10: "11",
        11: "12",
    };

    if(window.localStorage.getItem("iterator") === null) {
        window.localStorage.setItem("iterator", "0");
    } else {

        const newValue = parseInt(window.localStorage.getItem("iterator")) + 1;
        window.localStorage.setItem("iterator", `${newValue}`);
    }

    const barCodeCanvas = document.createElement("canvas");
    // barCodeCanvas.width = 250;
    // barCodeCanvas.height = 100;
    barCodeCanvas.style.position = "absolute";
    barCodeCanvas.style.bottom = "12px";
    barCodeCanvas.style.left = "12px";
    barCodeCanvas.style.background = "transparent";
    document.querySelector(".page-1").appendChild(barCodeCanvas);

    const jsCodeOption: BaseOptions = {
        font: "Arial",
        textAlign: "center",
        width:0.8,
        height:70,
        fontSize: 11,
    };

    JsBarcode(
        barCodeCanvas,
        `#${window.localStorage.getItem("iterator")} ${date.getHours()}${date.getMinutes()}${date.getSeconds()}`,
        jsCodeOption,
    );
}

interface BaseOptions {
    width?: number;
    height?: number;
    format?: string;
    displayValue?: boolean;
    fontOptions?: string;
    font?: string;
    text?: string;
    textAlign?: string;
    textPosition?: string;
    textMargin?: number;
    fontSize?: number;
    background?: string;
    lineColor?: string;
    margin?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    valid?: (valid: boolean) => void;
}