/**
 * 서울시 조례시설 처우개선 설문 - 환경 설정
 * ============================================
 *
 * 📌 사용 방법
 *   1. 이 파일을 같은 위치에 'config.js'로 복사하세요
 *   2. 아래 두 값을 본인 환경에 맞게 수정하세요
 *   3. config.js는 .gitignore에 포함되어 있어 GitHub에 올라가지 않습니다
 */

window.SURVEY_CONFIG = {

  // Google 스프레드시트 ID
  // https://docs.google.com/spreadsheets/d/{여기가 시트 ID}/edit
  SHEET_ID: '여기에_스프레드시트_ID_입력',

  // Google Apps Script 웹앱 URL
  // 배포 후 받은 https://script.google.com/macros/s/.../exec 형태의 URL
  SUBMIT_URL: '여기에_Apps_Script_웹앱_URL_입력',

};
