# 커스터마이징 가이드

설문 내용·디자인·기능을 본인 환경에 맞게 수정하는 방법을 안내합니다.

---

## 1. 설문 항목 수정

### 직능구분 옵션 추가/삭제

`index.html`에서 다음 부분을 찾아 수정합니다.

```html
<select name="category" required>
  <option value="">선택해 주세요</option>
  <option value="외국인주민센터">외국인주민센터</option>
  <option value="1인가구지원센터">1인가구지원센터</option>
  <!-- 옵션을 추가하려면 아래 형식으로 한 줄씩 -->
  <option value="새로운직능">새로운직능</option>
</select>
```

### 새로운 입력 항목 추가

`.form-section` 내부 적절한 위치에 다음 패턴으로 추가합니다.

```html
<div class="field">
  <label class="field-label">
    항목명 <span class="required">*</span>
    <span class="helper">도움말 텍스트 (선택)</span>
  </label>
  <input type="text" name="필드명" placeholder="입력 예시" required>
  <div class="error-msg">에러 메시지</div>
</div>
```

항목을 추가했다면 다음 2곳도 함께 수정해야 합니다.

**① `index.html`의 submit 함수 안 `data` 객체**

```javascript
const data = {
  // ...기존 필드
  새필드명: document.querySelector('[name="새필드명"]').value,
};
```

**② `apps-script/Code.gs`의 헤더와 `appendRow`**

```javascript
// 헤더
const headers = [
  // ...기존 헤더
  '새 항목명'
];

// appendRow
sheet.appendRow([
  // ...기존 값
  data.새필드명 || ''
]);
```

---

## 2. 디자인 수정

### 컬러 변경

`index.html`의 `<style>` 안 `:root` 변수를 수정하면 전체 색상이 한 번에 바뀝니다.

```css
:root {
  --teal: #2BA7A8;        /* 메인 청록 */
  --teal-deep: #1F8485;   /* 진한 청록 (호버) */
  --teal-soft: #E8F4F4;   /* 연한 청록 (배경) */
  --lime: #A3CC3D;        /* 라임 그린 (액센트) */
  --lime-soft: #F1F7DF;   /* 연한 라임 (배경) */
  --ink: #1A1F2C;         /* 본문 텍스트 */
  --paper: #FAFAF7;       /* 페이지 배경 */
  /* ... */
}
```

### 폰트 변경

`<head>`의 `<link>` 태그와 `body { font-family: ... }`를 함께 수정합니다.

### 로고 교체

`assets/logo.png`를 동일한 파일명으로 교체하면 됩니다. 권장 사양: PNG, 가로 200px 내외, 투명 배경.

---

## 3. 설문 제목·안내 문구 수정

`index.html`의 다음 영역을 수정합니다.

```html
<!-- 페이지 상단 큰 제목 -->
<h1>
  서울시 <span class="accent">조례시설의 현황과 과제</span>를<br>
  현장의 목소리로 정리합니다
</h1>

<!-- 설문 설명 -->
<p class="hero-desc">
  본 설문은 ... 활용됩니다.
</p>
```

---

## 4. 단계(섹션) 추가·삭제

기본은 4단계입니다. 단계를 늘리려면 다음 4곳을 함께 수정해야 합니다.

1. **진행 바**: `.progress-track`의 `.progress-step` 개수
2. **레이블**: `.progress-labels`의 `.progress-label` 개수
3. **섹션 본체**: `.form-section[data-section="N"]` 추가
4. **JS**: `const totalSections = 4;` 값 변경

---

## 5. 자동 저장 비활성화

`index.html` 스크립트 영역에서 다음 부분을 주석 처리합니다.

```javascript
// document.querySelectorAll('input, select, textarea').forEach(el => {
//   el.addEventListener('input', () => {
//     clearTimeout(debounceTimer);
//     debounceTimer = setTimeout(saveData, 600);
//   });
//   ...
// });

// loadData();
```

상단의 "자동 저장 중" 표시도 함께 숨기려면 `.save-status`를 `display: none`으로.

---

## 6. 파일명 규칙 변경

`apps-script/Code.gs`의 `saveFileToDrive` 함수에서 파일명 조합 부분을 수정합니다.

```javascript
// 기본: 소속명_업로드날짜_원본파일명
const newFileName = `${safeOrgName}_${uploadDate}_${safeOriginalName}`;

// 예시 1: 직능구분_소속명_날짜_원본파일명
const newFileName = `${data.category}_${safeOrgName}_${uploadDate}_${safeOriginalName}`;

// 예시 2: 날짜_소속명만 (원본 파일명 제거)
const ext = safeOriginalName.split('.').pop();
const newFileName = `${uploadDate}_${safeOrgName}.${ext}`;
```

> 참고: 함수 인자도 함께 받아야 하므로, 위에서 `data.category`를 쓰려면 함수 시그니처도 수정해야 합니다.

---

## 7. 응답 후 안내 메시지 수정

`index.html`의 `<section class="complete-screen">` 부분을 수정합니다.

```html
<h2>응답이 제출되었습니다</h2>
<p>
  소중한 의견을 보내주셔서 감사합니다.<br>
  ... 원하는 안내 메시지 ...
</p>
```

---

문의 · 서울특별시사회복지사협회
