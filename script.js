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

function a(vo, v, x, t) {
    if (v === '') {
        return ((2*x) - (2*vo*t))/(t*t);
    } else if (t === '') {
        return ((v*v)-(vo*vo))/(2*x);
    }
    return (v-vo)/t;
}

function initialV(a, v, x, t) {
    if (a === '') {
        return ((2*x)/t)-v;
    } else if (t === '') {
        var v = Math.sqrt(Math.abs((v*v)-(2*a*x)));
        if (a < 0) {
            v = -v;
        }
        return v;
    } else if (v == '') {
        return ((a*t)/2)+(x/t);
    }
    return v-(a*t);
}

function v(a, vo, x, t) {
    if (a === '') {
        return ((2*x)/t)-vo;
    } else if (t === '') {
        var v = Math.sqrt(Math.abs((vo*vo)+(2*a*x)));
        if (a < 0) {
            v = -v;
        }
        return v;
    }
    return (a*t)+parseFloat(vo);
}

function x(a, vo, v, t) {
    if (v === '') {
        return (vo*t)+((a*t*t)/2);
    } else if (t === '') {
        return ((v*v)-(vo*vo))/(2*a);
    }
    return (t/2)*(parseFloat(vo)+parseFloat(v));
}

function t(a, vo, v2, x) {
    if (a === '') {
        return (2*x)/(parseFloat(vo)+parseFloat(v));
    } else if (v2 === '') {
        return (v(a, vo, x, '')-vo)/a
    }
    return (v2-vo)/a;
}

$(document).ready(function() {
    $('#menu').accordion({heightStyle: "content"});

    var curr = new Date().getTime()/1000 | 0;
    var last = curr-parseInt(getCookie('last'));
    setCookie('last', curr, 1000);
    if (last !== '') {
        if (last < 60) {
            $('#counter').html('<p>You last visited '+last+' seconds ago.</p>');
        } else if (last < 60*60) {
            $('#counter').html('<p>You last visited '+(last/60 | 0)+' minutes ago.</p>');
        } else if (last < 60*60*24) {
            $('#counter').html('<p>You last visited '+(last/(60*60) | 0)+' hours ago.</p>');
        } else if (last < 31557600) {
            $('#counter').html('<p>You last visited '+(last/(60*60*24) | 0)+' days ago.</p>');
        } else {
            $('#counter').html('<p>You last visited over a year ago.</p>');
        }
    }

    $('.subtotalBox').keypress(function (e) {
        if (e.keyCode === 13) {
            $('#submitSubtotal').click();
        }
    });

    $('.abcBox').keypress(function (e) {
        if (e.keyCode === 13) {
            $('#submitFactor').click();
        }
    });

    $('.kinematicBox').keypress(function (e) {
        if (e.keyCode === 13) {
                if ( $('input[name=acceleration]').val() !== '' && $('input[name=initialVelocity]').val() !== '' && $('input[name=velocity]').val() !== '' && $('input[name=position]').val() !== '' && $('input[name=time]').val() !== '') {
                    $('#clearKinematic').click();
                } else {
                    $('#submitKinematic').click();
                }
        }
    });

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
        $('#tipValue').html('Tip: ' + tip.toFixed(2));
        $('input[class=subtotalBox]').val('');
        $('input[name=subtotal]').select();
    });

    // Polynomial Factorer
    $('#submitFactor').click(function() {
        var a = $('input[name=a]').val();
        var b = $('input[name=b]').val();
        var c = $('input[name=c]').val();
        if(a === '' && b === '' && c === '') {
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
            if(b % a === 0 && c % a === 0 && a !== 1 && a !== 0) {
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
            for(var ai = 0; ai < aFactor.length && ai !== -1; ai++) {
                var a1 = aFactor[ai][0];
                var a2 = aFactor[ai][1];
                for(var ci = 0; ci < cFactor.length && ci !== -1; ci++) {
                    var c1 = cFactor[ci][0];
                    var c2 = cFactor[ci][1];
                    if(a1*c2 + a2*c1 === b) {
                        ai = -2;
                        ci = -2;
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
            $('input[name=a]').select();
        }
    });

    //Kinematic Equation Submit
    $('#submitKinematic').click(function() {
        var acceleration = $('input[name=acceleration]').val();
        var initialVelocity = $('input[name=initialVelocity]').val();
        var velocity = $('input[name=velocity]').val();
        var position = $('input[name=position]').val();
        var time = $('input[name=time]').val();
        var empties = 0;
        if (acceleration === '') {
            empties++;
        }
        if (initialVelocity === '') {
            empties++;
        }
        if (velocity === '') {
            empties++;
        }
        if (position === '') {
            empties++;
        }
        if (time === '') {
            empties++;
        }
        if (empties > 2) {
            $('#kinematicWarning').css("color", "darkred");
        } else {
            $('#kinematicWarning').css("color", "black");
            if (initialVelocity === '') {
                initialVelocity = initialV(acceleration, velocity, position, time);
                $('input[name=initialVelocity]').val(initialVelocity.toFixed(2));
            }
            if (acceleration === '') {
                $('input[name=acceleration]').val(a(initialVelocity, velocity, position, time).toFixed(2));
            }
            if (velocity === '') {
                $('input[name=velocity]').val(v(acceleration, initialVelocity, position, time).toFixed(2));
            }
            if (position === '') {
                $('input[name=position]').val(x(acceleration, initialVelocity, velocity, time).toFixed(2));
            }
            if (time === '') {
                $('input[name=time]').val(t(acceleration, initialVelocity, velocity, position).toFixed(2));
            }
        }
    });

    //Kinematic Equation Clear
    $('#clearKinematic').click(function() {
        $('#kinematicWarning').css("color", "black");
        $('input[class=kinematicBox]').val('');
        $('input[name=acceleration]').select();
    });

    console.log('Ready for input');
});
