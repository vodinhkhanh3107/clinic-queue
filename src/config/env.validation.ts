import { plainToInstance } from 'class-transformer';
import { IsInt, IsString, Max, Min, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsString() NODE_ENV: string = 'development';
  @IsInt() @Min(1) @Max(65535) PORT: number = 3000;
  @IsString() CORS_ORIGIN: string = 'http://localhost:5173';
  @IsString() CLINIC_NAME: string = 'PHÒNG KHÁM ABC';
  @IsString() CLINIC_TZ: string = 'Asia/Ho_Chi_Minh';
}

export function validateEnv(config: Record<string, unknown>) {
  const validated = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validated);
  if (errors.length > 0) {
    const detail = errors
      .map((e) => `${e.property}: ${Object.values(e.constraints ?? {}).join(', ')}`)
      .join('\n');
    throw new Error(`Cấu hình môi trường không hợp lệ:\n${detail}`);
  }
  return validated;
}