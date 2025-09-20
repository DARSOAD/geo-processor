import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { PythonProxyController } from './python-proxy.controller';
import { PythonProxyService } from './python-proxy.service';
import { HttpClient } from './http.client';

@Module({
  imports: [CacheModule.register(), ConfigModule.forRoot({ isGlobal: true })],
  controllers: [PythonProxyController],
  providers: [PythonProxyService, HttpClient],
})
export class PythonProxyModule {}
