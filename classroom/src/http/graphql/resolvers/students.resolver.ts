import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { EnrollmentsService } from '../../../services/enrollments.service';
import { StudentsService } from '../../../services/students.service';

import { AuthorizationGuard } from '../../auth/authorization.guard';

import { CreateStudentInput } from '../inputs/create-student-input';

import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentService: EnrollmentsService,
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents();
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentService.listEnrollmentsByStudent(student.id);
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Student)
  createStudent(@Args('data') data: CreateStudentInput) {
    return this.studentsService.createStudent(data);
  }
}
