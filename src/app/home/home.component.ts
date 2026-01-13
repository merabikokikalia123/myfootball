// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HttpService } from '../service/http.service';

// interface NewsItem {
//   id?: number;
//   title: string;
//   content: string;
//   category: string;
//   imageUrl?: string;
// }

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [CommonModule, FormsModule], // FormsModule აუცილებელია ngModel-ისთვის
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'],
// })
// export class HomeComponent implements OnInit {
//   footballNews: NewsItem[] = [];
//   judoNews: NewsItem[] = [];
//   basketballNews: NewsItem[] = [];
//   mmaNews: NewsItem[] = [];

//   defaultNewsImageUrl = 'https://via.placeholder.com/800x400?text=News';

//   newNews: NewsItem = { title: '', content: '', category: '', imageUrl: '' };
//   isAdmin: boolean = false; // true – თუ ადმინი, false – მომხმარებელი

//   constructor(private httpService: HttpService) {}

//   ngOnInit(): void {
//     this.checkUserRole();
//     this.loadNews();
//   }

//   // მარტივი როლის შემოწმება
//   checkUserRole(): void {
//     // რეალურად შეიძლება localStorage, JWT ან სერვისი გამოიყენო
//     this.isAdmin = true; // გამოცდისთვის ადმინისტრატორი
//   }

//   // Load existing news from backend/service
//   loadNews(): void {
//     this.httpService.getAllNews().subscribe({
//       next: (news: NewsItem[]) => {
//         const normalize = (value: any) => (value || '').toString().toLowerCase();

//         this.footballNews = news.filter(n => normalize(n.category) === 'football');
//         this.judoNews = news.filter(n => normalize(n.category) === 'judo');
//         this.basketballNews = news.filter(n => normalize(n.category) === 'basketball');
//         this.mmaNews = news.filter(n => normalize(n.category) === 'mma');
//       },
//       error: err => console.error('News ვერ ჩაიტვირთა:', err),
//     });
//   }

//   // HTML loop
//   getCategoryNews(category: string): NewsItem[] {
//     switch (category.toLowerCase()) {
//       case 'football': return this.footballNews;
//       case 'judo': return this.judoNews;
//       case 'basketball': return this.basketballNews;
//       case 'mma': return this.mmaNews;
//       default: return [];
//     }
//   }

//   // Add news – მხოლოდ ადმინებისთვის
//   addNews(): void {
//     if (!this.isAdmin) return; // უსაფრთხოების ფენა
//     if (!this.newNews.title || !this.newNews.content || !this.newNews.category) return;

//     const categoryKey = this.newNews.category.toLowerCase() + 'News';
//     (this as any)[categoryKey].unshift({ ...this.newNews }); // ზედა ნაწილში ჩასმა

//     this.newNews = { title: '', content: '', category: '', imageUrl: '' };
//   }
// }
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../service/http.service';

export interface NewsItem {
  id?: number;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  date?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // News arrays by category
  footballNews: NewsItem[] = [];
  judoNews: NewsItem[] = [];
  basketballNews: NewsItem[] = [];
  mmaNews: NewsItem[] = [];

  // Default image URL
  defaultNewsImageUrl = 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop';

  // New news form model
  newNews: NewsItem = { 
    title: '', 
    content: '', 
    category: '', 
    imageUrl: '' 
  };

  // Admin role flag
  isAdmin: boolean = false;

  // Loading state
  isLoading: boolean = false;

  // Available categories
  categories: string[] = ['football', 'judo', 'basketball', 'mma'];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.checkUserRole();
    this.loadNews();
  }

  /** Check if current user is admin */
  checkUserRole(): void {
    const userRole = localStorage.getItem('userRole'); // ან ნებისმიერი ავტორიზაციის ლოგიკა
    this.isAdmin = userRole === 'admin';
  }

  /** Load all news from backend */
  loadNews(): void {
    this.isLoading = true;
    this.httpService.getAllNews().subscribe({
      next: (news: NewsItem[]) => {
        this.categorizeNews(news);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading news:', err);
        this.isLoading = false;
      },
    });
  }

  /** Categorize news into arrays */
  private categorizeNews(news: NewsItem[]): void {
    const normalize = (value: any) => (value || '').toString().toLowerCase().trim();
    this.footballNews = news.filter(n => normalize(n.category) === 'football');
    this.judoNews = news.filter(n => normalize(n.category) === 'judo');
    this.basketballNews = news.filter(n => normalize(n.category) === 'basketball');
    this.mmaNews = news.filter(n => normalize(n.category) === 'mma');
  }

  /** Get news array by category */
  getCategoryNews(category: string): NewsItem[] {
    switch (category.toLowerCase()) {
      case 'football': return this.footballNews;
      case 'judo': return this.judoNews;
      case 'basketball': return this.basketballNews;
      case 'mma': return this.mmaNews;
      default: return [];
    }
  }

  /** Add new news item (Admin only) */
  addNews(): void {
    if (!this.isAdmin) return;
    if (!this.newNews.title?.trim() || !this.newNews.content?.trim() || !this.newNews.category) return;

    const newsItem: NewsItem = {
      ...this.newNews,
      date: new Date().toISOString(),
      imageUrl: this.newNews.imageUrl || this.defaultNewsImageUrl
    };

    this.httpService.addNews(newsItem).subscribe({
      next: (response: NewsItem) => {
        const categoryKey = `${response.category.toLowerCase()}News` as keyof HomeComponent;
        const categoryArray = this[categoryKey] as NewsItem[];
        if (Array.isArray(categoryArray)) {
          categoryArray.unshift(response);
        }
        this.resetForm();
      },
      error: (err: any) => console.error('Error adding news:', err)
    });
  }

  /** Delete news item (Admin only) */
  deleteNews(newsId: number, category: string): void {
    if (!this.isAdmin) return;
    if (!confirm('Are you sure you want to delete this news?')) return;

    this.httpService.deleteNews(newsId).subscribe({
      next: () => {
        const categoryKey = `${category.toLowerCase()}News` as keyof HomeComponent;
        const categoryArray = this[categoryKey] as NewsItem[];
        if (Array.isArray(categoryArray)) {
          const index = categoryArray.findIndex(n => n.id === newsId);
          if (index > -1) categoryArray.splice(index, 1);
        }
      },
      error: (err: any) => console.error('Error deleting news:', err)
    });
  }

  /** Update news item (Admin only) */
  updateNews(newsItem: NewsItem): void {
    if (!this.isAdmin) return;

    this.httpService.updateNews(newsItem).subscribe({
      next: (updated: NewsItem) => {
        const categoryKey = `${updated.category.toLowerCase()}News` as keyof HomeComponent;
        const categoryArray = this[categoryKey] as NewsItem[];
        if (Array.isArray(categoryArray)) {
          const index = categoryArray.findIndex(n => n.id === updated.id);
          if (index > -1) categoryArray[index] = updated;
        }
      },
      error: (err: any) => console.error('Error updating news:', err)
    });
  }

  /** Reset form */
  private resetForm(): void {
    this.newNews = { title: '', content: '', category: '', imageUrl: '' };
  }

  /** Category icon for display */
  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      football: '⚽',
      judo: '🥋',
      basketball: '🏀',
      mma: '🥊'
    };
    return icons[category.toLowerCase()] || '📰';
  }

  /** Display-friendly category name */
  getCategoryDisplayName(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  }

  /** Check if category has news */
  hasCategoryNews(category: string): boolean {
    return this.getCategoryNews(category).length > 0;
  }
}
