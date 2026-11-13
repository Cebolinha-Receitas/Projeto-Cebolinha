import { Component, inject } from '@angular/core';
import { blogItems } from '../mocks/blog.mock';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { blogItem } from '../models/blog';

@Component({
  imports: [CommonModule],
  selector: 'app-artigo-blog',
  styleUrl: './artigo-blog.scss',
  templateUrl: './artigo-blog.html',
})
export class ArtigoBlog {
  private route = inject(ActivatedRoute);
  artigo: blogItem | undefined;


  ngOnInit(): void {
    this.artigo = blogItems.find(
      p => p.id === Number(this.route.snapshot.paramMap.get('codigo'))
    );
  }
  
}
