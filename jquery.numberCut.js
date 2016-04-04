$.fn.numberCut = function () {
    var d = 3;
    return this.each(function () {
        var $this = $(this);
        var value = $.trim($this.text());
        if (!$.isNumeric(value))return;
        var values = value.split(".");
        if (values.length < 2)return;
        var index = $.trim(values[1]).regexIndexOf(/[1-9]/);
        var newValue = values[0] + "." + (new Big("0." + values[1]).round(index + d).toString()).split(".")[1];
        $this.data("originNumberValue",value);
        $this.text(newValue);
        return $this;
    });
};

String.prototype.regexIndexOf = function (regex, startpos) {
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}

String.prototype.regexLastIndexOf = function (regex, startpos) {
    regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : ""));
    if (typeof (startpos) == "undefined") {
        startpos = this.length;
    } else if (startpos < 0) {
        startpos = 0;
    }
    var stringToWorkWith = this.substring(0, startpos + 1);
    var lastIndexOf = -1;
    var nextStop = 0;
    while ((result = regex.exec(stringToWorkWith)) != null) {
        lastIndexOf = result.index;
        regex.lastIndex = ++nextStop;
    }
    return lastIndexOf;
}
