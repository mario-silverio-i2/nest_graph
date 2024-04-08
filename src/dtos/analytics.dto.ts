export class AnalyticsDataDto {
  views: number;
  links: { link_url: string; link_views: number }[];
  date: Date;
  formatedDate: string;

  constructor(data: {
    views: number;
    links: { link_url: string; link_views: number }[];
    date: Date;
    formatedDate: string;
  }) {
    this.views = data.views;
    this.links = data.links;
    this.date = data.date;
    this.formatedDate = data.formatedDate;
  }
}
