import { Injectable } from '@nestjs/common';
import { AnalyticsDataDto } from '../dtos/analytics.dto';
import * as moment from 'moment';

export type MostViewedLinks = {
  date: Date;
  formatedDate: string;
  link_url: string;
  link_views: number;
};

interface GroupedAnalyticsData {
  [key: string]: AnalyticsDataDto[];
}

@Injectable()
export class AnalyticsService {
  constructor() {}
  private mockData: AnalyticsDataDto[] = [];

  async onModuleInit(): Promise<void> {
    await this.setMockData();
  }

  setMockData(): any {
    try {
      const linkPages = [
        `https://www.flamengo.com.br/`,
        `https://www.instagram.com/flamengo/`,
        `https://www.youtube.com/@flamengo`,
      ];
      const startDate = moment('2024-03-01').toDate();

      //Loop para interar pelos dias de Março
      for (let index = 0; index < 31; index++) {
        const links = [];
        let totalLinkViews = 0;
        const date = moment(startDate).add(index, 'days').toDate();
        const formatedDate = date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });

        for (let linkIndex = 0; linkIndex < linkPages.length; linkIndex++) {
          //Para cada link do array, criar um nº de visualizações
          const link_url = linkPages[linkIndex];
          const link_views =
            (Math.floor(Math.random() * 9999) + 1) *
            (Math.floor(Math.random() * 9) + 1);
          //Aqui fazer o somatório do total de views
          totalLinkViews += link_views;
          links.push({ link_url, link_views });
        }

        const analyticsData = new AnalyticsDataDto({
          views: totalLinkViews,
          links,
          date,
          formatedDate,
        });
        this.mockData.push(analyticsData);
      }
    } catch (err) {
      console.error(err);
      console.log(err);
    }
  }

  extractMostViewedLinks(dataArray: any[]): MostViewedLinks[] {
    //Extrair os mais visualizados dos dados, trazendo todos para posteriormente ser tratado para os que realmente precisa
    return dataArray.map((item) => {
      const linkMaisVisualizado = item.links.reduce(
        (max: { link_views: number }, current: { link_views: number }) => {
          return max.link_views > current.link_views ? max : current;
        },
      );

      return {
        date: item.date,
        formatedDate: item.formatedDate,
        link_url: linkMaisVisualizado.link_url,
        link_views: linkMaisVisualizado.link_views,
      };
    });
  }
  //Retorna os dados randômicos da análise
  getMockData(): GroupedAnalyticsData {
    const groupedData = this.mockData.reduce(
      (acc: GroupedAnalyticsData, item) => {
        const date = new Date(item.date).toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
        return acc;
      },
      {},
    );
    return groupedData;
  }

  getMockDataTable(): MostViewedLinks[] {
    //Aqui trazendo os 7 últimos dias os links mais acessados
    const data = this.extractMostViewedLinks(this.mockData);
    data
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .reduce((acc, item) => {
        const date = new Date(item.date).toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
        return acc;
      }, {});
    return data.slice(0, 7);
  }
}
