import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Alert, AlertTitle, Button, MenuItem } from '@mui/material';
import CoursesSectionInfo from '../../../components/Courses_Section_Info';
import CoursesSectionCertificate from '../../../components/Courses_Section_Certificate';
import CoursesSectionStudent from '../../../components/Courses_Section_Student';
import CoursesHeader from '../../../components/Courses_Header';
import axios from 'axios';
import localization from 'moment/locale/es';
import moment from 'moment';
import EnrollStudentModal from '../../../components/Courses_Section_Student/modal';
import readXlsxFile from 'read-excel-file';
import ExcelModal from '../../../components/Courses_Section_Student/excelModal';
import styles from './SingleCourse.module.css';

export default function Course() {
  const [arrayStudentsNotEnrolled, setArrayStudentsNotEnrolled] = useState([]);
  const [arrayTemplates, setArrayTemplates] = useState([]);
  const [courses, setCourses] = useState([]);
  const [duration, setDuration] = useState(0);
  const [excel, setExcel] = useState({});
  const [index, setIndex] = useState(0);
  const [initialIndex, setInitialIndex] = useState(-1);
  const [initialIndex2, setInitialIndex2] = useState(-1);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingStudentsNotEnrolled, setLoadingStudentsNotEnrolled] =
    useState(true);
  const [openExcelModal, setOpenExcelModal] = useState(false);
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [students, setStudents] = useState([]);
  const [studentError, setStudentError] = useState(false);
  const [studentsNotEnrolled, setStudentsNotEnrolled] = useState([]);
  const [studentToEnroll, setStudentToEnroll] = useState({});
  const [studentToRemove, setStudentToRemove] = useState({});
  const [templates, setTemplates] = useState([]);
  const [thumbnail, setThumbnail] = useState({});
  const [updateCoursesData, setUpdateCoursesData] = useState(false);
  const [updateStudentsData, setUpdateStudentsData] = useState(false);
  const [updateStudentsNotEnrolledData, setUpdateStudentsNotEnrolledData] =
    useState(false);
  const [updateTemplatesData, setUpdateTemplatesData] = useState(false);
  const [update, setUpdate] = useState(false);

  const imageRef = useRef();
  const image2Ref = useRef();
  const thumbnailRef = useRef();

  const { query, isReady } = useRouter();
  const paramId = query.id;
  const API_HOST = process.env.API_HOST;
  moment.updateLocale('es', localization);

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
            // className={styles.menuitem}
          >
            {tempTemplates[i].title} (id: {tempTemplates[i].id})
          </MenuItem>
        );
      }
      setArrayTemplates(arrayTemplates);
      setInitialIndex(initialIndex);
    }
  };
  const changeSelectedTemplate = e => {
    var selTemplate = templates.filter(
      template => template.id == parseInt(e.target.value)
    )[0];
    setSelectedTemplate(selTemplate);
    setUpdate(true);
  };
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
  const handleExcel = () => {
    axios
      .post(`${API_HOST}/loadusers`, excel)
      .then(res => {
        sessionStorage.removeItem('courses');
        sessionStorage.removeItem('students');
        setUpdateCoursesData(!updateCoursesData);
        setUpdateStudentsData(!updateStudentsData);
        setExcel({});
        hideExcelModal();
      })
      .catch(error => console.log(error));
  };
  const handleIndex = index => setIndex(index);
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
  const hideExcelModal = () => setOpenExcelModal(false);
  const hideStudentError = () => setStudentError(false);
  const hideStudentModal = () => setOpenStudentModal(false);
  const openCertificateImageFile = () => {
    imageRef.current.children[0].click();
  };
  const openCertificateImage2File = () => {
    image2Ref.current.children[0].click();
  };
  const openCertificateThumbnailFile = () => {
    thumbnailRef.current.children[0].click();
  };
  const processExcel = e => {
    let tempRows = [];
    readXlsxFile(e.target.files[0]).then(rows => {
      for (var i = 1; i < rows.length; i++) {
        let tempRow = {};
        tempRow.name = rows[i][0];
        tempRow.last_name = rows[i][1];
        tempRow.email = rows[i][2];
        tempRow.nif = rows[i][3];
        tempRow.course = paramId;
        tempRows.push(tempRow);
      }
      setExcel(tempRows);
    });
  };
  const removeStudentToEnroll = val => {
    setStudentToRemove({
      id: val.id,
      name: `${val.name} ${val.last_name}`,
      value: val
    });
    showStudentError();
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
  const showExcelModal = () => setOpenExcelModal(true);
  const showStudentError = () => setStudentError(true);
  const showStudentModal = () => setOpenStudentModal(true);
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
  const studentToEnrollChange = (e, val) => {
    setStudentToEnroll(val);
  };
  const updateImage = (e, field) => {
    let tempData = new FormData();
    tempData.append('certificate_id', paramId);
    switch (field) {
      case 'certificate_thumbnail':
        tempData.append('type', 'thumbnail');
        tempData.append('certificate_thumbnail', e.target.files[0]);
        break;
      case 'certificate_image':
        tempData.append('type', 'image');
        tempData.append('certificate_image', e.target.files[0]);
        break;
      case 'certificate_image2':
        tempData.append('type', 'image2');
        tempData.append('certificate_image2', e.target.files[0]);
        break;
    }

    axios
      .post(`${API_HOST}/courses`, tempData)
      .then(response => {
        if (response.status === 200) {
          sessionStorage.removeItem('courses');
          setUpdateCoursesData(!updateCoursesData);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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

  // Users not enrolled in course
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
            handleIndex={handleIndex}
            index={index}
            paramId={paramId}
          />
          {index === 0 && (
            <CoursesSectionInfo
              duration={duration}
              loadingCourses={loadingCourses}
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
              setUpdateCoursesData={setUpdateCoursesData}
              updateCoursesData={updateCoursesData}
            />
          )}
          {index === 1 && (
            <CoursesSectionCertificate
              arrayTemplates={arrayTemplates}
              changeSelectedTemplate={changeSelectedTemplate}
              imageRef={imageRef}
              image2Ref={image2Ref}
              loadingTemplates={loadingTemplates}
              openCertificateImageFile={openCertificateImageFile}
              openCertificateImage2File={openCertificateImage2File}
              openCertificateThumbnailFile={openCertificateThumbnailFile}
              selectedCourse={selectedCourse}
              selectedTemplate={selectedTemplate}
              thumbnailRef={thumbnailRef}
              update={update}
              updateImage={updateImage}
              updateTemplate={updateTemplate}
            />
          )}
          {index === 2 && (
            <>
              <CoursesSectionStudent
                hideStudentModal={hideStudentModal}
                loadingStudents={loadingStudents}
                removeStudentToEnroll={removeStudentToEnroll}
                showExcelModal={showExcelModal}
                showStudentModal={showStudentModal}
                students={students}
              />
              <EnrollStudentModal
                arrayStudentsNotEnrolled={arrayStudentsNotEnrolled}
                handleEnrollStudent={handleEnrollStudent}
                hideStudentModal={hideStudentModal}
                loadingStudentsNotEnrolled={loadingStudentsNotEnrolled}
                openStudentModal={openStudentModal}
                studentToEnrollChange={studentToEnrollChange}
              />
              <ExcelModal
                handleExcel={handleExcel}
                hideExcelModal={hideExcelModal}
                openExcelModal={openExcelModal}
                processExcel={processExcel}
              />
              <Alert
                className={`${studentError ? 'active' : ''}`}
                onClose={hideStudentError}
                severity='error'
              >
                <AlertTitle>¿Desea desmatricular a este estudiante?</AlertTitle>
                <small className={styles.small}>
                  {studentToRemove.name} (id:{studentToRemove.id})
                </small>
                <Button
                  className='updateButton'
                  onClick={handleRemoveStudentToEnroll}
                  variant='outlined'
                >
                  Sí, eliminar
                </Button>
                <Button
                  className='cancelButton'
                  onClick={hideStudentError}
                  variant='outlined'
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
