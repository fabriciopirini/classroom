import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

interface CreateEnrollmentParams {
  title: string;
}

interface GetByCourseAndStudentParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  getByCourseAndStudent({ courseId, studentId }: GetByCourseAndStudentParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });
  }

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listAllInCourse(courseId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        courseId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listEnrollmentsByStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // async createEnrollment({ title }: CreateEnrollmentParams) {
  //   return this.prisma.enrollment.create({
  //     data: {
  //       title,
  //       slug,
  //     },
  //   });
  // }
}
