var inputBtn = window.document.querySelector('#submitButton');

function consultar() {

    //Armazenando email:
    var userEmail = window.document.querySelector('#inputemail');
    var userEmail = userEmail.value;


    //Verificando se o e-mail é um e-mail válido:
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (userEmail.match(validRegex)) {
        //alert(`${userEmail} é um e-mail válido!`);

    } else {
        alert(`O e-mail preenchido é inválido. Por favor, tente novamente.`);

    }

    //Fazendo email virar JSON
    const payload = `{"email": "${userEmail}"}`;
    
    const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Connection': 'keep-alive'
    },
    body: payload,
    };

    //Usando o e-mail para consultar na API:
    fetch('https://hook.us1.make.com/xueb5gx1yufx3v7gr6km55v47vkc4bwy', options)
    .then(response => {
      return response.json();  
    })
    .then(data => {
        var offer_code = data.offer_code;
        
        //Redirect
        switch (offer_code) {
            case 'jwn1nzud':
                window.location.href = "https://pay.hotmart.com/?off=jwn1nzud&offDiscount=INVITATION12&sck=checkout1";
                break;
            case 'qii5bwet':
                window.location.href = "https://pay.hotmart.com/?off=jwn1nzud&offDiscount=INVITATION12&sck=checkout2";
                break;
        }
    });
}

inputBtn.addEventListener('click', function() {
    consultar()
});
