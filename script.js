$(document).ready(function () {
  // 0 = 5개로 흩어져 제각각 돌아다님, 1 = 하나로 뭉쳐서 마우스를 따라옴
  let merge_status = 0;

  // 흩어지기 : 5개를 화면 안의 아무 곳(랜덤 위치)으로 보냄
  // (처음 · 다시 클릭해서 나뉠 때 · 몇 초마다 계속 쓰여서 함수로 묶음)
  function scatter() {
    let w = $(window).width(); // 화면 너비
    let h = $(window).height(); // 화면 높이

    // Math.random() : 0 ~ 1 사이의 아무 숫자
    // → 가로는 화면의 10% ~ 85%, 세로는 15% ~ 80% 사이 아무 곳 (화면 끝에 붙지 않게)
    $(".g1").css("left", w * 0.1 + Math.random() * w * 0.75);
    $(".g1").css("top", h * 0.15 + Math.random() * h * 0.65);

    $(".g2").css("left", w * 0.1 + Math.random() * w * 0.75);
    $(".g2").css("top", h * 0.15 + Math.random() * h * 0.65);

    $(".g3").css("left", w * 0.1 + Math.random() * w * 0.75);
    $(".g3").css("top", h * 0.15 + Math.random() * h * 0.65);

    $(".g4").css("left", w * 0.1 + Math.random() * w * 0.75);
    $(".g4").css("top", h * 0.15 + Math.random() * h * 0.65);

    $(".g5").css("left", w * 0.1 + Math.random() * w * 0.75);
    $(".g5").css("top", h * 0.15 + Math.random() * h * 0.65);
  }

  // 페이지가 열리면 바로 흩어지기 시작
  scatter();

  // setInterval : 정해진 시간마다 반복 실행 (5000 = 5초)
  // → 5초마다 새로운 곳으로 천천히 날아가서 계속 제멋대로 돌아다님
  setInterval(function () {
    if (merge_status == 0) {
      scatter();
    }
  }, 5000);

  // 마우스를 움직이면 : 뭉친 상태일 때만 따라옴
  $(".poster").on("mousemove", function (e) {
    if (merge_status == 1) {
      // 큰 빛 80px의 가운데가 마우스에 오게 -40
      $(".firefly-gather").css("left", e.pageX - 40);
      $(".firefly-gather").css("top", e.pageY - 40);
    }
  });

  // 클릭하면 : 하나로 뭉침 ↔ 다시 5개로 흩어짐
  $(".poster").on("click", function (e) {
    if (merge_status == 0) {
      // 하나로 뭉침 → 이제 마우스를 따라옴
      $(".poster").addClass("together");
      $(".firefly-gather").css("left", e.pageX - 40);
      $(".firefly-gather").css("top", e.pageY - 40);
      merge_status = 1;
    } else {
      // 5개로 나뉨 → 화면 곳곳으로 흩어져 다시 제각각 돌아다님
      $(".poster").removeClass("together"); // addClass의 반대
      scatter();
      merge_status = 0;
    }
  });

  // 마우스가 화면 밖으로 나가면 : 뭉쳐 있었다면 다시 흩어짐
  $(".poster").on("mouseleave", function () {
    if (merge_status == 1) {
      $(".poster").removeClass("together");
      scatter();
      merge_status = 0;
    }
  });
});
