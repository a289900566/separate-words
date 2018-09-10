import { Get, Req, Post, Put, Delete, Body, Controller, Param } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('api/task')
export class TaskController {
  constructor(private readonly TaskService: TaskService) {}
  
  @Get()
  find(@Req() req) {
    return this.TaskService.find(req.query.offset, req.query.pageSize);
  }

  @Get(":id")
  findOne (@Param() param) {
    return this.TaskService.findOne(param.id);
  }

  @Post()
  create(@Body() body){
    return this.TaskService.create(body);
  }

  @Put()
  update (@Body() body){
    return this.TaskService.update(body);
  }

  @Delete()
  delete (@Body() body) {
    return this.TaskService.delete(body.id);
  }
}
