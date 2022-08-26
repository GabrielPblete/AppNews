import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  page:number = 1;
  articles:Article[]=[];
  categories:string[]= ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  selectedCategory:string;

  constructor(private newsService:NewsService) {}
  @ViewChild(IonInfiniteScroll,{static:true}) infiniteScroll:IonInfiniteScroll;

  ngOnInit() {
    this.selectedCategory= this.categories[0];
    this.newsService.getTopHeadLines(this.page).subscribe(resp=>{ //any suele ser mala practica, usarla como ultima opción 
      console.log(resp.articles);
      this.articles = resp.articles;
    })
  }

  segmentChanged(event:any){
    this.infiniteScroll.disabled= false;
    this.page=1;
    console.log(event.detail.value);
    this.selectedCategory= event.detail.value;
    this.newsService.getTopHeadLinesCategories(this.page, this.selectedCategory).subscribe(resp=>{ //any suele ser mala practica, usarla como ultima opción 
      console.log(resp.articles);
      this.articles = resp.articles;
    })
  }

  loadData(event:any){
    this.page +=1;
    console.log(event);
    this.newsService.getTopHeadLinesCategories(this.page, this.selectedCategory).subscribe(resp=>{ 
      //console.log(resp.articles);
      if (resp.articles.length===0){
        this.infiniteScroll.disabled = true;
      }
      this.articles = [... this.articles,...resp.articles];
      this.infiniteScroll.complete();
    })
  }
}
