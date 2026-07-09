# NEST DANCE 스튜디오 사이트

`preview.html`의 그린 댄스 스튜디오 디자인을 바탕으로 만든 NEST DANCE 다중 페이지 정적 사이트입니다.

## 파일 구성

- `index.html`: 홈 페이지
- `schedule.html`: 클래스 스케줄 페이지
- `reservation.html`: 예약 요청 목업 폼
- `links.html`: 스튜디오 주요 링크 허브
- `admin.html`: 하단 관리자 로그인 링크의 연결 페이지
- `assets/site.css`, `assets/site.js`: 공통 스타일과 동작
- `design.md`: 디자인 및 인터랙션 기준
- `security.md`: 정적 사이트 운영 시 보안 메모

## 로컬 미리보기

별도 빌드 과정 없이 정적 호스팅으로 배포할 수 있습니다. 로컬에서 확인하려면:

```bash
python3 -m http.server 4173
```

브라우저에서 아래 주소를 엽니다.

```text
http://127.0.0.1:4173/
```

## 운영 메모

예약 폼은 현재 프런트엔드 목업이며 제출 완료 메시지만 표시합니다. 실제 문의를 받기 전 Google Form, 카카오 채널, 예약 시스템 또는 별도 백엔드와 연결하세요.

## 주의

개인 인증 정보나 고객 데이터 내보내기 파일은 커밋하지 마세요. 공개 범위를 넓히기 전 `security.md`를 확인하세요.
