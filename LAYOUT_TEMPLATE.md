# NovaCalcs — 계산기 표준 레이아웃 가이드
> 마지막 업데이트: 2026-04-02  
> 모든 개별 계산기 페이지 업그레이드 시 이 문서를 기준으로 작성

---

## ✅ 표준 HTML 구조

```html
<nav class="nav">...</nav>
<header class="hdr">...</header>

<main class="main">          <!-- grid: 1fr 310px -->
  <div class="left-col">    <!-- 왼쪽: 계산기 + 시뮬레이터 -->

    <!-- ① 메인 계산기 카드 (탭 3개 이하만) -->
    <div class="card">
      <div class="tbar">
        <button class="tbtn on" data-tab="tab1">...</button>
        <button class="tbtn" data-tab="tab2">...</button>
      </div>
      <!-- 탭별 입력 + 결과값 (lres) -->
    </div>

    <!-- ② 시뮬레이터 카드 1 (항상 노출) -->
    <div class="card">
      <div class="card-h"><div class="card-ico">📊</div>시뮬레이터 이름
        <span class="nbadge" style="margin-left:6px">Simulasi Interaktif</span>
      </div>
      <div class="card-b">...</div>
    </div>

    <!-- ③ 시뮬레이터 카드 2 (항상 노출) -->
    <div class="card">...</div>

    <!-- ④ 참고 정보 / 비교 카드 (항상 노출) -->
    <div class="card">...</div>

  </div><!-- /left-col -->

  <!-- 오른쪽 사이드바 -->
  <div class="sb">
    <!-- 카드 1: 참조 데이터 (tarif, rate, etc.) -->
    <div class="card">...</div>

    <!-- 카드 2: 팁 / 전략 -->
    <div class="card">...</div>

    <!-- 카드 3: 추천 계산기 (사이드바 최하단 고정) -->
    <div class="card">
      <div class="card-h"><div class="card-ico">🔗</div>Kalkulator Terkait</div>
      <div class="card-b">
        <div class="relg">
          <a href="/id/SLUG" class="relc">
            <div class="relc-ico">EMOJI</div>
            <div class="relc-nm">이름</div>
            <div class="relc-ds">설명</div>
          </a>
          <!-- 4개 권장 -->
        </div>
      </div>
    </div>
  </div><!-- /sb -->
</main>

<!-- SEO 텍스트 (내부 링크 없음) -->
<div class="seo">
  <h2>제목</h2>
  <p>본문...</p>
  <h2>FAQ</h2>
  <div class="faq-i">...</div>
  <!-- ⛔ 여기에 Kalkulator Terkait 넣지 말 것 -->
</div>

<footer>...</footer>
```

---

## 🚫 금지 사항
- SEO 섹션(`<div class="seo">`) 안에 `Kalkulator Terkait` 또는 `class="relg"` 삽입 금지
- 내부 링크는 **사이드바 하단 1곳만** (`class="sb"` 마지막 카드)
- 탭은 **핵심 계산 기능만** — 시뮬레이터/비교는 탭이 아닌 별도 카드로

---

## ✅ 체크리스트 (계산기 업그레이드 시)

- [ ] 메인 계산기 탭 3개 이하 (핵심 기능만)
- [ ] 결과값 항상 노출 (기본값 pre-fill, 실시간 계산)
- [ ] 시뮬레이터 카드 최소 1개 (결과값 아래 항상 보임)
- [ ] 사이드바 하단에만 추천 계산기 4개
- [ ] SEO 섹션에 내부 링크 없음
- [ ] 내부 링크 `.html` 없는 clean URL
- [ ] `nbadge` ("Simulasi Interaktif") 시뮬레이터 카드에 표시
- [ ] 폰트: Plus Jakarta Sans + DM Mono (숫자)
- [ ] 컬러: --pri:#E85D04 오렌지 계열

---

## 📐 CSS 핵심 변수 (BBM 기준 — 변경 금지)

```css
:root {
  --pri:#E85D04; --pri-l:#FFF3EC; --pri-d:#C44E00;
  --bg:#F8F7F4;  --sur:#FFFFFF;  --sur2:#F3F1EE;
  --bor:#E4E1DC; --tx:#1A1714;   --tx2:#5C574F; --tx3:#9B948A;
  --grn:#1A7F4E; --grn-b:#EDFAF3;
  --red:#C0392B; --red-b:#FEF0EE;
  --r:14px; --rs:8px;
  --sh: 0 2px 12px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.04);
}
/* 레이아웃 */
.main { grid-template-columns: 1fr 310px; max-width: 880px; }
.left-col { display: flex; flex-direction: column; gap: 20px; }
.sb { display: flex; flex-direction: column; gap: 16px; }
/* 결과박스 */
.lres { background: var(--pri-l); border: 1.5px solid #ffd4b3; }
```

---

## 🗂 완료된 계산기

| 슬러그 | 탭 | 시뮬레이터 | 완료일 |
|---|---|---|---|
| kalkulator-bbm | 5 (BBM 기준) | Simulasi Hemat, Bandingkan, Konsumsi | 기준 파일 |
| kalkulator-listrik | 3 (Tagihan/Peralatan/Token) | ② Hemat AC, ③ Panel Surya ROI, ④ Bandingkan | 2026-04-02 |
| kalkulator-pph-freelance | 2 (PPh21/UMKM) | ② Bandingkan, ③ Proyeksi Kenaikan, ④ vs Karyawan | 2026-04-02 |

---

## 🔜 다음 업그레이드 대상

| 순서 | 슬러그 | GSC 노출 | 시뮬레이터 아이디어 |
|---|---|---|---|
| 4 | kalkulator-bpjs | 34회 | Hemat Iuran, Bandingkan Kelas, Proyeksi Manfaat |
| 5 | kalkulator-pph | — | TER vs Progresif, Proyeksi Gaji |
| 6 | kalkulator-gaji-bersih | — | Nego Gaji, Freelance vs Karyawan |
