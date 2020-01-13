import { build, fake, sequence, oneOf } from 'test-data-bot';
import { UserState, IUser } from '../users/_models/User';

export const userBuilder: () => IUser = build('User').fields({
  id: sequence(x => `user-${x}`),
  email: fake(f => f.internet.email()),
  createdAt: fake(f => f.date.past().toISOString()),
  updatedAt: fake(f => f.date.past().toISOString()),
  state: oneOf(...Object.values(UserState)),
  firstName: fake(f => f.name.firstName()),
  lastName: fake(f => f.name.lastName()),
  roles: fake(f => [
    {
      id: f.random.uuid(),
      name: f.lorem.word(),
    },
  ]),
});
