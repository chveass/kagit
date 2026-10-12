import bcrypt from 'bcryptjs';
import { addAdminUser, getAdminUsers } from '../lib/cms';
import { v4 as uuidv4 } from 'uuid';

async function seedAdmin() {
  const existingAdmins = getAdminUsers();

  if (existingAdmins.length > 0) {
    console.log('Admin user already exists. Skipping seed.');
    return;
  }

  const username = 'admin';
  const password = 'admin123';

  const passwordHash = await bcrypt.hash(password, 12);

  addAdminUser({
    id: uuidv4(),
    username,
    passwordHash
  });

  console.log('Admin user created successfully!');
  console.log('Username:', username);
  console.log('Password:', password);
  console.log('\nPlease change the password after first login.');
}

seedAdmin().catch(console.error);
