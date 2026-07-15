import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<1500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get(`${__ENV.BASE_URL}/customer/home`);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'page rendered': (r) => r.body.includes('Flexmot'),
  });
  sleep(1);
}
