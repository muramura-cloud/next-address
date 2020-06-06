class Lib {
    static deepcopy(val) {
        return JSON.parse(JSON.stringify(val));
    }

    static encodeEmail(val) {
        return val.split(".").join("*");
    }
    static decodeEmail(val) {
        return val.split("*").join(".");
    }
    static toDoubleDigits(num) {
        num += "";
        if (num.length === 1) {
            num = "0" + num;
        }
        return num;
    }
}

export default Lib;