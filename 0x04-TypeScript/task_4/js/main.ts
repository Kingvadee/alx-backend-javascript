// main.ts

// Constants for subjects
export const cpp = 'C++';
export const java = 'Java';
export const react = 'React';

// Teacher object
export const cTeacher = {
  experienceTeachingC: 10,
};

// Functions for subjects
function getRequirements(subject: string): string {
  return `Here are the requirements for ${subject}: ...`;
}

function getAvailableTeacher(subject: string, teacher: any): string {
  return `Available teacher for ${subject}: ${JSON.stringify(teacher)}`;
}

// C++ subject
console.log(cpp);
console.log('Setting C++ teacher:', cTeacher);
console.log(getRequirements(cpp));
console.log(getAvailableTeacher(cpp, cTeacher));

// Java subject
console.log(java);
console.log('Setting Java teacher:', cTeacher);
console.log(getRequirements(java));
console.log(getAvailableTeacher(java, cTeacher));

// React subject
console.log(react);
console.log('Setting React teacher:', cTeacher);
console.log(getRequirements(react));
console.log(getAvailableTeacher(react, cTeacher));

