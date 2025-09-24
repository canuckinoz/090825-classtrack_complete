async function seedTeacher() {
  return {
    id: 'TEACH-001',
    role: 'teacher',
    scope: { classIds: ['CLASS-3A'] },
  };
}

module.exports = { seedTeacher };
