import { build, fake } from 'test-data-bot';

export const userBuilder = build('User').fields({
  email: fake(f => f.internet.email()),
});
