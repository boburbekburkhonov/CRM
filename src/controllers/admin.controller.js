import path from 'path'
import { errorHandlerError } from "../errors/error.handler.errors.js"
import { read, write } from "../utils/FS.js"


//  GET ADMIN
export const getAdmin = (req, res) => {
  const allGroups = read("groups.json");
  const allCourses = read("courses.json");
  const allUsers = read("users.json");

  const allStudents = allUsers.filter((e) => e.role == "student");

  const allTeachers = allUsers.filter((e) => e.role == "teacher");

  res.render("admin.ejs", {
    name: req.name,
    groups: allGroups.length,
    courses: allCourses.length,
    students: allStudents.length,
    teachers: allTeachers.length,
  });
};

// GETDMIN GROUP
export const getAdminGroup = (req, res) => {
  const allGroups = read("groups.json");
  const allCourses = read("courses.json");
  const allUsers = read("users.json");

  allGroups.forEach((e) =>
    allCourses.find((c) => {
      if (c.id == e.courseId) {
        e.courseId = c.courseName;
      }
    })
  );

  allGroups.forEach((e) =>
    allUsers.find((u) => {
      if (e.teacher == u.id) {
        (e.teacher = u.name), (e.number = u.number), (e.img = u.img);
      }
    })
  );

  let courseId = [];
  let teacher = [];

  allCourses.forEach((e) => courseId.push(e.courseName));

  const filteredTeacher = allUsers.filter((e) => e.role == "teacher");

  filteredTeacher.forEach((e) => teacher.push(e.name));

  res.render("./pages/group", {
    name: req.name,
    groups: allGroups,
    courseId,
    teacher: [...new Set(teacher)],
  });
};

// GET ADMIN TEACHER
export const getAdminTeacher = (req, res) => {
  const allUsers = read("users.json");
  const allCourses = read("courses.json");

  const foundTeachers = allUsers.filter((e) => e.role == "teacher");

  if (!foundTeachers.length) {
    return next(new errorHandlerError("Hozircha ustozlar mavjud emas!", 404));
  }

  res.render("./pages/teacher", { name: req.name, foundTeachers, allCourses });
};

// GET ADMIN COURSE

export const getAdminCourse = (req, res) => {
  res.render("./pages/course", {
    name: req.name,
    courses: read("courses.json"),
  });
};

// GET ADMIN STUDENT

export const getAdminStudent = (req, res) => {
  const allUsers = read("users.json");
  const allGroups = read("groups.json");

  allUsers.forEach((e) =>
    allGroups.find((g) => {
      if (e.groupId == g.id) {
        e.group = g.groupName;
      }
    })
  );

  const filteredUsers = allUsers.filter((e) => e.role == "student");

  let groups = [];

  allGroups.forEach((e) => groups.push(e.groupName));

  res.render("./pages/student", {
    name: req.name,
    filteredUsers,
    groupsName: [...new Set(groups)],
  });
};

// ADD COURSE

export const addCourse = async (req, res, next) => {
  const { courseName, title, price } = req.body;

  const allCourses = read("courses.json");

  const foundCourse = allCourses.find((e) => e.courseName === courseName);

  if (foundCourse) {
    return next(
      new errorHandlerError("Bunday kurs allaqachon yaratilgan!", 400)
    );
  }

  allCourses.push({
    id: allCourses.at(-1)?.id + 1 || 1,
    courseName,
    title,
    price,
  });

  const newAllCourses = await write("courses.json", allCourses);

  if (newAllCourses) {
    res.redirect("/admin/course");
  }
};

// DELETE COURSE

export const deleteCourse = async (req, res, next) => {
  const { id } = req.params;

  const allCourses = read("courses.json");
  const allGroups = read("groups.json");

  const filteredCourse = allCourses.filter((e) => e.id != id);
  const filteredGroups = allGroups.filter((e) => e.courseId != id);

  const newAllCourses = await write("courses.json", filteredCourse);

  await write("groups.json", filteredGroups);

  if (newAllCourses) {
    res.redirect("/admin/course");
  }
};

// CREATE GROUP

