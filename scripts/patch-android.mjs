// 앱 프로젝트(android/)를 만든 직후, 우리 게임에 맞게 필요한 설정만 덧붙이는 스크립트예요.
// 하는 일:
//   1) 화면을 세로로 고정 (게임이 세로 화면용이라서)
//   2) 앱 아이콘 + 시작 화면(스플래시) 그림을 우리 게임 것으로 교체 (resources/android-res 폴더의 내용을 그대로 덮어써요)
//   3) 안드로이드 12 이상 시작 화면의 배경색·아이콘 지정
import { readFileSync, writeFileSync, cpSync, existsSync } from 'node:fs';

// 1) 세로 고정
const manifestFile = 'android/app/src/main/AndroidManifest.xml';
let xml = readFileSync(manifestFile, 'utf8');
if (!xml.includes('android:screenOrientation')) {
  xml = xml.replace('android:name=".MainActivity"', 'android:name=".MainActivity"\n            android:screenOrientation="portrait"');
  writeFileSync(manifestFile, xml);
  console.log('세로 고정 설정을 추가했어요');
} else {
  console.log('이미 세로 고정 설정이 있어요');
}

// 2) 아이콘·스플래시 그림 덮어쓰기
const resSrc = 'resources/android-res';
if (existsSync(resSrc)) {
  cpSync(resSrc, 'android/app/src/main/res', { recursive: true, force: true });
  console.log('앱 아이콘과 시작 화면 그림을 교체했어요');
} else {
  console.log('resources/android-res 폴더가 없어서 아이콘 교체는 건너뛰었어요');
}

// 3) 안드로이드 12+ 시작 화면 (배경색 + 얼굴 아이콘)
const stylesFile = 'android/app/src/main/res/values/styles.xml';
let styles = readFileSync(stylesFile, 'utf8');
if (!styles.includes('windowSplashScreenBackground')) {
  const re = /(<style name="AppTheme\.NoActionBarLaunch"[^>]*>)([\s\S]*?)(<\/style>)/;
  if (re.test(styles)) {
    styles = styles.replace(re, (m, open, body, close) =>
      `${open}${body}    <item name="windowSplashScreenBackground">#120821</item>\n        <item name="windowSplashScreenAnimatedIcon">@drawable/splash_icon</item>\n    ${close}`);
    writeFileSync(stylesFile, styles);
    console.log('시작 화면 배경색과 아이콘을 지정했어요');
  } else {
    console.log('주의: NoActionBarLaunch 스타일을 찾지 못해서 시작 화면 설정을 건너뛰었어요');
  }
} else {
  console.log('이미 시작 화면 설정이 있어요');
}
