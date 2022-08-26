import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewsResponse } from '../interfaces';

const apiKey = environment.apiKey;
const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http:HttpClient) { }

  getTopHeadLines(page: number){
    return this.http.get<NewsResponse>(`${url}/top-headlines`, {
      params:{
        apiKey: apiKey,
        country: 'us',
        category: 'business',
        page: page
      }
    })
  }

  getTopHeadLinesCategories(page: number, category:string){
    return this.http.get<NewsResponse>(`${url}/top-headlines`, {
      params:{
        apiKey: apiKey,
        country: 'us',
        category: category,
        page: page
      }
    })
  }

}
