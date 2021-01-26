const { ipcRenderer } = require('electron')


ipcRenderer.on( 'channel1-response', (e, args) => {
  console.log('svbzse')
});

$('#login-form').submit(function(e){
    e.preventDefault();
    $('.err-srv').text("").hide();
    var btn_html = $('.login').html();

    var pseudo = $('#pseudo').val();
    var password = $('#password').val();

    if( !validator.isLength(pseudo,{min:3,max:30}) ){
        $('.err-pseudo').fadeIn();
        $('#pseudo').addClass('border-err');
        return false;
    }   

    $('.err-pseudo').hide();
    $('#pseudo').removeClass('border-err');

    if( !validator.isLength(password,{min:3,max:30}) ){
        $('.err-password').fadeIn();
        $('#password').addClass('border-err');
        return false;
    }

    $('.err-password').hide();
    $('#password').removeClass('border-err');

    $('.login').html('chargement..');
    var args = {
        pseudo,
        password
    };

    if( pseudo == "admin" && password == "12345" ){
        let response = ipcRenderer.sendSync( 'temp_login', args)

        $('#login-form')[0].reset();
        $('#pseudo').focus();
        $('.login').html('Se connecter');
        // $('.err-srv').text("success !!!!!!!!!!").show();
    }else{
        $('.login').html('Se connecter');
        $('.err-srv').text("Veuillez verifier vos informations").show();
    }

    // let response = ipcRenderer.sendSync( 'login-form', args)
    // if( response.success ){
    //     $('#login-form')[0].reset();
    //     $('#pseudo').focus();
    //     $('.login').html('Se connecter');
    //     // $('.err-srv').text("success !!!!!!!!!!").show();
    // }else{
    //     $('.login').html('Se connecter');
    //     $('.err-srv').text(response.msg).show();
    // }

});

