import { Component, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { tap, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  slides = [{ color : '#605f8f', overlay : []} , { color : '#ff50a0', overlay : []}, { color : '#f3aa51', overlay : []}, { color : '#fcf695', overlay : []}, { color : '#567ace', overlay : []}, { color : '#b7d3e9', overlay : []}];
  playArea = [];
  sketches = [{ image : 'google.jpg'}, { image : 'facebook.jpg'}, { image : 'insta.jpg'}, { image : 'twitter.jpg'}, { image : 'youtube.jpg'}];

  @ViewChildren('item', { read: CdkDropList })
  slideList: QueryList<CdkDropList>;

  addedSlides: CdkDropList[] = [];

  constructor(private cd: ChangeDetectorRef) {

  }

  ngAfterViewInit(): void {
    this.slideList.changes.pipe(
      startWith(true),
      tap(() => {
        this.addedSlides = this.slideList.toArray();
        this.cd.markForCheck();
        this.cd.detectChanges();
        console.log(this.addedSlides);
      }),
    ).subscribe();
  }

  drop(event: CdkDragDrop<number[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  isSlidePredicate(item: CdkDrag<number>) {
    return !!item.data['color'];
  }

  isSketchPredicate(item: CdkDrag<number>) {
    return !!item.data['image'];
  }
}
