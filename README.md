# NEST DANCE 스튜디오 사이트

NEST DANCE 정적 웹사이트입니다. 홈, 스케줄, 링크 허브, 관리자 분석 화면으로 구성되어 있으며 별도 프런트엔드 빌드 과정 없이 정적 호스팅으로 배포합니다.

## 현재 구성

- `index.html`: 홈 페이지. 카카오 문의, 스케줄 이동, 주요 신청 링크, 스튜디오 이미지, YouTube 영상 갤러리를 포함합니다.
- `schedule.html`: 클래스 시간표 페이지. 오전반, 저녁반, 개인 레슨과 클래스 유형 필터를 제공합니다.
- `links.html`: 스튜디오 주요 링크 허브입니다.
- `admin.html`: 직접 URL로 접근하는 관리자 분석 화면입니다. 공개 내비게이션에는 노출하지 않습니다.
- `assets/site.css`: 전체 페이지 공통 디자인, 반응형 레이아웃, 카드/시간표/영상 스타일입니다.
- `assets/site.js`: 스케줄 필터 동작입니다.
- `assets/*.jpg`, `assets/timetable.png`: 사이트 이미지 자산입니다.
- `netlify.toml`: Netlify 배포 설정입니다.
- `netlify/edge-functions/admin-basic-auth.ts`: `/admin.html`을 브라우저 기본 인증으로 보호하는 Netlify Edge Function입니다.
- `design.md`: 디자인 및 인터랙션 기준입니다.
- `security.md`: 정적 사이트 운영 시 보안 메모입니다.

## 로컬 미리보기

정적 파일만 확인하려면 로컬 서버를 실행합니다.

```bash
python -m http.server 4173
```

브라우저에서 아래 주소를 엽니다.

```text
http://127.0.0.1:4173/
```

주의: 위 방식은 Netlify Edge Function을 실행하지 않으므로 `/admin.html` 기본 인증은 적용되지 않습니다. 인증 흐름까지 확인하려면 Netlify 환경에서 실행하거나 배포 후 확인하세요.

## 배포 설정

Netlify에서 루트 디렉터리 `.`를 그대로 publish 합니다.

관리자 페이지 보호를 위해 Netlify 환경 변수에 아래 값을 설정해야 합니다.

```text
ADMIN_BASIC_USER
ADMIN_BASIC_PASSWORD
```

실제 아이디와 비밀번호 값은 저장소, HTML, CSS, JavaScript 파일에 넣지 않습니다.

## 운영 메모

- Firebase 관련 설정과 클라이언트 코드는 사용하지 않습니다.
- `/admin.html`은 내비게이션에서 숨겨져 있으며, Netlify Edge Function이 브라우저 기본 인증 창을 띄웁니다.
- `netlify.toml`은 `/admin.html`을 `no-store`로, `/`와 `/index.html`을 `no-cache`로 설정합니다.
- 고객 정보, 인증 정보, 데이터 내보내기 파일은 커밋하지 마세요.
- 공개 범위를 넓히기 전 `security.md`를 확인하세요.
