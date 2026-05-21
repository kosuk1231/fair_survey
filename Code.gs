/**
 * 서울시 조례시설 처우개선 설문 - Google Apps Script
 * ============================================
 * 응답을 지정된 Google 스프레드시트에 저장하고,
 * 첨부파일은 지정된 Google Drive 폴더에 저장합니다.
 *
 * 설치 방법은 docs/SETUP.md 참조
 */

// ============================================
//  ⚠️ 설정 - 본인 환경에 맞게 수정하세요
// ============================================

// Google 스프레드시트 ID
// https://docs.google.com/spreadsheets/d/{여기가 ID}/edit
const SHEET_ID = '1CQFkTK5sop4cHVjXZHTQdugaRekwo-6S-L4Mj7lUK7A';

// 응답이 저장될 시트명 (자동 생성됨)
const SHEET_NAME = '응답';

// 첨부파일을 저장할 Google Drive 폴더 ID
// https://drive.google.com/drive/folders/{여기가 ID}
const ATTACHMENT_FOLDER_ID = '1by9muMIdPsC1J-N3doIXM4MZoZVT1S3g';


// ============================================
//  웹앱 진입점
// ============================================

/**
 * POST 요청 처리 - 설문 응답 수신
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    // 시트가 없으면 생성하고 헤더 추가
    if (!sheet) {
      sheet = createSheetWithHeaders(ss);
    }

    // 파일이 있으면 Drive에 저장 후 링크 반환
    let fileLink = '';
    if (data.fileData && data.fileName) {
      fileLink = saveFileToDrive(
        data.fileData,
        data.fileName,
        data.fileMimeType,
        data.org
      );
    }

    // 한국 시간으로 변환
    const timestamp = Utilities.formatDate(
      new Date(data.timestamp),
      'Asia/Seoul',
      'yyyy-MM-dd HH:mm:ss'
    );

    // 데이터 행 추가
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.org || '',
      data.phone || '',
      data.category || '',
      data.facilityCount || '',
      data.workerCount || '',
      data.department || '',
      data.entrustmentType || '',
      data.entrustmentPeriod || '',
      data.basisClause || '',
      data.basisUrl || '',
      fileLink,
      data.changeRequest || '',
      data.task1_need || '',
      data.task1_current || '',
      data.task1_solution || '',
      data.task2_need || '',
      data.task2_current || '',
      data.task2_solution || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error('doPost 오류:', err);
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET 요청 처리 (배포 테스트용)
 */
function doGet(e) {
  return ContentService
    .createTextOutput('서울시 조례시설 설문 수집 API가 정상 동작 중입니다.')
    .setMimeType(ContentService.MimeType.TEXT);
}


// ============================================
//  내부 함수
// ============================================

/**
 * 응답 시트 생성 및 헤더 행 추가
 */
function createSheetWithHeaders(spreadsheet) {
  const sheet = spreadsheet.insertSheet(SHEET_NAME);

  const headers = [
    '제출일시', '성함', '소속', '핸드폰',
    '직능구분', '시설수', '종사자수', '소관부서',
    '위탁형태', '위탁기간',
    '설치근거 조항명', '설치근거 링크', '설치근거 파일',
    '변경 요청 사항',
    '과제1-필요성', '과제1-현황및문제점', '과제1-정책대안',
    '과제2-필요성', '과제2-현황및문제점', '과제2-정책대안'
  ];

  sheet.appendRow(headers);

  // 헤더 스타일링
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#2BA7A8');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  headerRange.setVerticalAlignment('middle');

  // 행 높이 및 첫 행 고정
  sheet.setRowHeight(1, 36);
  sheet.setFrozenRows(1);

  // 컬럼 너비 조정
  sheet.setColumnWidth(1, 140);  // 제출일시
  sheet.setColumnWidth(2, 80);   // 성함
  sheet.setColumnWidth(3, 180);  // 소속
  sheet.setColumnWidth(4, 120);  // 핸드폰
  sheet.setColumnWidth(5, 160);  // 직능구분

  return sheet;
}

/**
 * 첨부파일을 지정된 Drive 폴더에 저장
 *
 * 파일명 규칙: {소속명}_{YYYY-MM-DD}_{원본파일명}
 * 예: 서울시북부장애인종합복지관_2026-05-21_조례안.pdf
 */
function saveFileToDrive(base64Data, originalFileName, mimeType, orgName) {
  try {
    // 지정된 폴더 가져오기
    const folder = DriveApp.getFolderById(ATTACHMENT_FOLDER_ID);

    // 파일명 생성: 소속명_업로드날짜_원본파일명
    const safeOrgName = sanitizeFileName(orgName || '미입력');
    const uploadDate = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd');
    const safeOriginalName = sanitizeFileName(originalFileName);
    const newFileName = `${safeOrgName}_${uploadDate}_${safeOriginalName}`;

    // Base64 디코딩 후 Blob 생성
    const decoded = Utilities.base64Decode(base64Data);
    const blob = Utilities.newBlob(
      decoded,
      mimeType || 'application/octet-stream',
      newFileName
    );

    // 파일 저장
    const file = folder.createFile(blob);

    // 누구나 링크로 보기 가능 (필요시 권한 조정)
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return file.getUrl();

  } catch (e) {
    console.error('파일 저장 오류:', e);
    return '[파일 저장 실패: ' + e.toString() + ']';
  }
}

/**
 * 파일명으로 사용할 수 없는 문자 제거
 * Windows/Mac/Linux에서 모두 안전한 파일명으로 변환
 */
function sanitizeFileName(name) {
  if (!name) return '미입력';

  return name
    .replace(/[\\\/\:\*\?\"\<\>\|]/g, '')  // 파일명 금지 문자
    .replace(/\s+/g, '')                    // 공백 제거
    .replace(/_{2,}/g, '_')                 // 연속 언더스코어 정리
    .trim();
}


// ============================================
//  유틸리티 함수 (수동 실행용)
// ============================================

/**
 * 설정값 검증 - Apps Script 편집기에서 수동으로 실행해 보세요
 */
function testConfiguration() {
  try {
    // 시트 접근 테스트
    const ss = SpreadsheetApp.openById(SHEET_ID);
    console.log('✅ 스프레드시트 접근 성공:', ss.getName());

    // 폴더 접근 테스트
    const folder = DriveApp.getFolderById(ATTACHMENT_FOLDER_ID);
    console.log('✅ Drive 폴더 접근 성공:', folder.getName());

    console.log('🎉 모든 설정이 정상입니다.');
  } catch (e) {
    console.error('❌ 설정 오류:', e.toString());
  }
}
