const userName = document.querySelector("#username");
const pass1 = document.querySelector("#password");
const pass2 = document.querySelector("#password2");
const email = document.querySelector("#email");
const clearBtn = document.querySelector(".clear");
const sendForm = document.querySelector(".send");
//const error = document.querySelector(".error-text");

const popup = document.querySelector(".popup")
const closePopup = document.querySelector(".close")

const showError = (input, msg) => {
        const formBox = input.parentElement
        const errorMsg = formBox.querySelector(".error-text")

        formBox.classList.add("error")
        errorMsg.textContent = msg
}
const clearError = (input) => {
    const formBox = input.parentElement;
    formBox.classList.remove("error")
}


const checkForm = (input) => {
   input.forEach(el => {
       if(el.value === "") {
         showError(el,el.placeholder)
       } else {
          clearError(el)
       }
   })
}
const checkLength = (input, min) => {
    if(input.value.length < min) {
        showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} składa się z min ${min} znaków `)
    }
}
const checkPassword = (pass1,pass2) => {
    if(pass1.value !== pass2.value) {
        showError(pass2, `Hasła do siebie nie pasują`)
    }
}
const checkEmail = (email) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
     if(re.test(email.value)){
         clearError(email)
     } else {
         showError(email, `E-mail jest nie poprawny!`)
     }
}

const checkError = () => {
    const allInput = document.querySelectorAll(".form-box")
    let error = 0;
    allInput.forEach(el => {
        if(el.classList.contains("error")){
            error++
        }
    })
    if(error === 0) {
        popup.classList.add("show-popup")

    }

}

const clearForm = (e) => {
    e.preventDefault()
   const array = [userName,pass1,pass2,email].forEach(el => {
       el.value = "";
       clearError(el)
   })

}


clearBtn.addEventListener("click", clearForm)
sendForm.addEventListener('click', e => {
    e.preventDefault();
    checkForm([userName,pass1,pass2,email]);
    checkLength(userName,5);
    checkLength(pass1, 8);
    checkPassword(pass1,pass2);
    checkEmail(email);
    checkError();
})

closePopup.addEventListener("click", ()=>{
      popup.classList.remove("show-popup")
    })



