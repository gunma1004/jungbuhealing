<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>중부건마힐링케어 로고 생성기</title>
</head>
<body style="background:#111; color:#fff; font-family: sans-serif; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh;">
  <h3>중부건마힐링케어 PNG 로고 생성</h3>
  <canvas id="logoCanvas" width="800" height="200" style="border:1px solid #333; background: transparent;"></canvas>
  <br>
  <button id="downloadBtn" style="padding:12px 24px; font-weight:bold; background:#00ff88; border:none; border-radius:8px; cursor:pointer;">
    logo.png 다운로드 받기
  </button>

  <script>
    const canvas = document.getElementById("logoCanvas");
    const ctx = canvas.getContext("2d");

    // 투명 배경 유지
    ctx.clearRect(0, 0, 800, 200);

    // 심볼 아이콘 배경 라운드 박스
    ctx.save();
    ctx.fillStyle = "#141024";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 3;
    roundRect(ctx, 40, 35, 130, 130, 30, true, true);

    // 심볼 그라데이션 (에메랄드 그린 -> 바이올렛)
    const grad = ctx.createLinearGradient(40, 35, 170, 165);
    grad.addColorStop(0, "#00ff88");
    grad.addColorStop(1, "#9d65ff");

    // 연꽃/휴식 심볼 드로잉
    ctx.beginPath();
    ctx.moveTo(105, 55);
    ctx.bezierCurveTo(70, 85, 65, 125, 105, 145);
    ctx.bezierCurveTo(145, 125, 140, 85, 105, 55);
    ctx.fillStyle = grad;
    ctx.fill();

    // 내부 심볼
    ctx.beginPath();
    ctx.moveTo(105, 80);
    ctx.bezierCurveTo(85, 100, 85, 125, 105, 138);
    ctx.bezierCurveTo(125, 125, 125, 100, 105, 80);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.restore();

    // 메인 로고 텍스트: 중부건마
    ctx.font = "900 52px -apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("중부건마", 200, 105);

    // 메인 로고 텍스트: 힐링케어 (포인트 컬러)
    ctx.fillStyle = "#00ff88";
    ctx.fillText("힐링케어", 395, 105);

    // 서브 슬로건 텍스트
    ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = "#a89dc7";
    ctx.fillText("CHUNGCHEONG & JEONBUK MASSAGE PORTAL", 205, 140);

    function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      if (fill) ctx.fill();
      if (stroke) ctx.stroke();
    }

    // 다운로드 트리거
    document.getElementById("downloadBtn").addEventListener("click", () => {
      const link = document.createElement("a");
      link.download = "logo.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  </script>
</body>
</html>