import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class StudentService {
  private students = [
    { id: 1, name: 'satish', age: 22 },
    { id: 2, name: 'manish', age: 23 },
    { id: 3, name: 'suresh', age: 24 },
    { id: 4, name: 'parkash', age: 25 },
  ];

  // for get all students
  getAllStudents() {
    return this.students;
  }

  // for get an unique student
  getStudentById(id: number) {
    const student = this.students.find((s) => s.id === id);

    if (!student) {
      // if student is not available in list then show the notfoundexception
      throw new NotFoundException('Student does not exist !');
    }
    return student; // if student found then return the student that is available
  }

  // for post new student
  createNewStudent(data: { name: string; age: number }) {
    const newStudents = {
      id: Date.now(), // it will create new unique id for the new student
      ...data,
    };

    if (!data.name) {
      throw new BadRequestException('Please give name');
    }
    if (!data.age) {
      throw new BadRequestException('Please give age');
    }
    this.students.push(newStudents);
    return { message: 'Student Created Successfuly!!!', newStudents };
  }

  //  for put student details
  updateStudentDetails(id: number, data: { name: string; age: number }) {
    const studentIndex = this.students.findIndex((s) => s.id === id);
    // console.log('updateStudentDetails student index is-->', studentIndex);

    if (!studentIndex) {
      throw new NotFoundException('Student not found');
    }

    if (!data.name) throw new BadRequestException('Please give name');
    if (!data.age) throw new BadRequestException('Please give age');

    //  if student exist then put data on student's index number, like if index is 2 then student[2] = ...data and return changed new student[2]
    this.students[studentIndex] = { id, name: data.name, age: data.age };
    return this.students[studentIndex];
  }

  // patch
  patchStudentDetails(
    id: number,
    data: Partial<{ name: string; age: number }>,
  ) {
    const updatedStudent = this.getStudentById(id);
    Object.assign(updatedStudent, data);
    return updatedStudent;
  }

  // delete
  deleteStudent(id: number) {
    const studentIndex = this.students.findIndex((s) => s.id === id);
    console.log('updateStudentDetails student index is-->', studentIndex);

    if (studentIndex < 0) {
      throw new NotFoundException('Student not found!!!!!1');
    }

    const deletedStudent = this.students.splice(studentIndex, 1);

    return {
      message: 'Student deleted successfuly!!!!',
      data: deletedStudent[0],
    };
  }
}
