import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HomeService } from './services/home.service';
import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  artists: Array<any> = [];
  searchText: string = decodeURIComponent(this.activatedRoute.snapshot.queryParams['keyword'] || '');

  subject = new Subject<string>();
  results$: Observable<string> = this.subject.asObservable();


  ngOnInit(): void {
    if(this.searchText != '') {
      this.search();
    } 

    this.activatedRoute.queryParams.subscribe((q) => {
      if (q['keyword'] && q['keyword'] != this.searchText) {
        this.searchText = decodeURIComponent(q['keyword']);
        this.search();
      } else if (!q['keyword']) {
        this.searchText = '';
        this.artists = [];
      }
    });

    this.results$.pipe(debounceTime(500)).subscribe(() => {
      this.search();
    });
  }

  search() {
    this.homeService.searchForArtists(this.searchText).subscribe({
      next: (res: any) => {
        this.artists = res.artists.items;
        this.router.navigate([], {
          queryParams: {
            keyword: encodeURIComponent(this.searchText),
          },
          relativeTo: this.activatedRoute,
        });
      },
      error: (err: any) => {
        this.artists = [];
      },
    });
  }

  callSearch() {
    if(this.searchText != '') {
      this.subject.next(this.searchText);
    }
  }

  ngOnDestroy() {
  }

}
