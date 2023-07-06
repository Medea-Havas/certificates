import React, { useEffect } from 'react';
import CoursesSectionInfo from '../../../components/Courses_Section_Info';
import CoursesSectionCertificate from '../../../components/Courses_Section_Certificate';
import CoursesSectionStudent from '../../../components/Courses_Section_Student';
import styles from '../../../styles/Course.module.css';
import CoursesHeader from '../../../components/Courses_Header';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Alert, AlertTitle, Button, MenuItem } from '@mui/material';
import axios from 'axios';
import localization from 'moment/locale/es';
import moment from 'moment';
import EnrollStudentModal from '../../../components/Courses_Section_Student/modal';

export default function Course() {
  const [index, setIndex] = useState(0);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingStudentsNotEnrolled, setLoadingStudentsNotEnrolled] =
    useState(true);
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [studentToEnroll, setStudentToEnroll] = useState({});
  const [studentsNotEnrolled, setStudentsNotEnrolled] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [studentToRemove, setStudentToRemove] = useState({});
  const [templates, setTemplates] = useState([]);
  const [arrayTemplates, setArrayTemplates] = useState([]);
  const [arrayStudentsNotEnrolled, setArrayStudentsNotEnrolled] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [selectedStudent, setSelectedStudent] = useState({});
  const [students, setStudents] = useState([]);
  const [updateCoursesData, setUpdateCoursesData] = useState(false);
  const [updateTemplatesData, setUpdateTemplatesData] = useState(false);
  const [updateStudentsData, setUpdateStudentsData] = useState(false);
  const [updateStudentsNotEnrolledData, setUpdateStudentsNotEnrolledData] =
    useState(false);
  const [update, setUpdate] = useState(false);
  const [initialIndex, setInitialIndex] = useState(-1);
  const [initialIndex2, setInitialIndex2] = useState(-1);
  const [duration, setDuration] = useState(0);
  const [thumbnail, setThumbnail] = useState({});
  const [studentError, setStudentError] = useState(false);

  const { query, isReady } = useRouter();
  const paramId = query.id;
  const API_HOST = process.env.API_HOST;

  moment.updateLocale('es', localization);
  const handleIndex = index => setIndex(index);
  const showStudentError = () => setStudentError(true);
  const hideStudentError = () => setStudentError(false);
  const removeStudentToEnroll = val => {
    setStudentToRemove({
      id: val.id,
      name: `${val.name} ${val.last_name}`,
      value: val
    });
    showStudentError();
  };
  const handleRemoveStudentToEnroll = () => {
    axios
      .delete(`${API_HOST}/userscourses/${studentToRemove.id}/${paramId}`)
      .then(() => {
        setStudentToRemove({});
        sessionStorage.removeItem('students');
        setStudents([]);
        setUpdateStudentsData(!updateStudentsData);
        hideStudentError();
      })
      .catch(error => console.log(error));
  };

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

  const studentToEnrollChange = (e, val) => {
    setStudentToEnroll(val);
  };

  const updateTemplate = (e, id) => {
    axios
      .patch(
        `${API_HOST}/coursetemplate/${selectedCourse.course_template_id}`,
        {
          template_id: id
        }
      )
      .then(response => {
        if (response.status === 200) {
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

  const studentsNotEnrolledToArray = () => {
    if (!arrayStudentsNotEnrolled.length) {
      let tempStudentsNotEnrolled =
        JSON.parse(sessionStorage.getItem('studentsnotenrolled')) || [];

      let arrayStudents = [];
      let initialIndex2 = null;

      for (let i = 0; i < tempStudentsNotEnrolled.length; i++) {
        if (arrayStudents[i] == studentToEnroll.id) {
          initialIndex2 = studentToEnroll.id;
        }
        arrayStudents.push({
          label: `
            ${tempStudentsNotEnrolled[i].name} ${tempStudentsNotEnrolled[i].last_name} (id: ${tempStudentsNotEnrolled[i].id})
            `,
          value: tempStudentsNotEnrolled[i].id
        });
        setArrayStudentsNotEnrolled(arrayStudents);
        setInitialIndex2(initialIndex2);
      }
    }
  };

  const updateCertificateThumbnail = () => {
    let tempData = new FormData();
    tempData.append('certificate_thumbnail', thumb);

    axios
      .patch(`${API_HOST}/courses`, tempData)
      .then(response => {
        if (response.status === 201) {
          console.log('Updated');

          // setCourses(prevState => ({
          //   ...prevState,
          //   ncCourse
          // }));
          // sessionStorage.setItem('courses', []);
          // setNCCourse({});
          // setUpdateData(!updateData);
          // handleClose();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // setUpdateCoursesData(!updateCoursesData);
  };

  const showStudentModal = () => setOpenStudentModal(true);
  const hideStudentModal = () => setOpenStudentModal(false);
  const handleEnrollStudent = () => {
    let data = {
      user_id: studentToEnroll.value,
      course_id: paramId,
      date_completed: moment().format()
    };
    axios
      .post(`${API_HOST}/userscourses`, data)
      .then(res => {
        if (res.status == 201) {
          setUpdateStudentsData(!updateStudentsData);
          setUpdateStudentsNotEnrolledData(!updateStudentsNotEnrolledData);
          hideStudentModal();
        }
      })
      .catch(error => console.log(error));
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
        const data = await fetch(`${API_HOST}/usersfromcourse/${paramId}`);
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

  useEffect(() => {
    if (isReady) {
      const fetchStudentsNotEnrolled = async () => {
        const data = await fetch(
          `${API_HOST}/courseusersnotenrolled/${paramId}`
        ).catch(error => console.log(error));
        const json = await data.json();
        setStudentsNotEnrolled(json);
        sessionStorage.setItem('studentsnotenrolled', JSON.stringify(json));
        setStudentToEnroll(json[0].id);
        studentsNotEnrolledToArray();
        setLoadingStudentsNotEnrolled(false);
      };
      if (!sessionStorage.getItem('studentsnotenrolled')) {
        fetchStudentsNotEnrolled().catch(console.error);
      } else {
        let tempStudentsNotEnrolled = JSON.parse(
          sessionStorage.getItem('studentsnotenrolled')
        );
        setStudentsNotEnrolled(tempStudentsNotEnrolled);
        setStudentToEnroll(tempStudentsNotEnrolled[0].id);
        studentsNotEnrolledToArray();
        setLoadingStudentsNotEnrolled(false);
      }
    }
  }, [isReady, updateStudentsNotEnrolledData]);

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
              updateCertificateThumbnail={updateCertificateThumbnail}
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
            />
          )}
          {index === 2 && (
            <>
              <CoursesSectionStudent
                students={students}
                loadingStudents={loadingStudents}
                showStudentModal={showStudentModal}
                hideStudentModal={hideStudentModal}
                removeStudentToEnroll={removeStudentToEnroll}
              />
              <EnrollStudentModal
                handleEnrollStudent={handleEnrollStudent}
                hideStudentModal={hideStudentModal}
                openStudentModal={openStudentModal}
                studentToEnroll={studentToEnroll}
                setStudentToEnroll={setStudentToEnroll}
                studentsNotEnrolled={studentsNotEnrolled}
                arrayStudentsNotEnrolled={arrayStudentsNotEnrolled}
                loadingStudentsNotEnrolled={loadingStudentsNotEnrolled}
                studentToEnrollChange={studentToEnrollChange}
              />
              <Alert
                onClose={hideStudentError}
                severity='error'
                className={`${studentError ? 'active' : ''}`}
              >
                <AlertTitle>¿Desea desmatricular a este estudiante?</AlertTitle>
                <small className={styles.small}>
                  {studentToRemove.name} (id:{studentToRemove.id})
                </small>
                <Button
                  variant='outlined'
                  className={styles.updateButton}
                  onClick={handleRemoveStudentToEnroll}
                >
                  Sí, eliminar
                </Button>
                <Button
                  variant='outlined'
                  className={styles.cancelButton}
                  onClick={hideStudentError}
                >
                  No, cancelar
                </Button>
              </Alert>
            </>
          )}
        </div>
      </main>
    </>
  );
}
