$(document).ready(function () {
  $("#newsletterForm").on("submit", function (e) {
    e.preventDefault();
    var form = $(this);
    var formFeedback = $("#formFeedback");
    var submitBtn = form.find('button[type="submit"]');
    var email = form.find('input[name="email"]').val();
    // Validação simples
    if (!email || !email.includes("@")) {
      formFeedback.removeClass("success").addClass("error");
      formFeedback.text("Por favor, insira um e-mail válido.");
      setTimeout(function () {
        formFeedback.fadeOut("slow", function () {
          $(this).removeClass("error").html("").show();
        });
      }, 3000);
      return;
    }
    // Desabilita botão durante envio
    submitBtn.prop("disabled", true);
    formFeedback.removeClass("success error").addClass("success");
    formFeedback.text("Enviando...");
    // Envia o formulário via AJAX
    $.ajax({
      url: form.attr("action"),
      method: form.attr("method"),
      data: form.serialize(),
      success: function () {
        formFeedback.text(
          "✅ E-mail cadastrado com sucesso! Você receberá nossas novidades.",
        );
        form.find('input[name="email"]').val("");
        setTimeout(function () {
          formFeedback.fadeOut("slow", function () {
            $(this).removeClass("success").html("").show();
          });
        }, 5000);
      },
      error: function () {
        formFeedback.removeClass("success").addClass("error");
        formFeedback.text("❌ Erro ao enviar. Tente novamente mais tarde.");
        setTimeout(function () {
          formFeedback.fadeOut("slow", function () {
            $(this).removeClass("error").html("").show();
          });
        }, 5000);
      },
      complete: function () {
        submitBtn.prop("disabled", false);
      },
    });
  });
});
