import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { ApiResponse } from './ApiResponse';

export interface Node {
  package: string;
  name: string;
  running: boolean;
}

export interface Topic {
  name: string;
  type: string;
  content: string[];
}

export interface UpdateInfo {
  nodes: Node[];
  topics: Topic[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  /**
   * The api url from the config
   */
  get URL() {
    return this.config.get('apiUrl', 'http://localhost:5000');
  }

  /**
   * The http-options containing the token, if a user is logged-in
   */
  private get httpOptions(): { observe: 'response'; headers: HttpHeaders } {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return {
      observe: 'response',
      headers,
    };
  }

  /**
   * Handles the received http-response-observable and returns the appropriate ApiResponse instance
   *
   * @param observable the http-response-observable to handle
   * @returns the created ApiResponse instance
   */
  private async handleResponse<T>(observable: Observable<HttpResponse<T | null>>): Promise<ApiResponse<T>> {
    let prom = observable.toPromise();

    let status: number;
    let value: T | null;

    try {
      let ret = await prom;

      status = ret.status;
      value = ret.body;
    } catch (e: any) {
      return this.handleError(e);
    }

    return new ApiResponse<T>(status, value);
  }

  private handleError<T>(e: HttpErrorResponse) {
    let status = e.status;
    let error = e.error;

    if (status != 404) {
      return new ApiResponse<T>(e.status, null, error);
    }

    return new ApiResponse<T>(status, error);
  }

  private get<T>(path: string, httpOptions = this.httpOptions) {
    return this.handleResponse<T>(this.http.get<T>(this.URL + path, httpOptions));
  }
  private patch<T>(path: string, data: any = {}, httpOptions = this.httpOptions) {
    return this.handleResponse<T>(this.http.patch<T>(this.URL + path, data, httpOptions));
  }

  // api-routes
  getUpdate() {
    return new ApiResponse<UpdateInfo>(200, {
      nodes: [
        {
          name: 'name1',
          package: 'package1',
          running: false,
        },
        {
          name: 'name2',
          package: 'package2',
          running: true,
        },
      ],
      topics: [
        {
          content: [
            'x: a\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
            'x: e\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          ],
          name: '/turtle1/pose',
          type: 'generic',
        },
      ],
    });
    //return this.get<UpdateInfo>('/update');
  }

  toggleNode(packageName: string, node: string) {
    return this.patch<boolean>(`/nodes/toggle/${packageName}/${node}`);
  }

  getTopicUpdate() {
    // return this.get<Topic[]>('/topics/update');
    return new ApiResponse<Topic[]>(200, [
      {
        content: [
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
          'x: 5.544444561004639\ny: 5.544444561004639\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0',
        ],
        name: '/turtle1/pose',
        type: 'generic',
      },
    ]);
  }
}
