module.exports = (function (AjaxFormObjectConfig, AjaxFormObject) {
    AjaxFormObject.Utils = {
        empty: function (val) {
            return (typeof (val) == 'undefined' || val == 0 || val === null || val === false || (typeof (val) == 'string' && val.replace(/\s+/g, '') == '') || (typeof (val) == 'object' && val.length == 0));
        },
        formatPrice: function (price) {
            price = this.number_format(price, 0, ".", " ");

            if (AjaxFormObjectConfig.price_format_no_zeros) {
                price = price.replace(/(0+)$/, '');
                price = price.replace(/[^0-9]$/, '');
            }

            return price;
        },
        formatWeight: function (weight) {
            var wf = AjaxFormObjectConfig.weight_format;
            weight = this.number_format(weight, wf[0], wf[1], wf[2]);

            if (AjaxFormObjectConfig.weight_format_no_zeros) {
                weight = weight.replace(/(0+)$/, '');
                weight = weight.replace(/[^0-9]$/, '');
            }

            return weight;
        },
        // Format a number with grouped thousands,
        number_format: function (number, decimals, dec_point, thousands_sep) {
            // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // bugfix by: Michael White (http://crestidg.com)
            var i, j, kw, kd, km;

            // input sanitation & defaults
            if (isNaN(decimals = Math.abs(decimals))) {
                decimals = 2;
            }
            if (dec_point == undefined) {
                dec_point = ',';
            }
            if (thousands_sep == undefined) {
                thousands_sep = '.';
            }

            i = parseInt(number = (+number || 0).toFixed(decimals)) + '';

            if ((j = i.length) > 3) {
                j = j % 3;
            } else {
                j = 0;
            }

            km = j
                ? i.substr(0, j) + thousands_sep
                : '';
            kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
            kd = (decimals
                ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, '0').slice(2)
                : '');

            return km + kw + kd;
        },
        getValueFromSerializedArray: function (name, arr) {
            if (!$.isArray(arr)) {
                arr = AjaxFormObject.sendData.formData;
            }
            for (var i = 0, length = arr.length; i < length; i++) {
                if (arr[i].name == name) {
                    return arr[i].value;
                }
            }
            return null;
        }
    };
});
