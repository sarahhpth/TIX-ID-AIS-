var dana_login = "https://dana-api.glitch.me/api/login";

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const no_hp = document.querySelector("#no_hp");
const password = document.querySelector("#password");
const buttonSubmit = document.querySelector("#submit");

buttonSubmit.addEventListener("click", (e) => {
    e.preventDefault(); // mencegah refresh

    // format req api dana
    var raw = JSON.stringify({
        no_hp: no_hp.value,
        pass: password.value
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    async function getResponse(url){
        try {
            let res = await fetch(url, requestOptions)
            console.log("Fetch berhasil");
            return await (res.text());
        } catch(error) {
            console.log('error', error)
        };
    }

    async function getData(){
        //response masih dalam bentuk string
        let data_dana = await getResponse(dana_login);
        
        //response string dijadiin json
        var resp_dana = JSON.parse(data_dana);

        //kalo success
        if(resp_dana.success == true){
            window.localStorage.setItem('dana', resp_dana.token);
            window.location.href = "profile.html";
            alert(resp_dana.message);
        }else{
            alert(resp_dana.message);
        }
        
    };

    getData();
})