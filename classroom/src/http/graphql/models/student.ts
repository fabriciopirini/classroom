import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Enrollment } from './enrollment';

@ObjectType()
export class Student {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [Enrollment])
  enrollments: Enrollment;
}