export const createGroup = async (req, res,next) => {
  let { groupName, courseId, kun, soat, teacher } = req.body;

  const allGroups = read('groups.json');
  const allUsers = read('users.json');
  const allCourses = read('courses.json');

  allUsers.forEach(e => {
    if(e.name == teacher && e.role == 'teacher'){
      teacher = e.id
      e.groups += 1
    }
  })

  allCourses.forEach(e => {
    if(e.courseName == courseId){
      courseId = e.id
    }
  })

  allGroups.push({
    id:allGroups.at(-1)?.id + 1 || 1,
    groupName, courseId, teacher, kun,soat
  })

  const newAllGroups = await write('groups.json', allGroups)

  await write('users.json', allUsers)

  if(newAllGroups){
    res.redirect('/admin/group')
  }
}

// DELETEGROUP

export const deleteGroup = async (req, res, next) => {
  const { id } = req.params;

  const allGroups = read('groups.json')
  const allUsers = read('users.json');

  const filteredGroups = allGroups.filter(e => e.id != id)

  const foundGroup = allGroups.find(e => e.id == id).teacher

  const foundTeacher = allUsers.find(e => e.id == foundGroup && e.role == 'teacher')

  if(foundTeacher){
    foundTeacher.groups -= 1
  }

  const filteredStudents = allUsers.filter(e => e.groupId != id)

  const newAllGroups = await write('groups.json', filteredGroups)

  await write('users.json', filteredStudents)

  if(newAllGroups){
    res.redirect('/admin/group')
  }
}

// CREATE TEACHER

export const createTeacher = async (req, res, next) => {
  const { name, password, course, number } = req.body;

  let teacherImg;

  if(req.files){
    const { file } = req.files;

    file.mv(path.join(process.cwd(), 'src', 'assets', 'images', file.name), err => {
      return next(new errorHandlerError(err.message, 400));
    })

    teacherImg = '/assets/images/' + file.name;
  }

  const allUsers = read('users.json')

  const newTeacher = {
    id: allUsers.at(-1)?.id + 1 || 1,
    name, password, course, number,
    groups: 0,
    role: 'teacher'
  }

  newTeacher.img = teacherImg ? teacherImg : '/assets/images/user.jpg'

  if(allUsers) allUsers.push(newTeacher)

  const newAllTeachers = await write('users.json', allUsers)

  if(newAllTeachers) res.redirect('/admin/teacher')
}

// DELETE TEACHER

export const deleteTeacher = async (req, res, next) => {
  const { id } = req.params;

  const allUsers = read('users.json')
  const allGroups = read('groups.json')

  let filteredTeacher = allUsers.filter((e) => e.id != id);

  const filteredGroups = allGroups.filter((e) => e.teacher != id);

  const newAllTeachers = await write("users.json", filteredTeacher);

  await write('groups.json', filteredGroups)

  if(newAllTeachers) res.redirect('/admin/teacher')
}

// CREATE STUDENT

export const createStudent = async (req, res, next) => {
  let { name, password, groupId, number } = req.body;

  const allUsers = read('users.json')
  const allGroups = read('groups.json')

  allGroups.forEach(e => {
    if(e.groupName == groupId){
      groupId = e.id
    }
  })
  console.log(groupId);
  const newStudent = {
    id:allUsers.at(-1)?.id + 1 || 1,
    name, password, groupId, number,
    role: "student",
  }

  let studentImg;

  if(req.files){
    const { file } = req.files;

    file.mv(path.join(process.cwd(), 'src', 'assets', 'images', file.name), err => {
      if(err){
        return next(new errorHandlerError(err.message, 400));
      }
    })

    studentImg = '/assets/images/' + file.name
  }

  newStudent.img = studentImg ? studentImg : '/assets/images/user.jpg'

  if(allUsers) allUsers.push(newStudent)

  const newAllUsers = await write('users.json', allUsers)

  if(newAllUsers) res.redirect('/admin/student')
}

// DELETE STUDENT

export const deleteStudent = async (req, res, next) => {
  const { id } = req.params;

  const allUsers = read('users.json')

  const filteredUsers = allUsers.filter(e => e.id != id)

  const newAllUsers = await write('users.json', filteredUsers)

  if(newAllUsers) res.redirect('/admin/student')
}