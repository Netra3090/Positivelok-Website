const bar = document.getElementById('menu-bar');
const close = document.getElementById('close-button');
const nav = document.getElementById('nav-menu');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
        nav.classList.add('menu-open');
    })
}

if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
    nav.classList.remove('menu-open');
  });
}

function sendMail() {
    let parms = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value ,
        phone : document.getElementById("phone").value ,
        message : document.getElementById("message").value,
    };

    emailjs.send("service_w1z9d0k", "template_31zryft", parms)
        .then(() => {
            alert("Email Sent!");
        })
        .catch((error) => {
            console.error("Email failed to send:", error);
            alert("Something went wrong. Please try again.");
        });

}