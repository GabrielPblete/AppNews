import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article, NewsResponse } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll,{static:true}) infiniteScroll:IonInfiniteScroll;

  public articles: Article[]=[];
  page: number = 1;

  constructor(private newsService:NewsService) {}

  ngOnInit() {
    this.newsService.getTopHeadLines(this.page).subscribe(resp=>{ //any suele ser mala practica, usarla como ultima opción 
      console.log(resp.articles);
      this.articles = resp.articles;
    })
  }

  loadData(event:any){
    this.page +=1;
    console.log(event);
    this.newsService.getTopHeadLines(this.page).subscribe(resp=>{ 
      //console.log(resp.articles);
      if (resp.articles.length===0){
        this.infiniteScroll.disabled = true;
      }
      this.articles = [... this.articles,...resp.articles];
      this.infiniteScroll.complete();
    })
  }
}
