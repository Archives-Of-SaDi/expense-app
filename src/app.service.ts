import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { data, ReportType } from './data';
import { ReportResponseDto } from './dtos/report.dto';

interface ReportData {
  source: string;
  amount: number;
}

interface UpdateReportData {
  source?: string;
  amount?: number;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) return;

    return new ReportResponseDto(report);
  }

  createReport(body: ReportData, type: ReportType): ReportResponseDto {
    const newReport = {
      id: v4(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE,
    };

    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(
    body: UpdateReportData,
    type: ReportType,
    id: string,
  ): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) return;

    const reportIndex = data.report.findIndex((r) => r.id === report.id);

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };

    return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(type: ReportType, id: string) {
    const reportType =
      type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE;

    const report = data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);

    const reportIndex = data.report.findIndex((r) => r.id === report.id);

    data.report.splice(reportIndex, 1);

    return report;
  }
}
