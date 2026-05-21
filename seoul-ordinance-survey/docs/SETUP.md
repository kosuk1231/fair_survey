# 설치 및 배포 가이드

본 리포지토리는 **이미 운영용 설정이 완료된 상태**입니다. 정적 호스팅 서비스에 그대로 배포하시면 됩니다.

이 문서는:
- 처음 배포하시는 분
- Apps Script 코드를 수정하셨을 때 재배포 방법
- 다른 사업에 재사용하실 때 새로 설정하는 방법

을 안내합니다.

---

## 🔵 이미 완료된 설정

| 항목 | 값 |
|---|---|
| 응답 저장 시트 ID | `1CQFkTK5sop4cHVjXZHTQdugaRekwo-6S-L4Mj7lUK7A` |
| 첨부파일 저장 폴더 ID | `1by9muMIdPsC1J-N3doIXM4MZoZVT1S3g` |
| Apps Script 웹앱 URL | `https://script.google.com/macros/s/AKfycbxiy4Tj17d.../exec` |

---

## ⚠️ 첫 배포 전 반드시 확인 — Apps Script 코드 동기화

리포지토리의 `apps-script/Code.gs`에는 **설치근거 조항명** 컬럼이 포함된 최신 버전이 들어있습니다.

만약 Apps Script 편집기에 붙여넣은 코드가 이전 버전이라면 **재배포가 필요**합니다.

### 코드 재동기화 방법

1. 스프레드시트 → **확장 프로그램 → Apps Script** 열기
2. 기존 코드 전체 삭제 후 `apps-script/Code.gs`의 최신 코드 붙여넣기
3. **Ctrl + S** 저장
4. 우측 상단 **배포 → 배포 관리** 클릭
5. 기존 배포 항목 우측의 ✏️ **편집** 아이콘 클릭
6. **버전** 드롭다운 → **새 버전** 선택
7. **배포** 버튼 클릭
8. URL은 그대로 유지됨 (config.js 수정 불필요)

✅ 재배포 확인: 브라우저에서 웹앱 URL 직접 접속 시 정상 메시지가 보여야 함

---

## 🚀 호스팅 배포

### Vercel (권장)

```bash
# 리포지토리 클론
git clone https://github.com/{사용자명}/{리포지토리명}.git
cd {리포지토리명}

# git push 이후 자동 배포되거나, Vercel CLI 사용:
npx vercel
```

또는 [vercel.com](https://vercel.com) → New Project → GitHub 연동 → Deploy

### Netlify

```bash
# Netlify CLI
npx netlify-cli deploy --prod
```

또는 [netlify.com/drop](https://app.netlify.com/drop)에 폴더 드래그&드롭

### GitHub Pages

1. GitHub 리포지토리 **Settings → Pages**
2. **Source**: `Deploy from a branch` → `main` / `(root)`
3. 약 1분 대기 → `https://{username}.github.io/{repo}/` 로 접근

---

## ✅ 배포 후 동작 확인

1. 배포된 URL 접속
2. **F12 → Console** 탭 확인 → `✅ 설정 로드 완료. SUBMIT_URL: ...` 메시지 확인
3. 테스트 응답 1건 제출 (실제 본인 정보 또는 테스트 값)
4. 작은 파일 1개 첨부
5. 스프레드시트에 **`응답`** 시트가 생성되고 데이터 입력 확인
6. Drive 폴더에 `소속명_2026-05-21_파일명.pdf` 형식으로 저장 확인

---

## 🔧 새 사업·새 시트로 재구성 시

다른 사업에 이 시스템을 재활용하실 경우:

### 1. 새 스프레드시트 생성
   - 시트 URL: `https://docs.google.com/spreadsheets/d/{새 ID}/edit`
   - **새 ID** 복사

### 2. 새 Drive 폴더 생성
   - 폴더 URL: `https://drive.google.com/drive/folders/{새 ID}`
   - **새 ID** 복사

### 3. Apps Script 코드 수정
   - `apps-script/Code.gs` 상단의 `SHEET_ID`, `ATTACHMENT_FOLDER_ID` 값 교체
   - 새 스프레드시트 → 확장 프로그램 → Apps Script에 붙여넣기
   - 새로 **웹 앱으로 배포** → 새 URL 발급

### 4. config.js 업데이트
   ```javascript
   window.SURVEY_CONFIG = {
     SHEET_ID: '새 시트 ID',
     SUBMIT_URL: '새 Apps Script URL',
   };
   ```

### 5. 호스팅 환경 재배포

---

## 🆘 자주 발생하는 문제

### ❓ 응답이 시트에 안 들어가요

| 증상 | 원인 | 해결 |
|---|---|---|
| 콘솔에 `❌ config.js를 찾을 수 없습니다` | config.js 파일 누락 | 호스팅 환경에 config.js 업로드 필요 |
| 콘솔에 `❌ SUBMIT_URL이 설정되지 않았습니다` | URL 미입력 | config.js 열어서 URL 입력 |
| 콘솔에 정상 메시지인데도 안 들어감 | Apps Script 권한 문제 | 배포 시 "모든 사용자" 액세스 확인 |
| 콘솔에 정상 메시지인데도 안 들어감 | Apps Script 재배포 필요 | "새 버전"으로 재배포 |
| 응답은 들어가는데 조항명 컬럼이 빈칸 | Apps Script가 구 버전 | 최신 코드 붙여넣고 재배포 |

### ❓ 첨부파일이 Drive에 안 올라가요

- `ATTACHMENT_FOLDER_ID`가 본인 계정으로 접근 가능한 폴더인지 확인
- 폴더가 휴지통에 있거나 삭제되지 않았는지 확인
- Apps Script 편집기에서 `testConfiguration` 함수 실행 → 폴더 접근 확인

### ❓ "권한이 거부되었습니다" 에러

- Apps Script 권한 승인이 누락되었을 가능성
- 편집기에서 아무 함수나 한 번 **실행**해서 권한 동의 절차를 끝까지 진행

---

문의 · 서울특별시사회복지사협회 공정위원회
