// 앱 프로젝트(android/)를 만든 직후, 우리 게임에 맞게 필요한 설정만 덧붙이는 스크립트예요.
// 지금 하는 일: 화면을 세로로 고정 (게임이 세로 화면용이라서)
import { readFileSync, writeFileSync } from 'node:fs';

const file = 'android/app/src/main/AndroidManifest.xml';
let xml = readFileSync(file, 'utf8');

if (!xml.includes('android:screenOrientation')) {
  xml = xml.replace('android:name=".MainActivity"', 'android:name=".MainActivity"\n            android:screenOrientation="portrait"');
  writeFileSync(file, xml);
  console.log('세로 고정 설정을 추가했어요');
} else {
  console.log('이미 세로 고정 설정이 있어요');
}
