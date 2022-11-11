import { errorHandlerError } from "../errors/error.handler.errors.js";
import { read, write } from "../utils/FS.js";

export const getTeacher = (req, res) => {
  const allGroups = read("groups.json");
  const allCourses = read("courses.json");
  const allUsers = read("users.json");

  const foundGroups = allGroups.filter((e) => e.teacher == req.id);

  const foundTeacher = allUsers.find((e) => e.id == req.id);

  foundGroups.forEach((e) =>
    allCourses.find((c) => {
      if (e.courseId == c.id) {
        e.courseName = c.courseName;
      }
    })
  );
  res.render("teacher.ejs", { name: req.name, foundGroups, foundTeacher });
};

export const getTeacherGroups = (req, res, next) => {
  const { id } = req.params;

  const allUsers = read("users.json");

  const foundTeacher = allUsers.find((e) => e.id == req.id);

  const foundUsers = allUsers.filter((e) => e.groupId == id);

  if (!foundUsers.length) {
    return next(
      new errorHandlerError("O'quvchilar hozircha mavjud emas!", 404)
    );
  }

  return res.render("./pages/teacherGroups.ejs", {
    name: req.name,
    foundUsers,
    foundTeacher,
    groupId: id,
  });
};

export const addHomework = async (req, res, next) => {
  const { title } = req.body;
  const { id } = req.params;

  const allHomeworks = read("homeworks.json");

  allHomeworks.push({
    id: allHomeworks.at(-1)?.id + 1 || 1,
    groupId: id,
    title,
    isTodoHomework: false,
  });

  const newAllHomeworks = await write("homeworks.json", allHomeworks);

  if (newAllHomeworks) res.redirect(`/teacher/groups/${id}`);
};
