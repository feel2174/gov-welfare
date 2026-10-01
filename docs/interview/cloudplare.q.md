# 인터뷰 질문지: CloudPlare 대표 글 보강용

답변 파일: `docs/interview/cloudplare.a.md`

**답하는 법**
- 문장으로 안 써도 됩니다. 메모, 파편, 오타 섞인 채가 오히려 낫습니다.
- 기억 안 나는 건 **"기억 안 남"** 이라고만 쓰세요. 그 항목은 버리고 추측으로 메우지 않습니다.
- 명령 출력이나 캡처가 있으면 그대로 붙여넣어 주세요. 수치(걸린 시간, 횟수, 용량)가 있으면 가장 좋습니다.
- 건너뛰어도 됩니다. 답이 있는 글부터 보강합니다.

이 질문의 답이 없으면 해당 글은 보강하지 않고 `noindex`로 돌리거나 다른 글에 합칩니다.

---

## A. DNS 이전 (dns-records-before-deploy)

1. 도메인이나 네임서버를 실제로 옮긴 적이 있습니까? 어떤 도메인을 어디에서 어디로 옮겼습니까? (cloudplare.com, pixelzipkit.com, frontendnote.com 중 해당되는 것)
2. 옮기기 전에 레코드를 백업했습니까? 빠뜨려서 문제가 된 레코드가 있었습니까? (MX, TXT, 서브도메인 등)
3. TTL을 미리 낮췄습니까? 전환 후 새 값이 보이기까지 실제로 얼마나 걸렸습니까?
4. 되돌려야 했던 적이 있습니까? 그때 무엇을 보고 알았습니까?

## B. HTTP 캐시, CDN (http-cache-control-field-notes, cdn-cache-mistakes-small-sites)

5. 배포했는데 예전 화면이 계속 보였던 적이 있습니까? 어느 사이트였고, 원인은 무엇이었습니까?
6. 그때 `curl -I`나 개발자 도구에서 본 헤더가 기억나면 붙여 주세요. (cache-control, age, x-vercel-cache 등)
7. 해결에 걸린 시간과 마지막으로 바꾼 설정은 무엇이었습니까?

## C. 환경변수, 배포 (deploy-environment-variables-checklist, nextjs-deploy-notes-for-small-sites)

8. 환경변수 때문에 배포가 깨졌거나 빌드 값이 안 들어갔던 적이 있습니까? 어떤 변수였습니까?
9. Vercel에서 프로덕션만 다르게 동작했던 경험이 있습니까? 원인은 무엇이었습니까?
10. 이 사이트(cloudplare.com) 배포 중에 실제로 겪은 문제가 있습니까? 예: 빌드 실패, 광고 스크립트, 헤더

## D. 보안 헤더 (http-security-headers-starter)

11. CSP를 실제로 적용해 본 적이 있습니까? 이 사이트는 Report-Only로 두었는데, 왜 enforce로 안 바꿨습니까?
12. 헤더를 넣고 나서 깨진 것(광고, 폰트, 분석 스크립트 등)이 있었습니까? 어떻게 알았습니까?

## E. 장애, 롤백 (small-site-incident-log, zero-downtime-deployment-rollback-strategy)

13. 지금까지 운영한 사이트들에서 가장 크게 겪은 장애는 무엇입니까? 언제, 얼마나 지속됐고, 어떻게 발견했습니까?
14. 배포를 되돌린 경험이 있습니까? Vercel에서 이전 배포로 되돌렸다면 그때 걸린 시간은 얼마였습니까?

## F. SSL, 도메인 (ssl-tls-auto-renewal-failure-cases, https-redirects-domain-canonical)

15. 인증서 문제나 http, www 리다이렉트 문제를 겪은 적이 있습니까? 브라우저에서 어떤 화면이 떴습니까?
16. www와 non-www, canonical을 정하다가 헤맨 사이트가 있습니까? (frontendnote는 www를 쓰는 것으로 보입니다)

## G. Core Web Vitals, 이미지

17. PageSpeed나 Lighthouse를 실제로 돌려 본 사이트와 점수가 있습니까? 고친 뒤 점수가 어떻게 바뀌었습니까? 수치가 있으면 전후로 적어 주세요.
18. 이미지를 줄였을 때 체감 차이를 본 적이 있습니까? (pixelzipkit 벤치마크 외의 실제 사이트 사례)

## H. 사이트 자체

19. 이 도메인을 복지 정보 사이트에서 운영 노트로 바꾼 이유는 무엇이었습니까?
20. 앞으로 이 사이트를 몇 달간 어떻게 운영할 계획입니까? (주 몇 편, 어떤 주제)
