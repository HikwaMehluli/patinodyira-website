(function () {
  "use strict";

  document.querySelectorAll(".php-email-form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var loading = form.querySelector(".loading");
      var errorMsg = form.querySelector(".error-message");
      var sentMsg = form.querySelector(".sent-message");

      loading.classList.add("d-block");
      errorMsg.classList.remove("d-block");
      sentMsg.classList.remove("d-block");

      var action = form.getAttribute("action");

      if (!action) {
        loading.classList.remove("d-block");
        errorMsg.textContent = "Form action URL is not set.";
        errorMsg.classList.add("d-block");
        return;
      }

      fetch(action, {
        method: "POST",
        body: new FormData(form),
      })
        .then(function (response) {
          return response.json().then(function (data) {
            return { ok: response.ok, data: data };
          });
        })
        .then(function (result) {
          loading.classList.remove("d-block");

          if (result.ok && result.data.ok) {
            sentMsg.classList.add("d-block");
            form.reset();
          } else {
            var message =
              (result.data && result.data.error) || "Something went wrong. Please try again.";
            errorMsg.textContent = message;
            errorMsg.classList.add("d-block");
          }
        })
        .catch(function () {
          loading.classList.remove("d-block");
          errorMsg.textContent =
            "Could not connect to the server. Please check your connection and try again.";
          errorMsg.classList.add("d-block");
        });
    });
  });
})();
