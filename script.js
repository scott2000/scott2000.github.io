console.log('Loading Page...');

function setCookie(cname,cvalue,exdays) {
   var d = new Date();
   d.setTime(d.getTime()+(exdays*24*60*60*1000));
   var expires = "expires="+d.toGMTString();
   document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
    }
    return "";
}

function randrange(start,end) {
    value = end + 1;
    return Math.floor(Math.random()*value) + start;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function factor(number) {
    factors = [];
    var num = 0;
    if (number > 0) {
        while(num <= number) {
            if(number % num === 0) {
                factors.push([num, number/num]);
                factors.push([-1 * num, -1 * (number/num)]);
            }
            num++;
        }
    } else if(number < 0) {
        while(num >= number) {
            if(number % num === 0) {
                factors.push([num, number/num]);
                factors.push([-1 * num, -1 * (number/num)]);
            }
            num--;
        }
    } else {
        factors.push([0,0]);
    }
    return factors;
}

function listFactors(number) {
    var factors = factor(number);
    for(var i = 0; i < factors.length; i++) {
        console.log(factors[i][0] + ', ' + factors[i][1]);
    }
}

$(document).ready(function() {
    $('#menu').accordion();
    console.log('Ready for input');

    $('#js').hover(function() {
        $(this).fadeTo('fast',0);
    },function() {
        $(this).fadeTo('fast',1);
    });

    // Tip Calculator
    $('#submitSubtotal').click(function() {
        var subtotal = $('input[name=subtotal]').val();
        console.log('Calculating Tip for ' + subtotal);
        var tip = Math.floor((subtotal * 20))*0.01;
        console.log('Tip is ' + tip);
        $('#tipValue').html('Tip: ' + tip);
        $('input[name=subtotal]').val('');
    });

    // Polynomial Factorer
    $('#submitFactor').click(function() {
        var a = $('input[name=a]').val();
        var b = $('input[name=b]').val();
        var c = $('input[name=c]').val();
        if(a === '' && b === '' && c !== '') {
            var fval = "";
            var fi = factor(c);
            for(var i = 0; i < fi.length; i++) {
                if(i !== 0) {
                    fval += ", ";
                }
                fval += "(" + fi[i][0] + ", " + fi[i][1] + ")";
            }
            $('#factorValue').html(fval);
            $('input[name=c]').val('');
        } else if(a === '' && b === '' && c === '') {
            $('#factorValue').html('Enter a polynomial to factor');
        } else {
            var multiplyBefore = 1;
            if(a === '') {
                a = '1';
            }
            if(b === '') {
                b = '1';
            }
            if(c === '') {
                c = '1';
            }
            a = parseInt(a,10);
            b = parseInt(b,10);
            c = parseInt(c,10);
            if(b % a === 0 && c % a === 0 && a !== 1) {
                multiplyBefore = a;
            }
            a /= multiplyBefore;
            b /= multiplyBefore;
            c /= multiplyBefore;
            if(multiplyBefore === 1) {
                multiplyBefore = '';
            }
            var aFactor = factor(a);
            var cFactor = factor(c);
            var done = false;
            for(var ai = 0; ai < aFactor.length; ai++) {
                var a1 = aFactor[ai][0];
                var a2 = aFactor[ai][1];
                for(var ci = 0; ci < cFactor.length; ci++) {
                    var c1 = cFactor[ci][0];
                    var c2 = cFactor[ci][1];
                    if((parseInt(a1*c2, 10) + parseInt(a2*c1, 10)) === b) {
                        ai = 1000;
                        ci = 1000;
                        done = true;
                        if(parseInt(a1,10) === 1) {
                            a1 = '';
                        }
                        if(parseInt(a2,10) === 1) {
                            a2 = '';
                        }
                        if(a === 1) {
                            a = '';
                        }
                        if(b === 1) {
                            b = '';
                        }
                        if(multiplyBefore === '') {
                            $('#factorValue').html(a + 'x<sup>2</sup> + ' + b + 'x + ' + c + ' = (' + a2 + 'x + ' + c2 + ')(' + a1 + 'x + ' + c1 + ')');
                        } else {
                            $('#factorValue').html(multiplyBefore + '(' + a + 'x<sup>2</sup> + ' + b + 'x + ' + c + ') = ' + multiplyBefore + '(' + a2 + 'x + ' + c2 + ')(' + a1 + 'x + ' + c1 + ')');
                        }
                    }
                }
            }

            if(done === false) {
                if(a === 1) {
                    a = '';
                }
                if(b === 1) {
                    b = '';
                }
                if(multiplyBefore === '') {
                    $('#factorValue').html('No solutions found for ' + a + 'x<sup>2</sup> + ' + b + 'x + ' + c);
                } else {
                    $('#factorValue').html('No solutions found for ' + multiplyBefore + '(' + a + 'x<sup>2</sup> + ' + b + 'x + ' + c + ')');
                }
            }
            $('input[name=a]').val('');
            $('input[name=b]').val('');
            $('input[name=c]').val('');
        }
    });
});
