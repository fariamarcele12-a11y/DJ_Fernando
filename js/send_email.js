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
        window.location.href = "https://dj-fernando.vercel.app/obrigado.html";
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

$(document).ready(function () {
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    var form = $(this);
    var feedback = $("#contactFeedback");
    var submitBtn = form.find('button[type="submit"]');

    var nome = form.find('input[name="nome"]').val();
    var email = form.find('input[name="email"]').val();
    var telefone = form.find('input[name="telefone"]').val();
    var mensagem = form.find('textarea[name="mensagem"]').val();

    // Validação simples
    if (!nome || !email || !telefone || !mensagem) {
      feedback.removeClass("success").addClass("error");
      feedback.text("Por favor, preencha todos os campos.");
      return;
    }

    if (!email.includes("@")) {
      feedback.removeClass("success").addClass("error");
      feedback.text("Por favor, insira um e-mail válido.");
      return;
    }

    // Desabilita botão
    submitBtn.prop("disabled", true);
    feedback.removeClass("error").addClass("success");
    feedback.text("Enviando mensagem...");

    $.ajax({
      url: form.attr("action"),
      method: form.attr("method"),
      data: form.serialize(),

      success: function () {
        feedback.text("✅ Mensagem enviada com sucesso! Em breve entraremos em contato.");

        form.trigger("reset");

        // Redireciona
        window.location.href = "https://dj-fernando.vercel.app/obrigado.html";
      },

      error: function () {
        feedback.removeClass("success").addClass("error");
        feedback.text("❌ Erro ao enviar. Tente novamente.");
      },

      complete: function () {
        submitBtn.prop("disabled", false);
      },
    });
  });
});