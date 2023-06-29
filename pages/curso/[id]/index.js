import React, { useEffect } from 'react';
import CoursesSectionInfo from '../../../components/Courses_Section_Info';
import CoursesSectionCertificate from '../../../components/Courses_Section_Certificate';
import CoursesSectionStudent from '../../../components/Courses_Section_Student';
import styles from '../../../styles/Course.module.css';
import CoursesHeader from '../../../components/Courses_Header';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { MenuItem } from '@mui/material';
import axios from 'axios';
import localization from 'moment/locale/es';
import moment from 'moment';

export default function Course() {
  const [index, setIndex] = useState(0);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const handleIndex = index => setIndex(index);
  const router = useRouter();
  const paramId = router.query.id;
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const API_HOST = process.env.API_HOST;
  const [templates, setTemplates] = useState([]);
  const [arrayTemplates, setArrayTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [students, setStudents] = useState([]);
  const { query, isReady } = useRouter();
  const [updateCoursesData, setUpdateCoursesData] = useState(false);
  const [updateTemplatesData, setUpdateTemplatesData] = useState(false);
  const [updateStudentsData, setUpdateStudentsData] = useState(false);
  const [update, setUpdate] = useState(false);
  const [initialIndex, setInitialIndex] = useState(-1);
  const [duration, setDuration] = useState(0);

  moment.updateLocale('es', localization);

  const selectCourse = tempCourses => {
    if (isReady) {
      let selCourse = tempCourses.filter(course => {
        return course.id == paramId;
      })[0];
      setSelectedCourse(selCourse);
      sessionStorage.setItem('course', JSON.stringify(selCourse));
      // Duration in months
      var iDate = moment(selCourse.date_init);
      var eDate = moment(selCourse.date_end);
      var difference = eDate.diff(iDate, 'days');
      setDuration(difference);
    }
  };

  const changeSelectedTemplate = e => {
    var selTemplate = templates.filter(
      template => template.id == parseInt(e.target.value)
    )[0];
    setSelectedTemplate(selTemplate);
    setUpdate(true);
  };

  const updateTemplate = (e, id) => {
    console.log(id);
    axios
      .patch(
        `${API_HOST}/coursetemplate/${selectedCourse.course_template_id}`,
        {
          template_id: id
        }
      )
      .then(response => {
        if (response.status === 200) {
          console.log(
            'Course template with id ' +
              selectedCourse.template_id +
              ' was updated'
          );
          setSelectedCourse({});
          sessionStorage.removeItem('courses');
          sessionStorage.removeItem('templates');
          setUpdateCoursesData(!updateCoursesData);
          setUpdateTemplatesData(!updateTemplatesData);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const arrayTemplateFunction = () => {
    if (!arrayTemplates.length) {
      let tempTemplates = JSON.parse(sessionStorage.getItem('templates')) || [];
      let arrayTemplates = [];
      let initialIndex = null;
      for (let i = 0; i < tempTemplates.length; i++) {
        if (arrayTemplates[i] == selectedTemplate.id) {
          initialIndex = selectedTemplate.id;
        }
        arrayTemplates.push(
          <MenuItem
            key={tempTemplates[i].id}
            value={tempTemplates[i].id}
            className={styles.menuitem}
          >
            {tempTemplates[i].title} (id: {tempTemplates[i].id})
          </MenuItem>
        );
      }
      setArrayTemplates(arrayTemplates);
      setInitialIndex(initialIndex);
    }
  };

  // Courses
  useEffect(() => {
    if (isReady) {
      const fetchCourses = async () => {
        const data = await fetch(`${API_HOST}/courses`);
        const json = await data.json();
        setCourses(json);
        sessionStorage.setItem('courses', JSON.stringify(json));
        selectCourse(json);
        setLoadingCourses(false);
      };
      if (!sessionStorage.getItem('courses')) {
        fetchCourses().catch(console.error);
      } else {
        let tempCourses = JSON.parse(sessionStorage.getItem('courses'));
        setCourses(tempCourses);
        selectCourse(tempCourses);
        setLoadingCourses(false);
      }
    }
  }, [isReady, updateCoursesData]);

  // Templates
  useEffect(() => {
    if (isReady) {
      const fetchTemplates = async () => {
        const data = await fetch(`${API_HOST}/templates`);
        const json = await data.json();
        setTemplates(json);
        sessionStorage.setItem('templates', JSON.stringify(json));
        var selCourse = JSON.parse(sessionStorage.getItem('course'));
        var selTemplate = json.filter(
          template => template.id == selCourse.template_id
        )[0];
        setSelectedTemplate(selTemplate);
        arrayTemplateFunction();
        setLoadingTemplates(false);
      };
      if (!sessionStorage.getItem('templates')) {
        fetchTemplates().catch(console.error);
      } else {
        let tempTemplates = JSON.parse(sessionStorage.getItem('templates'));
        setTemplates(tempTemplates);
        var selCourse = selectedCourse.length
          ? selectedCourse
          : JSON.parse(sessionStorage.getItem('course'));
        var selTemplate = tempTemplates.filter(
          template => template.id == selCourse.template_id
        )[0];
        setSelectedTemplate(selTemplate);
        arrayTemplateFunction();
        setLoadingTemplates(false);
      }
    }
  }, [isReady, updateTemplatesData]);

  // Students
  useEffect(() => {
    if (isReady) {
      const fetchStudents = async () => {
        const data = await fetch(
          `${API_HOST}/usersfromcourse/${router.query.id}`
        );
        const json = await data.json();
        setStudents(json);
        setLoadingStudents(false);
      };
      if (!sessionStorage.getItem('usersfromcourse')) {
        fetchStudents().catch(console.error);
      } else {
        let tempUsersFromCourse = JSON.parse(
          sessionStorage.getItem('usersfromcourse')
        );
        setStudents(tempUsersFromCourse);
        setLoadingStudents(false);
      }
    }
  }, [isReady, updateStudentsData]);

  return (
    <>
      <main className='page main'>
        <div>
          <CoursesHeader
            index={index}
            handleIndex={handleIndex}
            paramId={paramId}
          />
          {index === 0 && (
            <CoursesSectionInfo
              selectedCourse={selectedCourse}
              loadingCourses={loadingCourses}
              duration={duration}
              updateCoursesData={updateCoursesData}
              setUpdateCoursesData={setUpdateCoursesData}
              setSelectedCourse={setSelectedCourse}
            />
          )}
          {index === 1 && (
            <CoursesSectionCertificate
              loadingTemplates={loadingTemplates}
              setSelectedCourse={setSelectedCourse}
              selectedCourse={selectedCourse}
              selectedTemplate={selectedTemplate}
              update={update}
              arrayTemplates={arrayTemplates}
              changeSelectedTemplate={changeSelectedTemplate}
              updateTemplate={updateTemplate}
            />
          )}
          {index === 2 && (
            <CoursesSectionStudent
              students={students}
              loadingStudents={loadingStudents}
            />
          )}
        </div>
      </main>
    </>
  );
}
