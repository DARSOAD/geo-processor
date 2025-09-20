import { Module } from '@nestjs/common';
import { PythonProxyModule } from './python-proxy/python-proxy.module';

@Module({
  imports: [PythonProxyModule],
})
export class AppModule {}
