import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  getStudentById(@Param('id') id: string) {
    return this.studentService.getStudentById(Number(id));
  }

  @Post()
  createNewStudent(@Body() body: { name: string; age: number }) {
    return this.studentService.createNewStudent(body);
  }

  @Put(':id')
  updateStudentDetails(
    @Param('id') id: string,
    @Body() body: { name: string; age: number },
  ) {
    return this.studentService.updateStudentDetails(Number(id), body);
  }

  @Patch(':id')
  patchStudentDetails(
    @Param('id') id: string,
    @Body() body: Partial<{ name: string; age: number }>, // partial is a type script inbuild function that allows to take any value that in available like a?. string
  ) {
    return this.studentService.patchStudentDetails(Number(id), body);
  }

  @Delete(':id')
  deleteStudent(@Param('id') id: string) {
    return this.studentService.deleteStudent(Number(id));
  }
}
