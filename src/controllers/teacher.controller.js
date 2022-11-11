import { read } from "../utils/FS.js";

export const getTeacher = (req, res) => {
  const allGroups = read("groups.json");
  const allCourses = read("courses.json");

  const foundGroups = allGroups.filter((e) => e.teacher == req.id);

  foundGroups.forEach((e) =>
    allCourses.find((c) => {
      if (e.courseId == c.id) {
        e.courseName = c.courseName;
      }
    })
  );
  res.render("teacher.ejs", { name: req.name, foundGroups });
};
