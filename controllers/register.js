function Register() {
    this.email = '';
    this.password = '';
    this.name = '';
    this.gender = true;
    this.phone = '';
}

var validation = {
    kiemTraRong: function (value, errId, name) {
        //Nếu không hợp lệ thì hàm này return về false ngược lại return về true
        if (value.trim() === '') {
            document.getElementById(errId).style.display = 'block';
            document.getElementById(errId).innerHTML = `${name} cannot be blank!`;
            return false;
        }

        document.getElementById(errId).style.display = 'none';
        return true;
    },
    kiemTraKyTu: function (value, errId, name) {
        var regexLetter = /^[A-Z a-z]+$/;
        if (regexLetter.test(value)) {
            document.getElementById(errId).style.display = 'none';
            return true;
        }

        document.getElementById(errId).style.display = 'block';
        document.getElementById(errId).innerHTML = `${name} must be characters!`;
        return false;
    },
    kiemTraEmail: function (value, errId) {
        var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regexEmail.test(value)) {
            document.getElementById(errId).style.display = 'none';
            return true;
        }
        document.getElementById(errId).style.display = 'block';
        document.getElementById(errId).innerHTML = 'Invalid Email format!';
        return false;
    },
    kiemTraMatch: function (value1, value2, errId, msg) {
        if (value1 === value2) {
            document.getElementById(errId).style.display = 'none';
            return true;
        }
        document.getElementById(errId).style.display = 'block';
        document.getElementById(errId).innerHTML = `${msg}`;
        return false;
    },
    kiemTraPhone: function (value, errId, name) {
        var regex = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
        if (regex.test(value)) {
            document.getElementById(errId).style.display = 'none';
            return true;
        }
        document.getElementById(errId).style.display = 'block';
        document.getElementById(errId).innerHTML = `Invalid ${name} format!`;
        return false;
    },
    kiemTraSo: function (value, errId, name) {
        var regexNumber = /^[0-9]+$/;
        if (regexNumber.test(value)) {
            document.getElementById(errId).style.display = 'none';
            return true;
        }
        document.getElementById(errId).style.display = 'block';
        document.getElementById(errId).innerHTML = `${name} must be a number!`;
        return false;
    },
    kiemTraDoDai: function (value, errId, name, minLength, maxLength) {
        if (value.length > maxLength || value.length < minLength) {
            document.getElementById(errId).style.display = 'block';
            document.getElementById(errId).innerHTML = `${name} must have length from ${minLength} to ${maxLength} characters!`;
            return false;
        }
        document.getElementById(errId).style.display = 'none';
        return true;
    },
    kiemTraGiaTri: function (value, errId, name, minValue, maxValue) {
        var newValue = Number(value);
        if (newValue > maxValue || newValue < minValue) {
            document.getElementById(errId).style.display = 'block';
            document.getElementById(errId).innerHTML = `${name} must be from ${minLength} to ${maxLength}!`
            return false;
        }
        document.getElementById(errId).style.display = 'none';
        return true;
    }

}

function submitRegister() {
    var email = document.getElementById('register_email').value;
    var password = document.getElementById('register_password').value;
    var passwordcf = document.getElementById('register_password_confirm').value;
    var name = document.getElementById('register_name').value;
    var phone = document.getElementById('register_phone').value;
    var checkbox = document.getElementsByName("genderSelector");
    var gender = -1;
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked === true) {
            gender = i;
        }
    }
    var valid=true;
    // kiem tra gender
    if (gender < 0) {
        document.getElementById('err_gender').style.display = 'block';
        document.getElementById('err_gender').innerHTML = `Gender must be chosen!`
        valid &= false;
    } else { document.getElementById('err_gender').style.display = 'none'; }
    // Kiem tra email
    valid &= validation.kiemTraRong(email, 'err_email', 'Email')
        && validation.kiemTraEmail(email, 'err_email');

    // Kiem tra password
    valid &= validation.kiemTraRong(password, 'err_password', 'Password')
    valid &= validation.kiemTraRong(passwordcf, 'err_password_confirm', 'Password confirm')
        && validation.kiemTraMatch(password, passwordcf, 'err_password_confirm',
            `Password must match Password Confirm!`);

    // kiem tra name & phone
    valid &= validation.kiemTraRong(name, 'err_name', 'Name')
    valid &= validation.kiemTraRong(phone, 'err_phone', 'Phone')
        && validation.kiemTraPhone(phone, 'err_phone', 'Phone');

    if (!valid) {
        document.getElementById('fail_register').style.display = 'block';
        document.getElementById('success_register').style.display = 'none';
        return;
    }

    var re = new Register();
    re.email = email;
    re.password = password;
    re.gender = (gender === 0) ? true : false;
    re.name = name;
    re.phone = phone;
    console.log(re);
    var promise = axios({
        url: 'https://shop.cyberlearn.vn/api/Users/signup',
        method: 'POST',
        data: re
    });

    //Thành công
    promise.then(function (res) {
        document.getElementById('success_register').style.display = 'block';
        document.getElementById('fail_register').style.display = 'none';
        document.getElementById('err_email').style.display = 'none';
        console.log(res.data);
    });

    //Thất bại
    promise.catch(function (err) {
        document.getElementById('fail_register').style.display = 'block';
        document.getElementById('success_register').style.display = 'none';
        document.getElementById('err_email').innerHTML = 'This Email has existed!';
        document.getElementById('err_email').style.display = 'block';
        console.log(err);
    })
}

