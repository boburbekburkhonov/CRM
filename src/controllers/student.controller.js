import { errorHandlerError } from "../errors/error.handler.errors.js";
import { read, write } from "../utils/FS.js";

export const getStudent = (req, res, next) => {
  const allUsers = read("users.json");
  const allGroups = read("groups.json");
  const allCourses = read("courses.json");
  const allHomeworks = read("homeworks.json");

  const foundStudent = allUsers.find((e) => e.id == req.id);

  if (!foundStudent) {
    return next(new errorHandlerError("Student not found", 404));
  }

  const foundGroup = allGroups.find((g) => g.id == foundStudent.groupId);

  if (!foundGroup) {
    return next(new errorHandlerError("Sizni guruhingiz yopildi!", 404));
  }

  const foundCourse = allCourses.find((c) => c.id == foundGroup.courseId);

  const foundHomeworks = allHomeworks.filter(
    (h) => h.groupId == foundStudent.groupId
  );

  if (foundGroup) {
    foundStudent.groupName = foundGroup.groupName;
    foundStudent.kun = foundGroup.kun;
    foundStudent.soat = foundGroup.soat;
  }

  if (foundCourse) {
    foundStudent.courseName = foundCourse.courseName;
  }

  res.render("student.ejs", { name: req.name, foundStudent, foundHomeworks });
};

export const studentHomework = async (req, res, next) => {
  const { id } = req.params;

  const allHomeworks = read("homeworks.json");

  allHomeworks.forEach((e) => {
    if (e.id == id) {
      e.isTodoHomework = !e.isTodoHomework;
    }
  });

  const newAllHomeworks = await write("homeworks.json", allHomeworks);

  if (newAllHomeworks) res.redirect("/student");
};
