Java.perform(() => {
    const Sign = Java.use('com.yuanrenxue.match2022.security.Sign');
    console.log('Sign:', Sign)
    const sign = Sign.sign;
    sign.implementation = function (a: any) {
        // let text = "";
        // for (let i = 0; i < a.length; i++) {
        //     text += String.fromCharCode(a[i]);
        // }
        console.log('params:', a)
        const result = this.sign(a)
        console.log('result:', result)
        return result;
    };
    const String = Java.use('java.lang.String');
    console.log('String:', String);
    String.format.overload('java.lang.String', '[Ljava.lang.Object;').implementation = function (a: any, b: any) {
        console.log('a:', a);
        console.log('b:', b);
        return String.format(a, b)
    }
    String.format.overload('java.util.Locale', 'java.lang.String', '[Ljava.lang.Object;').implementation = function (a: any, b: any, c: any) {
        console.log('a:', a);
        console.log('b:', b);
        console.log('c:', c);
        return String.format(a, b, c)
    }
});