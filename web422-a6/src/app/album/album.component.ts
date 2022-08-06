import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  private albumSubscribe!: Subscription;
  album: any;
  private id: any;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private musicDataService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.albumSubscribe = this.musicDataService
      .getAlbumById(this.id)
      .subscribe((data) => {
        return (this.album = data);
      });
  }

  addToFavourites(trackId: string): void {
    this.musicDataService.addToFavourites(trackId).subscribe(
      (data) => {
        this.snackBar.open('Adding to Favourites...', 'Done', {
          duration: 1500,
        });
      },
      (err) => {
        this.snackBar.open('Unable to add song to Favourites...', 'Done', {
          duration: 2500,
        });
      }
    );
  }

  ngOnDestroy() {
    this.albumSubscribe?.unsubscribe();
  }
}