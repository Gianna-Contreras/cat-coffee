// Cambiar foto
const btnFoto = document.getElementById("btnCambiarFoto");
const inputFoto = document.getElementById("inputFoto");
const avatar = document.getElementById("avatarPreview");

btnFoto.addEventListener("click", () => {
  inputFoto.click();
});

inputFoto.addEventListener("change", () => {
  const file = inputFoto.files[0];
  if (file) {
    avatar.src = URL.createObjectURL(file);
  }
});

// Mostrar/ocultar contraseña
const togglePass = document.getElementById("togglePass");
const password = document.getElementById("password");

togglePass.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
});