function fix(num, length) {
    return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}
const parse = function(value) {
    let d = value ? new Date(value * 1) : new Date();

    return {
        year: d.getFullYear().toString(),
        month: fix(d.getMonth() + 1, 2),
        date: fix(d.getDate(), 2),
        hours: fix(d.getHours(), 2),
        minutes: fix(d.getMinutes(), 2),
        seconds: fix(d.getSeconds(), 2)
    };
}
const parseDate = function(value, format = 'YYYY-MM-DD hh:mm:ss') {
    const regexp = /(\[[^[]*\])|Y{2,}|M+|D+|h+|m+|s+/g;

    function pattern(value, len, extra) {
        return extra
            ? value.substr(len * -1)
            : len === value.length
                ? value
                : value * 1;
    }

    let date = parse(value);

    const maps = {
        Y: 'year',
        M: 'month',
        D: 'date',
        h: 'hours',
        m: 'minutes',
        s: 'seconds'
    };

    return format.replace(regexp, str => {
        if (~str.indexOf('[')) return str.slice(1, -1);

        const extra = str[0] === 'Y';
        const len = extra
            ? str.length > 4
                ? 4
                : Math.ceil(str.length / 2) * 2
            : str.length > 2
                ? 2
                : str.length;

        return pattern(date[maps[str[0]]], len, extra);
    });
}

module.exports = { 
	parseDate,
	parse
};