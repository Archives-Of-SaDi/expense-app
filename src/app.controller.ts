import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ReportType } from './data';
import {
  CreateReportDto,
  UpdateReportDto,
  ReportResponseDto,
} from './dtos/report.dto';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: ReportType): ReportResponseDto[] {
    const reportType =
      type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type') type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    const reportType =
      type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Body() body: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): ReportResponseDto {
    return this.appService.createReport(body, type);
  }

  @Put(':id')
  updateReport(
    @Body() body: UpdateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    const reportType =
      type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.updateReport(body, reportType, id);
  }

  @Delete(':id')
  deleteReport(
    @Param('type') type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    this.appService.deleteReport(type, id);
  }
}
