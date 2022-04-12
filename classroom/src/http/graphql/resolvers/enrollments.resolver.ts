import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CoursesService } from '../../../services/courses.service';

import { EnrollmentsService } from '../../../services/enrollments.service';
import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Course } from '../models/course';

import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
  ) {}

  @Query(() => [Enrollment])
  enrollments() {
    return this.enrollmentsService.listAllEnrollments();
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.getStudentById(enrollment.studentId);
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.getCourseById(enrollment.courseId);
  }

  // @UseGuards(AuthorizationGuard)
  // @Mutation(() => Enrollment)
  // createEnrollment(@Args('data') data: CreateEnrollmentInput) {
  //   return this.enrollmentsService.createEnrollment(data);
  // }
}
