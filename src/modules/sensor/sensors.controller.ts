import {
  Body,
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Req,
  Param,
  Delete,
} from '@nestjs/common'
import { JwtGuard } from '@/guards/jwt.guard'
import { SensorsService } from '@/modules/sensor/sensors.service'
import { CreateSensorDTO } from '@/modules/sensor/dto/create-sensor.dto'
import { UpdateSensorDTO } from '@/modules/sensor/dto/update-sensor.dto'

@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAllBy(@Req() { user }) {
    return this.sensorsService.findAllBy(user.id)
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOneBy(@Param('id') id: number) {
    return this.sensorsService.findOne(id)
  }

  @UseGuards(JwtGuard)
  @Post()
  createSensor(@Body() dto: CreateSensorDTO, @Req() { user, sensor: { mac } }) {
    return this.sensorsService.createSensor(user.id, { ...dto, mac })
  }

  @UseGuards(JwtGuard)
  @Patch(':sensorId')
  updateSensor(
    @Param('sensorId') sensorId: number,
    @Body() dto: UpdateSensorDTO, 
    @Req() { user }
  ) {
    return this.sensorsService.updateSensor(user.id, sensorId, dto)
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteSensor(@Param('id') id: number, @Req() { user }) {
    return this.sensorsService.deleteSensor(user.id, id)
  }
}