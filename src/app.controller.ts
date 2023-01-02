import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { data, ReportType } from './data';
import { v4 } from 'uuid';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return data.report.filter((report) => report.type === reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
  }

  @Post()
  createReport(
    @Body() body: { source: string; amount: number },
    @Param('type') type: string,
  ) {
    const newReport = {
      id: v4(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };

    data.report.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateReport(
    @Body() body: { source: string; amount: number },
    @Param('type') type: string,
    @Param('id') id: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const report = data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);

    if (!report) return;

    const reportIndex = data.report.findIndex((r) => r.id === report.id);

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
    };

    return data.report[reportIndex];
  }

  @Delete(':id')
  deleteReport(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const report = data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);

    const reportIndex = data.report.findIndex((r) => r.id === report.id);

    data.report.splice(reportIndex, 1);

    return report;
  }
}
