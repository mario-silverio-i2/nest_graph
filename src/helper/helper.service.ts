import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  groupByDateDesc(array: any[]): any {
    const grouped = array.reduce((acc, item) => {
      const date = new Date(item.date).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    const sortedDates = Object.keys(grouped).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime(),
    );

    const result = sortedDates.map((date) => ({
      date,
      items: grouped[date],
    }));

    return result;
  }

  groupByDate(array: any[]): any {
    const grouped = array.reduce((acc, item) => {
      const date = new Date(item.date).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    const sortedDates = Object.keys(grouped).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );

    const result = sortedDates.map((date) => ({
      date,
      items: grouped[date],
    }));

    return result;
  }
}
