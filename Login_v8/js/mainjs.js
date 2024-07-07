document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /*==================================================================
    [ Validate ]*/
  var input = document.querySelectorAll(".validate-input .input100");
  var loginForm = document.getElementById("loginForm");
  var messageDiv = document.getElementById("message");

  loginForm.addEventListener("submit", function (event) {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) === false) {
        showValidate(input[i]);
        check = false;
      }
    }

    if (!check) {
      event.preventDefault(); // 유효성 검사 실패 시 폼 제출 방지
    } else {
      event.preventDefault(); // 유효성 검사 성공 시에도 폼 제출 방지하고 로그인 검증 처리
      login();
    }
  });

  input.forEach(function (element) {
    element.addEventListener("focus", function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if (
      input.getAttribute("type") === "email" ||
      input.getAttribute("name") === "email"
    ) {
      if (
        input.value
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if (input.value.trim() === "") {
        return false;
      }
    }
    return true; // 모든 경우에 대해 반환 값 설정
  }

  function showValidate(input) {
    var thisAlert = input.parentElement;
    thisAlert.classList.add("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = input.parentElement;
    thisAlert.classList.remove("alert-validate");
  }

  function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
      messageDiv.textContent = `Welcome, ${username}!`;
      messageDiv.style.color = "green";
    } else {
      messageDiv.textContent = "Invalid username or password.";
      messageDiv.style.color = "red";
    }
  }
});
