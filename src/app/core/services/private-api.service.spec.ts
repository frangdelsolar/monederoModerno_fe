import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PrivateApiService } from './private-api.service';

describe('PrivateApiService', () => {
  let service: PrivateApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PrivateApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //   it('should set the Authorization header with the access token from localStorage', () => {
  //     const accessToken = 'test-access-token';
  //     localStorage.setItem('access', accessToken);

  //     expect(service['_headers']).toBeTruthy();
  //     expect(service['_headers'].get('Authorization')).toBe(
  //       `Bearer ${accessToken}`
  //     );
  //   });

  it('should not set the Authorization header if the access token is not available in localStorage', () => {
    localStorage.removeItem('access');

    expect(service['_headers']).toBeFalsy();
  });

  it('should send a GET request with the provided URL', () => {
    const mockResponse = { id: 1, name: 'Test' };
    const url = 'https://example.com/api/data/';

    service.get(url, 1).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(url + '1/');
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should send a POST request with the provided URL and body', () => {
    const mockResponse = { id: 1, name: 'Test' };
    const url = 'https://example.com/api/data';
    const body = { name: 'Test' };

    service.post(url, body).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(body);
    req.flush(mockResponse);
  });

  it('should send a PUT request with the provided URL and body', () => {
    const mockResponse = { id: 1, name: 'Test' };
    const url = 'https://example.com/api/data';
    const body = { name: 'Test' };

    service.put(url, body).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(body);
    req.flush(mockResponse);
  });

  it('should send a PATCH request with the provided URL and body', () => {
    const mockResponse = { id: 1, name: 'Test' };
    const url = 'https://example.com/api/data';
    const body = { name: 'Test' };

    service.patch(url, body).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(body);
    req.flush(mockResponse);
  });

  it('should send a DELETE request with the provided URL', () => {
    const mockResponse = { id: 1, name: 'Test' };
    const url = 'https://example.com/api/data';

    service.delete(url).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockResponse);
  });

  it('should send a GET request with the provided URL and receive a blob response', () => {
    const mockResponseBlob = new Blob(['Mock file content'], {
      type: 'text/plain',
    });
    const url = 'https://example.com/api/file';

    service.downloadFile(url).subscribe((data: any) => {
      expect(data instanceof Blob).toBeTrue();
      expect(data).toEqual(mockResponseBlob);
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponseBlob, {
      headers: { 'content-type': 'application/octet-stream' },
    });
  });
});
