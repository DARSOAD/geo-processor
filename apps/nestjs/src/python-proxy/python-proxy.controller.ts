import {
  Controller,
  Post,
  Body,
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { PythonProxyService } from './python-proxy.service';
import { ProcessRequestDto } from './dto/process.request.dto';

@Controller('python')
export class PythonProxyController {
  constructor(private readonly service: PythonProxyService) {}

  // POST /api/python/process?refresh=true|false
  @Post('process')
  process(
    @Body() body: ProcessRequestDto,
    @Query('refresh', new DefaultValuePipe(false), ParseBoolPipe)
    refresh: boolean,
  ) {
    return this.service.computeOrFetch(body, refresh);
  }
}
