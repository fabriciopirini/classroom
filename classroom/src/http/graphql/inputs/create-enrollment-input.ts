import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEnrollmentInput {
  @Field()
  name: string;
}
