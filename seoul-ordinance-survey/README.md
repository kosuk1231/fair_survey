# 서울시 조례시설 처우개선 설문조사

서울특별시사회복지사협회 공정위원회에서 진행하는 조례시설 현황 조사 및 처우개선 과제 발굴 설문 웹페이지입니다.

응답자 부담을 줄이는 **4단계 분할 설문**, **자동 저장**, **첨부파일 업로드**, **Google 스프레드시트 자동 수집**을 지원합니다.

---

## 🌐 운영 정보

| 항목 | 내용 |
|---|---|
| **주관** | 서울특별시사회복지사협회 공정위원회 |
| **응답 저장 시트** | `1CQFkTK5sop4cHVjXZHTQdugaRekwo-6S-L4Mj7lUK7A` |
| **첨부파일 저장 폴더** | `1by9muMIdPsC1J-N3doIXM4MZoZVT1S3g` |
| **Apps Script 배포 URL** | `https://script.google.com/macros/s/AKfycbxiy4Tj17d.../exec` |

✅ 본 리포지토리는 **즉시 배포 가능**한 상태입니다. clone 후 정적 호스팅 서비스(Vercel/Netlify/GitHub Pages)에 그대로 올리시면 바로 동작합니다.

---

## ✨ 주요 기능

- **4단계 분할 설문** — 응답자 정보 / 시설 현황 / 설치근거 / 처우개선 과제
- **자동 저장** — 작성 중 창을 닫아도 다음 접속 시 이어쓰기 (브라우저 localStorage)
- **링크 또는 파일 첨부** — 설치근거를 URL이나 파일(PDF·HWP·HWPX·DOCX) 어느 쪽으로든 제출 가능
- **드래그 앤 드롭 파일 업로드**
- **반응형 디자인** — 모바일·태블릿·데스크톱 모두 자연스럽게 표시
- **자동 파일명 정리** — 첨부파일이 `소속명_업로드날짜_원본파일명` 형식으로 Drive에 저장
- **Google Apps Script 백엔드** — 별도 서버 없이 스프레드시트에 자동 저장

---

## 📁 폴더 구조

```
.
├── index.html                # 설문 페이지 본체
├── config.js                 # 운영 설정 (실제 SHEET_ID, SUBMIT_URL 입력 완료)
├── config.example.js         # 설정 템플릿 (재사용 시 참고)
├── vercel.json               # Vercel 배포 설정
├── assets/
│   ├── logo.png              # 원본 협회 로고
│   └── logo-symbol.png       # 추출한 심볼 로고
├── apps-script/
│   └── Code.gs               # Google Apps Script 백엔드 코드
├── docs/
│   ├── SETUP.md              # 재배포·재설정 가이드
│   └── CUSTOMIZATION.md      # 디자인·항목 커스터마이징 가이드
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 배포 방법

### 옵션 A · Vercel (권장)

1. [vercel.com](https://vercel.com)에서 GitHub 연동 로그인
2. **Add New → Project** → 본 리포지토리 선택
3. **Deploy** 클릭 (별도 설정 없음)
4. 약 1분 내 자동 배포 → 도메인 발급

### 옵션 B · Netlify

1. [netlify.com/drop](https://app.netlify.com/drop)
2. 폴더 전체 드래그 앤 드롭
3. 자동 배포

### 옵션 C · GitHub Pages

1. 리포지토리 **Settings → Pages**
2. **Source**: `Deploy from a branch` → `main` / `(root)`
3. 저장 후 약 1분 대기, `https://{username}.github.io/{repo}/` 로 접근

### 옵션 D · 로컬 테스트

```bash
cd 폴더경로
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

---

## 📊 수집 항목

| 섹션 | 항목 |
|---|---|
| **응답자 정보** | 성함, 소속, 핸드폰 번호, 직능구분 |
| **시설 현황** | 시설 수, 종사자 수, 소관부서, 위탁형태, 위탁기간 |
| **설치근거 검토** | 설치근거 조항명, 링크/파일, 변경 요청 사항 |
| **처우개선 과제** | 과제 1·2 각각 (필요성 / 현황 및 문제점 / 정책대안) |

### 직능구분 옵션

외국인주민센터 · 1인가구지원센터 · 발달장애인평생교육센터 · 50플러스센터 · 시립실버케어센터 · 교육복지센터 · 주거복지센터 · 뇌병변장애인 비전센터 · 장애인권익옹호기관 · 전 조례시설 · 장애인지원주택 · 장애인가족지원센터 · 기타

---

## 📎 첨부파일 저장 규칙

설치근거 첨부파일은 지정된 Google Drive 폴더에 다음 형식으로 저장됩니다.

```
{소속명}_{YYYY-MM-DD}_{원본파일명}

예시:
서울시북부장애인종합복지관_2026-05-21_조례안.pdf
1인가구지원센터_2026-05-21_운영규정.hwpx
```

공백·특수문자는 자동으로 제거되어 OS 호환 가능한 파일명으로 정리됩니다.

---

## 🛠 기술 스택

- **프론트엔드**: HTML + CSS + Vanilla JavaScript (프레임워크 의존성 없음)
- **백엔드**: Google Apps Script
- **데이터 저장**: Google Sheets + Google Drive (첨부파일)
- **호스팅**: 정적 호스팅 (Vercel, Netlify, GitHub Pages 등 모두 가능)

---

## 🔐 개인정보 처리

- 핸드폰 번호 등 개인정보가 수집되므로, 협회 개인정보 처리방침에 따라 운영합니다.
- 첨부파일은 Drive의 지정 폴더에 저장되며, 시트에는 공유 링크만 기록됩니다.
- 응답자의 임시 작성 데이터는 응답자 본인의 브라우저 localStorage에만 저장되며 제출 완료 시 자동 삭제됩니다.
- `config.js`에 운영 URL이 포함되어 있으므로 가능하면 **private repository**로 운영하시기를 권장합니다.

---

## 📝 라이선스

서울특별시사회복지사협회 공정위원회 운영 자산. 상세 내용은 [LICENSE](LICENSE) 참조.

---

문의 · 서울특별시사회복지사협회 공정위원회
